import React, { useEffect, useState } from "react";
import sword from '.././../imgs/sword-svgrepo-com.svg'

export default function ChessBoard() {

  const maxBoardWidth = 8;
  const maxBoardHeight = 8;
  const letterACodeInASCII = 65;

  let numbersAxis = Array.from(
    { length: maxBoardHeight },
    (el, i) => maxBoardHeight - i
  );

  let lettersAxis = Array.from({ length: maxBoardWidth }, (el, i) =>
    String.fromCharCode(i + letterACodeInASCII)
  );

  const figureTypes = ["king", "queen", "knight", "bishop", "rook", "pawn"].map(
    (value) => ({
      value,
      icon: "fa-solid fa-chess-" + value,
    })
  );


  const [figures, setFigures] = useState(
    Array.from({ length: 32 }, (el, i) => ({
      id: i + 1,
      color: i < 16 ? "black" : "white",
      type: (
        "rook " +
        "knight " +
        "bishop " +
        "queen " +
        "king " +
        "bishop " +
        "knight " +
        "rook " +
        "pawn ".repeat(8)
      ).split(" ")[i % (maxBoardWidth * 2)],
    }))
  );

  const [cells, setCells] = useState(
    Array.from({ length: maxBoardWidth * maxBoardHeight }, (el, i) => ({
      id:
        lettersAxis[i % maxBoardWidth] +
        numbersAxis[Math.floor(i / maxBoardHeight) % maxBoardHeight],
      figure: null,
      x: i % maxBoardWidth,
      y: maxBoardHeight - 1 - (Math.floor(i / maxBoardHeight) % maxBoardHeight),
    }))
  );

  let getDeafultCellColor = (x, y) => {
    return (x % 2 == 0 && y % 2 == 0) || (x % 2 !== 0 && y % 2 !== 0)
      ? "bg-lightColored"
      : "bg-brown";
  };

  function setFigureInCell(figId, x, y) {
    setCells((prev) =>
      prev.map((el) => ({
        ...el,
        figure: el.x == x && el.y == y ? figId : el.figure,
      }))
    );
  }

  function setDefaultFigurePosition(arr) {
    let arrayOfFoundElementsId = [];

    let foundFigureId;

    arr.forEach((el) => {
      for (let i = el.start; i < maxBoardWidth; i += el.xOffsetBetweenFigures) {
        foundFigureId = figures.find(
          (f) =>
            f.type == el.type &&
            f.color == el.color &&
            !arrayOfFoundElementsId.includes(f.id)
        ).id;

        arrayOfFoundElementsId.push(foundFigureId);

        setFigureInCell(foundFigureId, i, el.y);
      }
    });
  }

  let arrDefaultFigurePosition = [
    { start: 0, xOffsetBetweenFigures: 1, type: "pawn", color: "black", y: 6 },
    { start: 0, xOffsetBetweenFigures: 1, type: "pawn", color: "white", y: 1 },
    { start: 4, xOffsetBetweenFigures: 4, type: "king", color: "black", y: 7 },
    { start: 4, xOffsetBetweenFigures: 4, type: "king", color: "white", y: 0 },
    { start: 3, xOffsetBetweenFigures: 5, type: "queen", color: "black", y: 7 },
    { start: 3, xOffsetBetweenFigures: 5, type: "queen", color: "white", y: 0 },
    { start: 1, xOffsetBetweenFigures: 5, type: "knight", color: "black", y: 7 }, 
    { start: 1, xOffsetBetweenFigures: 5, type: "knight", color: "white", y: 0 },
    { start: 2, xOffsetBetweenFigures: 3, type: "bishop", color: "black", y: 7 },
    { start: 2, xOffsetBetweenFigures: 3,  type: "bishop", color: "white", y: 0 },
    { start: 0, xOffsetBetweenFigures: 7, type: "rook", color: "black", y: 7 },
    { start: 0, xOffsetBetweenFigures: 7, type: "rook", color: "white", y: 0 },
  ];

  let [matchNumber, setMatchNumber] = useState(1);

  useEffect(() => {

    setDefaultFigurePosition(arrDefaultFigurePosition);
    setMatchNumber(Math.floor(Math.random() * 10000000));

  }, []);

  let getFigureById = (id) => figures.find((el) => el.id === id);

  let renderFigure = (id, shadow) => {
    let figure = getFigureById(id);

    if (figure) {
      return (
        figureTypes.find((it) => it.value == figure.type).icon +
        " text-" +
        figure.color +
        (figure.color == "white" && shadow ? " figureShadow" : "")
      );
    }

  };

  const [playerSide, setPlayerSide] = useState("white");

  const [move, setMove] = useState({});

  const [history, setHistory] = useState([]);

  let historyPush = (move) => setHistory((prev) => [...prev, { ...move, figureColor: playerSide }]);


  useEffect(() => {
    if (move.secondTap) {
      

      // setAvailableToMove([]);

      //   setCells((prev) =>

      //   prev.map(el => {

      //     if(el.id == move.firstTap.id) {

      //       return {...el, figure: null}

      //     } else {

      //       return el

      //     }

      //   }

      //   ))

      //  setAvailableToMove([])


      historyPush(move);
        
      setMove({});
      // setPlayerSide(prev => prev == 'white' ? 'black' : 'white')

      // setFigureInCell(move.firstTap.figure, move.secondTap.x, move.secondTap.y)

      //   setCells((prev) =>

      //   prev.map(el => {

      //     if(el.id == move.firstTap?.id) {

      //       return {...el, figure: null}

      //     } else {

      //       return el

      //     }

      //   }

      //   ))

      // setFigureInCell(figId, x, y)

    } else if (move.firstTap) {
      // count where we can go
    }
  }, [move]);


  const [availableToMove, setAvailableToMove] = useState([]);

  // let knightMove = [
  //   { xOffset: 2, yOffset: -1 },
  //   { xOffset: 2, yOffset: 1 },
  //   { xOffset: -2, yOffset: -1 },
  //   { xOffset: -2, yOffset: 1 },
  //   { xOffset: 1, yOffset: -2 },
  //   { xOffset: -1, yOffset: -2 },
  //   { xOffset: 1, yOffset: 2 },
  //   { xOffset: -1, yOffset: 2 },
  // ];

  // let bishopMove = [
  //   // вверх вправо

  //   { xOffset: 1, yOffset: 1 },
  //   { xOffset: 2, yOffset: 2 },
  //   { xOffset: 3, yOffset: 3 },
  //   { xOffset: 4, yOffset: 4 },
  //   { xOffset: 5, yOffset: 5 },
  //   { xOffset: 6, yOffset: 6 },
  //   { xOffset: 7, yOffset: 7 },

  //   // вверх влево

  //   { xOffset: -1, yOffset: 1 },
  //   { xOffset: -2, yOffset: 2 },
  //   { xOffset: -3, yOffset: 3 },
  //   { xOffset: -4, yOffset: 4 },
  //   { xOffset: -5, yOffset: 5 },
  //   { xOffset: -6, yOffset: 6 },
  //   { xOffset: -7, yOffset: 7 },

  //   // вниз влево

  //   { xOffset: -1, yOffset: -1 },
  //   { xOffset: -2, yOffset: -2 },
  //   { xOffset: -3, yOffset: -3 },
  //   { xOffset: -4, yOffset: -4 },
  //   { xOffset: -5, yOffset: -5 },
  //   { xOffset: -6, yOffset: -6 },
  //   { xOffset: -7, yOffset: -7 },

  //   // вниз вправо

  //   { xOffset: 1, yOffset: -1 },
  //   { xOffset: 2, yOffset: -2 },
  //   { xOffset: 3, yOffset: -3 },
  //   { xOffset: 4, yOffset: -4 },
  //   { xOffset: 5, yOffset: -5 },
  //   { xOffset: 6, yOffset: -6 },
  //   { xOffset: 7, yOffset: -7 },
  // ];

  // let rookMove = [
  //   // вверх

  //   { xOffset: 0, yOffset: 1 },
  //   { xOffset: 0, yOffset: 2 },
  //   { xOffset: 0, yOffset: 3 },
  //   { xOffset: 0, yOffset: 4 },
  //   { xOffset: 0, yOffset: 5 },
  //   { xOffset: 0, yOffset: 6 },
  //   { xOffset: 0, yOffset: 7 },

  //   // вправо

  //   { xOffset: 1, yOffset: 0 },
  //   { xOffset: 2, yOffset: 0 },
  //   { xOffset: 3, yOffset: 0 },
  //   { xOffset: 4, yOffset: 0 },
  //   { xOffset: 5, yOffset: 0 },
  //   { xOffset: 6, yOffset: 0 },
  //   { xOffset: 7, yOffset: 0 },

  //   // влево

  //   { xOffset: -1, yOffset: 0 },
  //   { xOffset: -2, yOffset: 0 },
  //   { xOffset: -3, yOffset: 0 },
  //   { xOffset: -4, yOffset: 0 },
  //   { xOffset: -5, yOffset: 0 },
  //   { xOffset: -6, yOffset: 0 },
  //   { xOffset: -7, yOffset: 0 },

  //   // вниз

  //   { xOffset: 0, yOffset: -1 },
  //   { xOffset: 0, yOffset: -2 },
  //   { xOffset: 0, yOffset: -3 },
  //   { xOffset: 0, yOffset: -4 },
  //   { xOffset: 0, yOffset: -5 },
  //   { xOffset: 0, yOffset: -6 },
  //   { xOffset: 0, yOffset: -7 },
  // ];


  let getCellId = (x, y) => cells.find(cell => cell.y == y && cell.x == x)?.id
  let getFigureIdFromCell = (x, y) => cells.find(cell => cell.y == y && cell.x == x)?.figure

  let checkFigureInCell = (x, y) => {
    let figureId = cells.find((el) => el.x == x && el.y == y).figure;
    return getFigureById(figureId);
  };

   
  let checkCell = (isFigureInCell, array, cellId) => {
// как назвать эту функцию?
    if (isFigureInCell) {
      // если есть фигура в клетке то проверяем ее цвет, если цвет равен цвету вражеской фигуры то добавляем клетку 
      // с этой фигурой в массив клеток, куда может ходить выбранная фигура
        if (isFigureInCell.color !== playerSide) {
         array.push(cellId);
        }
        return true;
      }
      array.push(cellId)
      
  } 

  let whereFigureCouldGo = (figure, cell) => {
    let cellsIDWhereFigureCanGo = []; // название dots можно заменить на это 
    let dots = []
    
    if (figure?.type == "pawn" && figure.color == "white") {
        for (let i = cell.y + 1; i < 4; i++) {
          dots.push(getCellId(cell.x, i));
        }

    } else if (figure?.type == "pawn" && figure.color == "black") {
        for (let i = cell.y - 1; i > 3; i--) {
          dots.push(getCellId(cell.x, i));
        }

    } else if (figure?.type == "knight") {

        dots.push(getCellId(cell.x + 1, cell.y + 2))
        dots.push(getCellId(cell.x + 1, cell.y - 2))
        dots.push(getCellId(cell.x - 1, cell.y + 2))
        dots.push(getCellId(cell.x - 1, cell.y - 2))
        dots.push(getCellId(cell.x + 2, cell.y + 1))
        dots.push(getCellId(cell.x + 2, cell.y - 1))
        dots.push(getCellId(cell.x - 2, cell.y + 1))
        dots.push(getCellId(cell.x - 2, cell.y - 1))
      
        
        //  knightMove.map(el => dots.push(getCellId(cell.x + el.xOffset, cell.y + el.yOffset)))
  

    } else if (figure?.type == "bishop") {

        // x+, y+  // x-, y+  // x-, y-  // x+, y-
        for (let i = 1; i < maxBoardWidth; i++) {
          dots.push(getCellId(cell.x + i, cell.y + i));

          dots.push(getCellId(cell.x - i, cell.y + i));
          
          dots.push(getCellId(cell.x - i, cell.y - i));

          dots.push(getCellId(cell.x + i, cell.y - i));
        }


        // bishopMove.map(it => dots.push( getCellId(cell.x + it.xOffset, cell.y + it.yOffset) ) )

    } else if (figure?.type == "rook") {

        // x0, y+ вверх
        for (let i = cell.y + 1; i < maxBoardHeight; i++) {
          
          let figInCell = checkCell(getFigureById(getFigureIdFromCell(cell.x, i)), dots, getCellId(cell.x, i))

          if(figInCell) {
            break;
          } 
          checkCell(checkFigureInCell(cell.x, i), dots, getCellId(cell.x, i)) 
        }

        // x0, y- вниз
        for (let i = cell.y - 1; i >= 0; i--) {
          let figInCell = checkCell(checkFigureInCell(cell.x, i), dots, getCellId(cell.x, i))

          if(figInCell) {
            break;
          } 
          checkCell(checkFigureInCell(cell.x, i), dots, getCellId(cell.x, i))
        }

        // x+, y0 вправо
        for (let i = cell.x + 1; i < maxBoardWidth; i++) {
    
          let figInCell = checkCell(checkFigureInCell(i, cell.y), dots, getCellId(i, cell.y))

          if(figInCell) {
            break;
          } 
          checkCell(checkFigureInCell(i, cell.y), dots, getCellId(i, cell.y))
        }
        // x-, y0 влево
        for (let i = cell.x - 1; i >= 0; i--) {
          let figInCell = checkCell(checkFigureInCell(i, cell.y), dots, getCellId(i, cell.y))

          if(figInCell) {
            break;
          } 
          checkCell(checkFigureInCell(i, cell.y), dots, getCellId(i, cell.y))
        
        }
    }


    return dots;
  };


  let isCellFirstTap = (cell) => cell.id == move.firstTap?.id;

  let canActivateCell = (cell) => {
    let figure = getFigureById(cell.figure);
    return figure?.color == playerSide && !isCellFirstTap(cell) ? "cellOnFocus" : null;
  };


  let setM = (cell) => {
    let figure = getFigureById(cell.figure);

    if (figure?.color === playerSide) {
      setMove((prev) => ({ ...prev, firstTap: cell }));
      
      
      setAvailableToMove([...whereFigureCouldGo(figure, cell)]);
      
    } else if (availableToMove.includes(cell.id)) {
      setMove((prev) => ({ ...prev, secondTap: cell }));

      // changeFigurePosition(move.firstTap.figure, move.secondTap.x, move.secondTap.y)
      
      setFigureInCell(move.firstTap.figure, cell.x, cell.y);

      setCells((prev) =>
        prev.map((el) => {
          if (el.id == move.firstTap.id) {
            return { ...el, figure: null };
          } else {
            return el;
          }
        })
      );

      setAvailableToMove([]);

    }
  };


  return (
    <div className="d-flex justify-content-  w-100  p-2 px-5">
      <div className=" w-50 p-2">
        <div className=" w-100 h-100">
          <div className="w-100 bg-brown opacity-75 p-3 text-light">
            <div>Матч</div>

            <div>{matchNumber}</div>
          </div>
        </div>
      </div>

      <div className="w-75 p-2">
        <div
          style={{ width: "550px", backgroundColor: "#fede97" }}
          className=""
        >
          <div className="d-flex px-3 w-100">
            {lettersAxis.map((item, i) => (
              <div key={i} className="px-4 m-auto fw-bold">
                {item}
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center flex-wrap m-auto position-relative">
            {["start", "end"].map((pos) => (
              <div
                className={`px-1 w-100 h-100 d-flex position-absolute  

               flex-column justify-content-around align-items-${pos}`}
              >
                {numbersAxis.map((item, i) => (
                  <div key={i} className="py-3 fw-bold">
                    {item}
                  </div>
                ))}
              </div>
            ))}

            {cells.map((cell, i) => (
              <div
                key={cell.id}
                className={
                  getDeafultCellColor(cell.x, cell.y) +
                  " opacity-75 d-flex justify-content-center align-items-center " +
                  canActivateCell(cell) +
                  " " +
                  (isCellFirstTap(cell) ? "activeCell" : "") +
                  (availableToMove.includes(cell.id) && cell.figure
                  ? " bg-green" :
                    availableToMove.includes(cell.id) 
                    ? " fa-solid fa-circle green-circle fs-4"
                    
                    : "")
                }
                style={{ width: "4rem", height: "4rem" }}
                onClick={() => setM(cell)}
              >
                {/* {cell.x} */}
                {
                   availableToMove.includes(cell.id) && cell.figure
                   ? 
                  <img src={sword} alt="" width='50px' style={{}}/>
                  : ""
                }
                {cell.figure ? (
                  <div
                    className={`${renderFigure(cell.figure, "shadow")} fs-1 position-absolute`}
                  >
                    {/* <div className='fs-5'>{cell.figure}</div> */}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="d-flex px-3 w-100">
            {lettersAxis.map((item, i) => (
              <div key={i} className="px-4 m-auto fw-bold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* historyBoard */}

      <div className="w-50 p-2">
        <div className="w-100 h-100">
          <div
            className="bg-black opacity-75 text-white"
            style={{ height: "15%" }}
          >
            <div className="py-1 px-2 text-start d-flex">
              <i className="fa-solid fa-circle text-success pt-1"></i>
              <div className="ps-1">Player</div>
              <div className="w-100 text-end pe-1">
                {playerSide == "black" ? "<" : null}
              </div>
            </div>
            <div className="d-flex">
              <div className={"p-2 w-50 fs-4 " + (playerSide == "black" ? "playerTurn" : "")}>
                --:--
              </div>
              <div className=" text-start ps-2 w-50  ">{
                  history.map(el =>(
                    el.secondTap?.figure && el.figureColor == 'black'
                     ?
                    <i className={(renderFigure(el.secondTap?.figure)) + ' pe-1 '}></i>
                     : null
                    ) 
                  )
                }</div>
              </div>
          </div>

          <div className=" py-1 ">
            <div className=" bg-brown py-2 px-3 text-center " style={{overflow: 'auto', height:'300px' }} id= 'myDiv'>
              {history.map((el, i) => (
                <div className="border-bottom-brown text-white row py-1">
                  <div className="px-2 col-2">{i + 1}</div>

                  <div className={`w-50 text-${el.figureColor} col   `}>
                    <span
                      className={renderFigure(el.firstTap?.figure) + " px-1"}
                    ></span>

                    {el.firstTap?.id}
                  </div>

                  <div className={`w-50 text-${el.figureColor} text-end pe-5 col  `}>
                    {el.secondTap?.figure ? 
                      <i
                      className={renderFigure(el.secondTap?.figure) + " px-1 "}
                    ></i>
                    : null
                    }
                    {el.secondTap?.id}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: "15%" }} className="pb-1">
            <div className="bg-brown h-100">
              <div className="fs-2 text-white p-3">
                <i class="fa-solid fa-house pe-4"></i>
                <i class="fa-solid fa-flag fs-3"></i>
              </div>
            </div>
          </div>

          <div className="bg-white " style={{ height: "15%" }}>
            <div className="py-1 px-2 text-start d-flex">
              <div className="fa-solid fa-circle text-success pt-1"></div>
              <div className="ps-1 ">Player</div>
              <div className="w-100 text-end pe-1">
                {playerSide == "white" ? "<" : null}{" "}
              </div>
            </div>
            <div className="d-flex ">
              <div className={"p-2 w-50 fs-4  " + (playerSide == "white" ? "playerTurn" : "")}>
                --:--
              </div>
              <div className="text-start ps-2 w-50  "> {
                history.map(el => (
                  
                  // el.secondTap?.figure && el.figureColor == 'white' && getFigureById(el.secondTap?.figure).type === 'pawn' 
                  // ?  paw += 1 &&
                
                
                  //   <i > x {paw}</i>
                  
                    
                  // : 
                   el.secondTap?.figure && el.figureColor == 'white' ?
                  <i className={(renderFigure(el.secondTap?.figure)) + ' pe-1'}></i>
                   : null
                  )
                  )
              }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// let d = document.getElementById("myDiv");
// d.scrollTop = '270px'