import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const Square = ({value, onClick, winShowClass, xodClass}) => {
    const classes = 'square' + winShowClass + xodClass;
  return (
    <button
    className = {classes}
    onClick = {onClick}>
      {value}
    </button>
  )
}

const Board = ({values, onClick, winShow, xod}) => {
  const renderSquare = (i) => {
    return (
      <Square
      xodClass = {xod === i ? ' xod' : ''}
      winShowClass = {winShow.indexOf(i) !== -1 ? ' active' : ''}
      value = {values[i]}
      onClick = {() => onClick(i)}/>
    ) }

    return (
      <div>
            <div className="board-row">
            <div>{renderSquare(0)}</div>
            <div>{renderSquare(1)}</div>
            <div>{renderSquare(2)}</div>
            </div>
            <div className="board-row">
            <div>{renderSquare(3)}</div>
            <div>{renderSquare(4)}</div>
            <div>{renderSquare(5)}</div>
            </div>
            <div className="board-row">
            <div>{renderSquare(6)}</div>
            <div>{renderSquare(7)}</div>
            <div>{renderSquare(8)}</div>
            </div>
      </div>
    )
 }

 class Game extends Component {
   constructor(props){
     super(props);
     this.state = {
       history: [
         {squares: Array(9).fill(null)}
       ],
       isXnext: true,
       stepNumber: 0,
       xod: null,      // номер ячейки для подсветки
       mH: []  // массив ходов для хранения ячейки подсветки, где номер хожа это порядок в массиве
     }
   }

   handleClick = (i) => {
    // console.log(i);
     let {history, isXnext, stepNumber, mH} = this.state;
     history = history.slice(0, stepNumber + 1); // получили массив ходовисходя из текущего stepNumber
     const currentSquare = history[history.length - 1].squares.slice();
     if(currentSquare[i] || calcWin(currentSquare)){
       return;
     }
     currentSquare[i] = isXnext ? 'X' : '0';
    // console.log(currentSquare);
    mH[stepNumber] = i;
    console.log(mH);

     this.setState({
       history: history.concat({
         squares: currentSquare
       }),
       stepNumber: history.length,
       isXnext: !isXnext,
       mH: mH,
       xod: mH[stepNumber]
     })
   }

   jumpTo = (step) => {
     this.setState({
       stepNumber: step,
       isXnext: step%2 === 0,
       xod: this.state.mH[step - 1]
     })
   }

   render(){
     const {history, stepNumber, isXnext, xod} = this.state;
     const squares = history[stepNumber].squares;

     if(squares.indexOf(null) === -1){
       alert('Ничья!!!')
     }

     const status = calcWin(squares) ?
     'Победа команды: ' + calcWin(squares).s :
     'Очередь команды: ' + (isXnext ? 'X' : '0');

     const elements = history.map((squares, index) => {
       const mov = index ?
       'Go to ' + index :
       'Go to start';
       return (
         <li key = {index}>
          <button onClick = {() => this.jumpTo(index)}>{mov}</button>
         </li>
       )
     });

     const winShow = calcWin(squares) ? calcWin(squares).abc : [];
     //console.log(winShow);


     return (
       <div className = "App">
       <Board
        values = {squares}
        onClick = {(i) => this.handleClick(i)}
        winShow = {winShow}
        xod = {xod}/>
       <div className="game-info">
            <div className = "status">
             {status}
             <ol>{elements}</ol>
             </div>
            </div>
       </div>
     )
   }
 }

 const calcWin = (squares) => {
   const m = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
   ];
   for (let i = 0; i < m.length; i++) {
     const [a,b,c] = m[i];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
       return {
         s: squares[a],
         abc: [a,b,c]
       }
     }
   }
   return null;
 }

ReactDOM.render(<Game/> , document.getElementById('root'));
