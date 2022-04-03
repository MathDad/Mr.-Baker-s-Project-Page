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

var playerTurn=true;
var playerCanPlay = true;
var aiCanPlay = true;
var gameIsPlayable = true;

var numPlayersMoves = 0;
var numAImoves=0;


var opColorFound=false;
var sameColorFoundSecond=false;
var tempArray=[];

var possibleMoves = [];
var aiDifficulty = 0;

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

function mainGame(x,y){
  
  if(gameIsPlayable){
    //playersturn
    playerTurn=true;
    if(playerCanPlay==false && aiCanPlay==false){
      //end the game
      gameIsPlayable=false;
      checkForWin();
    }else{
      console.log("Start player turn! ");
      findPossibleMoves();
      var clickedPossibleMove = isAPossbleMove(x,y);
      //console.log("Clicked possible Move: "+clickedPossibleMove);
      if(possibleMoves.length==0){
        playerCanPlay=false;
      }else if(grid[x][y]==1||grid[x][y]==2){
        //user clicked on a tile already on the board
        updateDisplay("Whoops there is a tile already there.");
        return;
      }else if(clickedPossibleMove==false){
        //user clicked on a tile that isn't a legal move
        updateDisplay("Whoops that's not a legal move.");
        return;
      }else{
        searchAround(x,y,true)
      }
        
      checkForWin();
      switchColors();
      setBoard();
      updateScore();
      
    }
  }
  
  if(gameIsPlayable){
    //aiTurn
    playerTurn=false;
    if(playerCanPlay==false && aiCanPlay==false){
      //end the game
      gameIsPlayable=false;
      checkForWin();
    } else{
      console.log("Start AI turn! ");
      findPossibleMoves();
      if(possibleMoves.length==0){
        aiCanPlay =false;
      }else{
        AIturn();
      }
      
      checkForWin();
      switchColors();
      setBoard();
      updateScore();
      //updateDisplay("Blue Turn. You have "+numPlayersMoves+" moves");
    }
  }
}

function findPossibleMoves(){
  console.log("Find possible Moves called")
  possibleMoves=[];
  //this loop fills possibleMoves array
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      if(grid[i][j]==0){
        searchAround(i,j,false);
      }
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
        document.getElementById(btnNames[i][j]).src ="pictures/blueDot.png";
      }else if(grid[i][j]==2){
        //setProperty(btnNames[i][j],"image","RedCircleFinal.png");
        document.getElementById(btnNames[i][j]).src = "pictures/redDot.png";
      }else{
        //setProperty((btnNames[i])[j],"image","Untitled-drawing-(1).png");
        document.getElementById(btnNames[i][j]).src = "pictures/greenBlank.png";
      }
    }
  }
}

function AIturn(){
  //sort 2d array for min values
  if(aiDifficulty==0){
    //console.log("AI Easy Difficulty")
    var minPossibleMoves = [];
    var minCoinsCaptured = 64;

    //console.log("Possible Moves");
    for(var i = 0;i<possibleMoves.length;i++){
      if(possibleMoves[i][2]<minCoinsCaptured){
        minCoinsCaptured=possibleMoves[i][2];
      }
    }
    //console.log("Min Captures: "+minCoinsCaptured);

    console.log("Sorted Possible Moves");
    for(var i = 0;i<possibleMoves.length;i++){
      if(possibleMoves[i][2]==minCoinsCaptured){
        minPossibleMoves.push([possibleMoves[i][0],possibleMoves[i][1]]);
        console.log("( "+possibleMoves[i][0]+" , "+possibleMoves[i][1]+" )");
      }
    }
    //console.log("Min possible array length: "+minPossibleMoves.length)
    var randomPick=Math.floor(Math.random()*minPossibleMoves.length);

    //call search around for first item in possibleMoves array
    console.log("AI chose: ( "+minPossibleMoves[randomPick][0]+" , "+minPossibleMoves[randomPick][1]+" )")
    if(minPossibleMoves.length<1){
      switchColors();
    }else{
      searchAround(minPossibleMoves[randomPick][0],minPossibleMoves[randomPick][1],true);
    }
  } else if (aiDifficulty==1){
    //console.log("AI Medium Difficulty")
    //add medium bot difficulty here
    var randomPick=Math.floor(Math.random()*possibleMoves.length);
    //console.log("AI chose: ( "+possibleMoves[randomPick][0]+" , "+possibleMoves[randomPick][1]+" )")
    if(possibleMoves.length<1){
      switchColors();
    }else{
      searchAround(possibleMoves[randomPick][0],possibleMoves[randomPick][1],true);
    }
  }else{
    //add hard bot difficulty here.
    //console.log("AI Hard Difficulty")
    var maxPossibleMoves = [];
    var maxCoinsCaptured = 0;
    
    for(var i = 0;i<possibleMoves.length;i++){
      if(possibleMoves[i][2]>maxCoinsCaptured){
        maxCoinsCaptured=possibleMoves[i][2];
      }
    }
    //console.log("MaxCoinsCaptured: "+ maxCoinsCaptured);
    
    //console.log("Sorted Possible Moves")
    for(var i = 0;i<possibleMoves.length;i++){
      if(possibleMoves[i][2]==maxCoinsCaptured){
        maxPossibleMoves.push([possibleMoves[i][0],possibleMoves[i][1]]);
        //console.log("( "+possibleMoves[i][0]+" , "+possibleMoves[i][1]+" )");
      }
    }
    
    var randomPick=Math.floor(Math.random()*maxPossibleMoves.length);

    //call search around for first item in possibleMoves array
    //console.log("AI chose: ( "+maxPossibleMoves[randomPick][0]+" , "+maxPossibleMoves[randomPick][1]+" )");
    if(maxPossibleMoves.length<1){
      switchColors();
    }else{
      searchAround(maxPossibleMoves[randomPick][0],maxPossibleMoves[randomPick][1],true);
    }
  }
}

