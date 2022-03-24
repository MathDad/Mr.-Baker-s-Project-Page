//
//Color Picker
//
var canvas = document.getElementById("myCanvas");

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

var downloadedImg;

function drawImageFromWebUrl(inputURL){
    downloadedImg="";
    startDownload(inputURL);
    
    var img = new Image();
    
    
    //img.crossOrigin = "Anonymous";
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

    img.setAttribute("src",downloadedImg);
}

function startDownload(sourceurl) {
    let imageURL = sourceurl;
  
    downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = imageURL;
}

function imageReceived() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
  
    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;
  
    context.drawImage(downloadedImg, 0, 0);
    imageBox.appendChild(canvas);
  
    try {
      localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
    }
    catch(err) {
      console.log("Error: " + err);
    }
}

drawImageFromWebUrl("https://cdn.britannica.com/70/191970-050-1EC34EBE/Color-wheel-light-color-spectrum.jpg");

canvas.addEventListener("mousemove",function(e){
    let eventLocation=getEventLocation(this,e);
    let coord = "x="+eventLocation.x+",y="+eventLocation.y;
    console.log("Event listener working!");
    let context = this.getContext('2d');
    let pixelData = context.getImageData(eventLocation.x,eventLocation.y,1,1).data;

    if(
        (pixelData[0]==0)&&
        (pixelData[1]==0)&&
        (pixelData[2]==0)&&
        (pixelData[3]==0)) 
    {
        coord+=" (transparent color detected, cannot be converted to HEX)";
    }
    let hex= "#"+("000000"+rgbToHex(pixelData[0],pixelData[1],pixelData[2])).slice(-6);

    document.getElementById("status").innerHTML = coord;
    document.getElementById("myCanvas").style.borderColor = hex;
},false);


function changeURL(){
    
    var theURL = document.getElementById("url").value;
    if(theURL===""){
        theURL="https://cdn.britannica.com/70/191970-050-1EC34EBE/Color-wheel-light-color-spectrum.jpg";
    }else{
        drawImageFromWebUrl(theURL);
    }
    console.log("This worked!")
}


