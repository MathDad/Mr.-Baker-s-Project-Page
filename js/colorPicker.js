//
//Color Picker
//


var canvas = document.getElementById("myCanvas");

make_base();

function make_base()
{
  
  context = canvas.getContext('2d');
  base_image = new Image();
  base_image.src = 'pictures/chromatic-wheel-2.png';
  //base_image.crossOrigin = "Anonymous";
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0, 400, 400);
  }
}

function getElementPosition(obj){
    var curleft = 0,curtop=0;
    if(obj.offsetParent){
        do{
            curleft+=obj.offsetLeft;
            curtop+=obj.offsetTop;
        }while(obj = obj.offsetParent);
        return{x: curleft, y:curtop};
    }
    return undefined;
}

function getEventLocation(element,event){
    var pos= getElementPosition(element);

    return{
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y)
    };
}

function rgbToHex(r,g,b){
    if(r>255||g>255||b>255)
        throw "Invalid color component";
    return ((r<<16)|(g<<8)| b).toString(16);
}

/*

function drawImageFromWebUrl(inputURL){
    
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.addEventListener("load",function(){
        canvas.getContext("2d").drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            canvas.width,
            canvas.height,
        );
    });
    
    img.setAttribute("src",inputURL);
}
*/


canvas.addEventListener("mousedown",function(e){
    make_base();
    let eventLocation=getEventLocation(this,e);
    let coord = "x="+eventLocation.x+",y="+eventLocation.y;
    console.log("coord: "+coord);
    let context = this.getContext('2d');
    let pixelData = context.getImageData(eventLocation.x,eventLocation.y,1,1).data;

    let rgbValue = "";
    let hex = "";
    if(pixelData[3]==0){
        rgbValue+="rgba( "+pixelData[0]+" , "+pixelData[1]+" , "+pixelData[2]+" , "+pixelData[3]+" )";
    } else{
        rgbValue+="rgb( "+pixelData[0]+" , "+pixelData[1]+" , "+pixelData[2]+" )";
    }

    if(
        (pixelData[0]==0)&&
        (pixelData[1]==0)&&
        (pixelData[2]==0)&&
        (pixelData[3]==0)) 
    {
        hex+="Transparent color detected, cannot be converted to HEX";
        
    }else{
        hex= "#"+("000000"+rgbToHex(pixelData[0],pixelData[1],pixelData[2])).slice(-6);
    }
    console.log("RGB vale: "+rgbValue);
    console.log("Hex value: "+hex);

    document.getElementById("status").innerHTML = coord;
    document.getElementById("rgbData").innerHTML = rgbValue;
    document.getElementById("hexData").innerHTML = hex;
    document.getElementById("myCanvas").style.borderColor = hex;
},false);

/*
function changeURL(){
    
    var theURL = document.getElementById("url").value;
    console.log("theURL: "+theURL);
    if(theURL===""){
        theURL="E:\HTMLProjects\Project2\Mr.-Baker-s-Project-Page\pictures\chromatic-wheel-2.png";
        drawImageFromWebUrl(theURL);
    }else{
        drawImageFromWebUrl(theURL);
    }
    console.log("This worked!")
}


//https://cdn.britannica.com/70/191970-050-1EC34EBE/Color-wheel-light-color-spectrum.jpg

window.onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("colorwheel");
    void ctx.drawImage(img, 0, 0,img.width,img.height,0,0,canvas.width,canvas.height);
};


*/