//Search around the button clicked to see what is red, blue and blank
function searchAround(x,y,flip){
  //console.log("Uppper Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,-1,flip);
  //console.log("Top");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,0,flip);
  //console.log("Upper Right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,1,flip);
  //console.log("Right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,0,1,flip);
  //console.log("Bottom right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,1,flip);
  //console.log("Bottom");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,0,flip);
  //console.log("Bottom Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,-1,flip);
  //console.log("Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,0,-1,flip);

}

//Companion to Search Around Function, recursivly calls itself in given direction.
function search(x,y,h,v,flip){
  //console.log("search called on X+v: "+(x+v)+" y+h: "+(y+h));
 if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 && grid[x+v][y+h]==notCurrentColor){
    opColorFound = true;
    //console.log("Opposite color found")
    if (tempArray.length==0){
      tempArray.push([x,y]);
    }
    tempArray.push([x+v,y+h]);
    search(x+v,y+h,h,v,flip);
    //console.log("appended to temp");
  }else if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 &&grid[x+v][y+h]==currentColor){
    if(opColorFound==true){
      sameColorFoundSecond = true;
      //console.log("Same color sandwhiches other color!")
      if(flip){
        flipTiles();
      } else{
        if(tempArray.length>0){
          //console.log("Coin Captured coordinate: ( "+tempArray[0][0]+" , "+tempArray[0][1]+" ) Captures: "+tempArray.length)
          
          possibleMoves.push([tempArray[0][0],tempArray[0][1],tempArray.length]);
          if(playerTurn){
            numPlayersMoves=possibleMoves.length;
          }else{
            numAImoves=possibleMoves.length;
          }

        }
      }
    }
  }else{
    //console.log("No tile found")
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
  if(currentColor==1){
    currentColor=2;
    notCurrentColor =1;
  }else{
    currentColor=1;
    notCurrentColor =2;
  }
}

//Recounts the number of red and blue discs and displays the score.
function updateScore(){
  //console.log("Update Score called! ");
  var blueScore=numSquaresColor(1);
  var redScore=numSquaresColor(2);
  //setText("blueScoreBox",""+blueScore);
  document.getElementById("blueCount").innerHTML="Blue Count (You): "+blueScore;
  //setText("redScoreBox",""+redScore);
  document.getElementById("redCount").innerHTML="Red Count (The AI): "+redScore;
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


function updateRadioValue() {
  var ele = document.getElementsByName('difficulty');
    
  for(i = 0; i < ele.length; i++) {
      if(ele[i].checked){
        aiDifficulty=i;
      }
      //console.log("AI difficulty set to: "+aiDifficulty);
  }
}

function isAPossbleMove(x,y){
  
  for(var i = 0;i<possibleMoves.length;i++){
    if(possibleMoves[i][0]==x && possibleMoves[i][1]==y){
      return true;
    }
  }
  return false;
}

function playerTurnSkipped(){
  switchColors();
  if(gameIsPlayable){
    //aiTurn
    playerTurn=false;
    if(playerCanPlay==false && aiCanPlay==false){
      //end the game
      gameIsPlayable=false;
      checkForWin();
    } else{
      console.log("Start AI turn! ");
      findPossibleMoves();
      if(possibleMoves.length==0){
        aiCanPlay =false;
      }else{
        AIturn();
      }
      
      checkForWin();
      switchColors();
      setBoard();
      updateScore();
      //updateDisplay("Blue Turn. You have "+numPlayersMoves+" moves");
    }
  }
}

function changeScreenSize(direction){

  console.log("the Direction: "+direction);
  
  var gameboardProperties = document.getElementById("gameboard");
  var gameboardPositionInfo = gameboardProperties.getBoundingClientRect();
  var gameboardWidth = gameboardPositionInfo.width - 16;
  
  console.log("gameboard width: "+gameboardWidth);
  
  if(gameboardWidth>440 && direction==-1){
    gameboardWidth-=40;
  }
  if(gameboardWidth<1000 && direction==1){
    gameboardWidth+=40;
  }

  console.log("gameboard width: "+gameboardWidth+"px");
  //document.documentElement.style.setProperty('--gameboardwidth', gameboardWidth +'px');
  document.getElementById("gameboard").style.width = gameboardWidth +'px';
  
  var rowWidth=gameboardWidth-3;
  var rows=document.getElementsByClassName("row");
  for(var i = 0;i<rows.length;i++){
    rows[i].style.width = rowWidth+'px';
  }

  var buttonWidth = (gameboardWidth/8)-6;
  var buttons = document.getElementsByClassName("othellobutton");
  for(var i = 0;i<buttons.length;i++){
    buttons[i].style.width = buttonWidth+'px';
    buttons[i].style.height = buttonWidth+'px';
  }
}