//
//Othello
//

//Reason: We have been playing othello in our house and the board always gets bumped.
//A digital version of the game could tally the score, auto flip the coins and never get bumped.


//global variables
var blueScore = 0;
var redScore = 0;

//blue is 1
//red is 2
var currentColor = 1;
var notCurrentColor = 2;

var opColorFound=false;
var sameColorFoundSecond=false;
var tempArray=[];
var flipped = false;
var possibleMoves = [];
var firstX=null;
var firstY=null;
var aiDifficulty = 0 ;

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

console.log("Variables set!");
//Sets the board after players turn
function setBoard(){
  console.log("Set Board called");

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
  console.log("displayTurn called");
  displayTurn();
  console.log("updateScore called");
  updateScore();
}


//Shows who's turn it is
function displayTurn(){
  if(currentColor==2){
    //setText("turnDisplay","Red Turn");
    document.getElementById("playerTurn").innerHTML = "Red Turn";
    AIturn();
  }else{
    //setText("turnDisplay","Blue Turn");
    if(redScore>2){
      document.getElementById("playerTurn").innerHTML = "AI took a turn. It's your turn again.";
    }else{
      document.getElementById("playerTurn").innerHTML = "Blue (Your) Turn";
    }

  }
}

function AIturn(){
  possibleMoves=[];
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      searchAroundNoFlip(i,j);
    }
  }

  //sort 2d array for min values
  if(aiDifficulty==0){
    var minPossibleMoves = [];
    var minCoinsCaptured = 64;
    var minX = 8;
    var minY = 8;

    console.log("Possible Moves");
    for(var i = 0;i<possibleMoves.length;i++){
      console.log("( "+possibleMoves[i][0]+" , "+possibleMoves[i][1]+" )")
      if(possibleMoves[i][2]<minCoinsCaptured){
        minCoinsCaptured=possibleMoves[i][2];
        minX=possibleMoves[i][0];
        minY=possibleMoves[i][1];
      }
    }


    for(var i = 0;i<possibleMoves.length;i++){
      if(possibleMoves[i][2]==minCoinsCaptured){
        minPossibleMoves.push([possibleMoves[i][0],possibleMoves[i][1]]);
      }
    }
    console.log("Sorted Possible Moves");
    for(var i =0;i<minPossibleMoves.length;i++){
      console.log("( "+minPossibleMoves[i][0]+" , "+minPossibleMoves[i][1]+" )")
    }


    var randomPick=Math.floor(Math.random()*minPossibleMoves.length);

    //call search around for first item in possibleMoves array
    console.log("AI chose: ( "+minPossibleMoves[randomPick][0]+" , "+minPossibleMoves[randomPick][1]+" )")
    if(minPossibleMoves.length<1){
      switchColors();
    }else{
      searchAround(minPossibleMoves[randomPick][0],minPossibleMoves[randomPick][1]);
    }
  } else if (aiDifficulty==1){
    //add medium bot difficulty here
    var randomPick=Math.floor(Math.random()*possibleMoves.length);
    console.log("AI chose: ( "+possibleMoves[randomPick][0]+" , "+possibleMoves[randomPick][1]+" )")
    if(possibleMoves.length<1){
      switchColors();
    }else{
      searchAround(possibleMoves[randomPick][0],possibleMoves[randomPick][1]);
    }
  }else{
    //add hard bot difficulty here.
    var maxPossibleMoves = [];
    var maxCoinsCaptured = 0;
    var minX = 8;
    var minY = 8;

    for(var i = 0;i<possibleMoves.length;i++){
      if(possibleMoves[i][2]>maxCoinsCaptured){
        minCoinsCaptured=possibleMoves[i][2];
        minX=possibleMoves[i][0];
        minY=possibleMoves[i][1];
      }
    }

    for(var i = 0;i<possibleMoves.length;i++){
      if(possibleMoves[i][2]==minCoinsCaptured){
        maxPossibleMoves.push([possibleMoves[i][0],possibleMoves[i][1]]);
      }
    }
    var randomPick=Math.floor(Math.random()*maxPossibleMoves.length);

    //call search around for first item in possibleMoves array
    console.log("AI chose: ( "+maxPossibleMoves[randomPick][0]+" , "+maxPossibleMoves[randomPick][1]+" )")
    if(maxPossibleMoves.length<1){
      switchColors();
    }else{
      searchAround(minX,minY);
    }
  }


}



