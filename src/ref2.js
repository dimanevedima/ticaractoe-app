const Square = ({value, onClick}) => {
  return (
    <button

       className="square"
       onClick={onClick}>

    {value}
    </button>
  )
}

const Board =  ({onClick, squares}) => {

const  renderSquare = (i) =>{
   return (
     <Square

     value = {squares[i]}
     onClick={()=>onClick(i)}/>
   )
 }

//console.log(squares);

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
     stepNumber: 0,
     isXNext: true
   }
 }

 handleClick = (i) => {


   //console.log(i);
   // const ii = Math.floor(Math.random() * 9 + 0);
   // console.log(ii);
   let {history, stepNumber, isXNext} = this.state;
   history = history.slice(0, stepNumber + 1);
   const newStep = history[history.length-1].squares.slice();
 //  console.log(stepNumber);
   if(calcWin(newStep) || newStep[i]){
   //  console.log('dss');
     return;
   }

 //  console.log(newStep);
   newStep[i] = isXNext ? 'X' : '0';
   this.setState({
     isXNext: !isXNext,
     stepNumber: history.length,
     history: history.concat({
       squares: newStep
     })
   });
 //  console.log(this.state.history);
   }

jumpTo (index){

//  const newHistory = this.state.history.slice(0, index);
 this.setState({
   stepNumber: index,
//    history: newHistory,
   isXNext: (index%2 === 0)
 })
//  console.log(this.state.stepNumber);
}



 render(){

   const elements = this.state.history.map((square, index) => {
     const mov = index ?
     'Go to index' + index :
     'Go to start';
     return (

       <li  key={index}>
       <button
       onClick = {() => this.jumpTo(index)}>{mov}</button>
       </li>

     )
   })

   const {squares} = this.state.history[this.state.stepNumber];
 //  console.log(squares);



   return (
     <>
     <h1>Test</h1>

     <Board squares = {squares} onClick = {(i) => this.handleClick(i)}/>
     <ul>{elements}</ul>
     </>
   )
 }
}

function calcWin(squares){
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
 //  console.log(a,b,c );
   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

     return {
       s: squares[a],
       abc: [a,b,c]
     }
   }

 }
 return null;
}
