/**
 * Created by liaofuan on 2016/6/7.
 */
var mycanvas,context;
window.onload = function(){
    createCanvas();
}

/*var image = new Image();
image.src = 'raw/dt.png';
image.onload = function(){
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image,0,0);
    document.body.appendChild(image);
    return canvas;
}*/

/*var canvas = image.onload();
context = canvas.getContext("2d");
var imageData = context.getImageData(0,0,canvas.width,canvas.height);
context.putImageData(imageData,0,0);*/
function createCanvas(){
    mycanvas = document.getElementById("myCanvas");
    context = mycanvas.getContext("2d");
    context.beginPath();//开始路径绘制
   /*context.moveTo(20,20);//设置路径起点，坐标为（20,20）
    context.lineTo(200,20);//绘制一条道（200,20）的直线
    context.strokeStyle = "#cc0000";//设置线的颜色
    context.stroke();//进行线的着色，这时整条线才变得可见
    context.fillStyle = 'blue';
    context.fillRect(50,50,200,100);
    context.strokeRect(10,10,200,100);
    context.clearRect(100,50,50,50);
    context.font = "Bold 20px Arial";
    context.textAlign = "left";
    context.fillStyle = "#008600";
    context.fillText("JingDecre",10,50);
    context.strokeText("Hello!",10,100);
    context.arc(50,50,50,0,Math.PI*2,true);
    context.fillStyle="#000000";
    context.fill();
    context.lineWidth = 1.0;
    context.strokeStyle = "#000";
    context.stroke();*/
    var myGradient = context.createLinearGradient(0,0,0,160);
    myGradient.addColorStop(0,"#BABABA");
    myGradient.addColorStop(1,"#000000");
    context.fillStyle = myGradient;
    context.fillRect(10,10,200,100);
    context.shadowOffsetX = 10;// 设置水平位移
    context.shadowOffsetY = 10;//设置垂直位移
    context.shadowBlur = 5; //设置模糊度
    context.shadowColor = "rgba(0,0,0,0.5)";

   /* context.fillStyle = "#cc0000";
    context.fillRect(10,10,200,100);
    var img = new Image();
    img.src = "raw/dt.png";
    context.drawImage(img,0,0);*/

}
