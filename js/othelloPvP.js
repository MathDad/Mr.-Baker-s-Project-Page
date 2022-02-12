//
//Othello
//

//Reason: We have been playing othello in our house and the board always gets bumped.
//A digital version of the game could tally the score, auto flip the coins and never get bumped.


//global variables

//blue is 1
//red is 2
var currentColor = 1;
var notCurrentColor = 2;


var gameIsPlayable = true;
var possibleMoves=[];
let tempArray=[];

let opColorFound=false;
let sameColorFoundSecond=false;

var btnNames = [
  ["a0", "a1","a2","a3","a4","a5","a6","a7"],
  ["b0", "b1","b2","b3","b4","b5","b6","b7"],
  ["c0", "c1","c2","c3","c4","c5","c6","c7"],
  ["d0", "d1","d2","d3","d4","d5","d6","d7"],
  ["e0", "e1","e2","e3","e4","e5","e6","e7"],
  ["f0", "f1","f2","f3","f4","f5","f6","f7"],
  ["g0", "g1","g2","g3","g4","g5","g6","g7"],
  ["h0", "h1","h2","h3","h4","h5","h6","h7"],
];

var grid = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,2,1,0,0,0],
  [0,0,0,1,2,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
];

setBoard();
updateDisplay("It' "+colorNumberToText(currentColor)+"'s turn!");




function mainGame(x,y){
  
  searchAround(x,y);

}


findPossibleMoves = function(){
  console.log("Find possible Moves called")
  possibleMoves=[];
  //refill possible Moves
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      if(grid[i][j]==0){
        //make sure search Around updates the local Possible Moves array
        searchAround(i,j,false);
      }
    }
  }
}

//Search around the button clicked to see what is red, blue and blank
searchAround = function(x,y){
  //error if they click square that already has something in it
  if(grid[x][y]>0){
    updateDisplay("Whoops, there's already a tile there\n"+colorNumberToText(currentColor)+" Turn");
    return;
  }
  let flipCount=0;
  //console.log("Uppper Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,-1);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }
  //console.log("Top");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,0);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }
  //console.log("Upper Right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,1);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }
  //console.log("Right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,0,1);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }
  //console.log("Bottom right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,1);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }
  //console.log("Bottom");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,0);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }
  //console.log("Bottom Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,-1);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }
  //console.log("Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,0,-1);
  if(opColorFound && sameColorFoundSecond){
    flipCount++;
  }

  if(flipCount==0){
    updateDisplay("Whoops, that doesn't capture any tiles\n"+colorNumberToText(currentColor)+" Tiles");
    return;
  }else{
    switchColors();
    setBoard();
    updateScore();
    checkForWin();
  }
}

search = function(x,y,h,v){
  //console.log("search called on X+v: "+(x+v)+" y+h: "+(y+h));
  if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 && grid[x+v][y+h]==notCurrentColor){
    opColorFound = true;
    //console.log("Opposite color found")
    if (tempArray.length==0){
      tempArray.push([x,y]);
    }
    tempArray.push([x+v,y+h]);
    search(x+v,y+h,h,v);
    //console.log("appended to temp");
  }else if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 &&grid[x+v][y+h]==currentColor){
    if(opColorFound==true){
      sameColorFoundSecond = true;
      //console.log("Same color sandwhiches other color!")
      flipTiles();
    }
  }
}
//Sets the board after players turn
function setBoard(){
  //console.log("Set Board called");
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){

      if(grid[i][j]==1){
        //setProperty(btnNames[i][j],"image","BlueCircleFinal.png");
        document.getElementById(btnNames[i][j]).src ="blueDot.png";
      }else if(grid[i][j]==2){
        //setProperty(btnNames[i][j],"image","RedCircleFinal.png");
        document.getElementById(btnNames[i][j]).src = "redDot.png";
      }else{
        //setProperty((btnNames[i])[j],"image","Untitled-drawing-(1).png");
        document.getElementById(btnNames[i][j]).src = "greenBlank.png";
      }
    }
  }
}







//changes numbers in the grid array to currentColor value
function flipTiles(){
  //console.log("flipTiles called");
  for(var i =0;i<tempArray.length;i++){
    grid[tempArray[i][0]][tempArray[i][1]]=currentColor;
  }
}

//Shows who's turn it is
function updateDisplay(textToDisplay){
  //console.log("Update display called!");
  console.log("Update display called: "+textToDisplay);
  document.getElementById("outputText").innerHTML = textToDisplay;
}

//Switches the variable values for currentColor and notCurrentColor
function switchColors(){
  var theColor;
  if(currentColor==1){
    currentColor=2;
    notCurrentColor =1;
    theColor = "#ff5555";
  }else{
    currentColor=1;
    notCurrentColor =2;
    theColor = "#2596be";
  }
  updateDisplay("It' "+colorNumberToText(currentColor)+"'s turn!");
  document.getElementById("gameboard").style.borderColor=theColor;
}

function colorNumberToText(num){
  if(num==1){
    return "Blue";
  } else{
    return "Red";
  }
}

//Recounts the number of red and blue discs and displays the score.
function updateScore(){
  //console.log("Update Score called! ");
  var blueScore=numSquaresColor(1);
  var redScore=numSquaresColor(2);
  //setText("blueScoreBox",""+blueScore);
  document.getElementById("blueCount").innerHTML="Blue Count (Player 1): "+blueScore;
  //setText("redScoreBox",""+redScore);
  document.getElementById("redCount").innerHTML="Red Count (Player 2): "+redScore;
}


//Counts the number of blue or red squares
function numSquaresColor(x){

  var squareCount = 0;

  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      if(grid[i][j]==x){
        squareCount++;
      }
    }
  }
  return squareCount;
}

//If red,blue or blank squares are zero the game ends.
function checkForWin(){
  console.log("CheckForWin called!")
  var red = numSquaresColor(2);
  var blue = numSquaresColor(1);
  var blank = numSquaresColor(0);
  console.log("Game is Playable: "+gameIsPlayable);
  console.log("Red: "+red+" Blue: "+blue+" Blank: "+blank);
  if(gameIsPlayable==false){
    if(red>blue){
      updateDisplay("No more moves. Red wins!");
    }else if(blue>red){
      updateDisplay("No more moves. Blue wins!");
    }else{
      updateDisplay("No more moves. Its a tie!");
    }
  }else{
    if(red ==0||blue==0||blank==0){
      if(red>blue){
        //red wins
        updateDisplay("RED WINS!!!");
      }else if(blue>red){
        //blue wins
        updateDisplay("BLUE WINS!!!");
      }else{
        //its a tie
        updateDisplay("Tie");
      }
      gameIsPlayable=false;
      console.log("GameIsPlayable set to false");
    }
  }
}

//Resets the game board so you can play again
function playAgain(){
  //console.log("playAgainBtn clicked!");
  //reset the board to original setup
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      grid[i][j]=0;
    }
  }

  grid[3][3]=2;
  grid[3][4]=1;
  grid[4][3]=1;
  grid[4][4]=2;
  setBoard();
  updateScore();
  gameIsPlayable=true;
  playerTurn=true;
  playerCanPlay = true;
  aiCanPlay = true;
};



function isAPossbleMove(x,y){
  
  for(var i = 0;i<possibleMoves.length;i++){
    if(possibleMoves[i][0]==x && possibleMoves[i][1]==y){
      return true;
    }
  }
  return false;
}