//Search around the button clicked to see what is red, blue and blank
function searchAround(x,y){
  if(grid[x][y]==1||grid[x][y]==2){
    return;
  }
  console.log("Uppper Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,-1);
  console.log("Top");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,0);
  console.log("Upper Right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,1);
  console.log("Right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,0,1);
  console.log("Bottom right");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,1);
  console.log("Bottom");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,0);
  console.log("Bottom Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,-1);
  console.log("Left");
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,0,-1);

  if(flipped){
    switchColors();
    setBoard();
    updateScore();
    checkForWin();
  }else{
    //flipped couldn't be called because they are no legal possibleMoves
    //switchColors();
    //setBoard();
    //updateScore();
    //checkForWin();
  }
  flipped=false;
}

//Companion to Search Around Function, recursivly calls itself in given direction.
function search(x,y,h,v){

  console.log("search called on X+v: "+(x+v)+" y+h: "+(y+h));

 if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 && grid[x+v][y+h]==notCurrentColor){
    opColorFound = true;
    console.log("Opposite color found")
    if (tempArray.length==0){
    tempArray.push([x,y]);

    }
    tempArray.push([x+v,y+h]);
    search(x+v,y+h,h,v);
    //console.log("appended to temp");
  }else if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 &&grid[x+v][y+h]==currentColor){
    if(opColorFound==true){
      sameColorFoundSecond = true;
      console.log("Same color sandwhiches other color!")
      flip();
    }

  }else{
    console.log("No tile found")
  }
}
//Search around the button clicked to see what is red, blue and blank
function searchAroundNoFlip(x,y){
  if(grid[x][y]==1||grid[x][y]==2){
    return;
  }
  console.log("( "+x+" , "+y+" )")

  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,-1,-1);
  firstX=null;
  firstY=null;
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,-1,0);
  firstX=null;
  firstY=null;
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,-1,1);
  firstX=null;
  firstY=null;
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,0,1);
  firstX=null;
  firstY=null;
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,1,1);
  firstX=null;
  firstY=null;
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,1,0);
  firstX=null;
  firstY=null;
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,1,-1);
  firstX=null;
  firstY=null;
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  firstX=x;
  firstY=y;
  searchNoFlip(x,y,0,-1);
  firstX=null;
  firstY=null;
}

function searchNoFlip(x,y,h,v){
 if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 && grid[x+v][y+h]==notCurrentColor){

    opColorFound = true;

    if (tempArray.length==0){
    tempArray.push([x,y]);
    }
    tempArray.push([x+v,y+h]);
    console.log("Temp Array coordinate: ( "+(x+v)+" , "+(y+h)+" )")
    searchNoFlip(x+v,y+h,h,v);
    //console.log("appended to temp");
  }else if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 &&grid[x+v][y+h]==currentColor){
    if(opColorFound==true){
      sameColorFoundSecond = true;
      var maxCoinsCaptured = tempArray.length;
      if(maxCoinsCaptured>0){
        console.log("Coin Captured coordinate: ( "+firstX+" , "+firstY+" ) Captures: "+maxCoinsCaptured)
        possibleMoves.push([firstX,firstY,maxCoinsCaptured]);
      }
    }

  }else{
    //console.log("No tile found")
  }
}
//changes numbers in the grid array to currentColor value
function flip(){
  console.log("flip called");
  for(var i =0;i<tempArray.length;i++){
    grid[tempArray[i][0]][tempArray[i][1]]=currentColor;
  }
  flipped = true;
}

//Switches the variable values for currentColor and notCurrentColor
function switchColors(){

  if(currentColor==1){
    currentColor=2;
    notCurrentColor =1;
    displayTurn();
  }else{
    currentColor=1;
    notCurrentColor =2;
    displayTurn();
  }
}


//Recounts the number of red and blue discs and displays the score.
function updateScore(){
  blueScore=numSquaresColor(1);
  redScore=numSquaresColor(2);

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
  var red = numSquaresColor(2);
  var blue = numSquaresColor(1);
  var blank = numSquaresColor(0);

  if(red ==0||blue==0||blank==0){
    //setScreen("winLoseScreen");
    if(redScore>blueScore){
      //red wins
      //setText("winLoseDisplay","RED WINS!!!");
      document.getElementById("playerTurn").innerHTML="RED WINS!!!";
    }else if(blueScore>redScore){
      //blue wins
      //setText("winLoseDisplay","BLUE WINS!!!");
      document.getElementById("playerTurn").innerHTML="BLUE WINS!!!";
    }else{
      //its a tie
      //setText("winLoseDisplay","Tie");
      document.getElementById("playerTurn").innerHTML="Tie";
      //winDisplay();
    }
  }
}

//Resets the game board so you can play again
function playAgain(){
  console.log("playAgainBtn clicked!");
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

};


function updateRadioValue() {
  var ele = document.getElementsByName('difficulty');
    
  for(i = 0; i < ele.length; i++) {
      if(ele[i].checked){
        aiDifficulty=i;
      }
      console.log("AI difficulty set to: "+aiDifficulty);
  }
}
