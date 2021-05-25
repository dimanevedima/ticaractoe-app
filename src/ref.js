const Squares = ({value, onClick, svet, xod}) => {
  let classes = "square" + svet;
//  console.log(xod);
  if(xod){
    classes += " xod"
  }

//  console.log(classes);
  return (
    <button className= {classes}
    value = {value}
    onClick = {onClick}
    >
    {value}
    </button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
  //  console.log(this.props.svet);
    return (
      <Squares
      xod = {this.props.xod === i ? ' xod' : ''}
      svet = {this.props.svet.indexOf(i) !==-1 ? ' active' : ''}
      value = {this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
      />
    )
  }

  render () {

    return (
      <div>
            <div className="board-row">
            <div>{this.renderSquare(0)}</div>
            <div>{this.renderSquare(1)}</div>
            <div>{this.renderSquare(2)}</div>
            </div>
            <div className="board-row">
            <div>{this.renderSquare(3)}</div>
            <div>{this.renderSquare(4)}</div>
            <div>{this.renderSquare(5)}</div>
            </div>
            <div className="board-row">
            <div>{this.renderSquare(6)}</div>
            <div>{this.renderSquare(7)}</div>
            <div>{this.renderSquare(8)}</div>
            </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [
        {squares: Array(9).fill(null)}
      ],
      stepNumber: 0,
      isXnext: true,
      xod: null,
      mH: [],
      //fl: false

    };

  }

  handleClick (i) {



     let {history, stepNumber, isXnext} = this.state;
     history = history.slice(0, stepNumber + 1);
     const currentSquare = history[history.length - 1].squares.slice();
     //const current =  squares.squares.slice();

     if(currentSquare.indexOf(null) === -1){

       alert('Ничья!!');
       return;
     }

  //  calcWin(currentSquare);
     if(currentSquare[i] || calcWin(currentSquare)){
      // console.log(calcWin(currentSquare).abc);
      //const svet = calcWin(currentSquare).abc;
       return;
     }


     const mH = this.state.mH;
     mH[stepNumber] = i;


     currentSquare[i] = isXnext ? 'X' : '0';

     //stepNumber++;
      this.setState({
        history: history.concat({
          squares : currentSquare
        }),
        stepNumber: history.length,
        isXnext: !this.state.isXnext,
        mH: mH,
        xod: mH[stepNumber],
      //  mH: this.state.fl ? this.state.mH.slice() : this.state.mH.concat(i),

      //  fl: false

      })

  //  console.log(currentSquare);
 console.log(this.state.mH);

  }

  jumpTo(step, item){

  //  const mh = this.state.mH
  console.log(this.state.mH[this.state.stepNumber]);
    this.setState({
      stepNumber: step,
      isXnext: (step%2) === 0,
    //  mH: this.state.fl ? this.state.mH.slice(0,step) : this.state.mH,
      //mH: this.state.mH,
      xod: this.state.mH[step -1],
      //fl: true
    })
  }

  render () {





    const current = this.state.history[this.state.stepNumber];
    //console.log(current.squares);
//  console.log(this.state.history);

if(current.squares.indexOf(null) === -1){

  alert('Ничья!!');

}

let svet = [];

if(calcWin(current.squares)){
  console.log(calcWin(current.squares).abc);
  svet = calcWin(current.squares).abc;
//  alert('Win!!');

}


  const elements = this.state.history.map((item, index) => {
    const mov = index ?
    'Go to' + index :
    'Go to start'
    return (
      <li key ={index}>

        <button onClick={() => this.jumpTo(index, item)}>{mov}</button>
      </li>
    )
  })

  let status;

  if(calcWin(current.squares)){
    status = "Победа команды: " + calcWin(current.squares).s;
  }else{
    status = "Очередь команды: " + (this.state.isXnext ? 'X' : '0')
  }

    return(
    <div className="app">
      <Board
      xod = {this.state.xod}
      svet = {svet ? svet : null}
      squares = {current.squares}
      onClick = {(i) => this.handleClick(i)}/>
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


ReactDOM.render(<Game/> , document.getElementById('root'));


function calcWin (squares) {
  const m = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
  ]
  for(let i = 0; i < m.length; i++){
    const [a,b,c] = m[i];
    //console.log(a,b,c);
    //console.log(squares[a]);
    if(squares[a] &&  squares[a] === squares[b] && squares[a] === squares[c]){
      //alert('WIN!');
      return {
        s : squares[a],
        abc: [a,b,c]
      }
     }
    }
 return null;
}
