//
//Color Picker
//
var canvas = document.getElementById("myCanvas");
function changeURL(){
    
    var theURL = document.getElementById("url").value;
    if(theURL===""){
        theURL="https://cdn.britannica.com/70/191970-050-1EC34EBE/Color-wheel-light-color-spectrum.jpg";
    }
    document.getElementById("importImage").src=theURL;
    console.log("This worked!")
}


