"use strict"

const ResetButton = document.getElementById("clearButton");
const PlotButton = document.getElementById("plotButton");

function Clear(canvasName) 
{
   let canvas = document.getElementById(canvasName);
   let ctx = canvas.getContext('2d');

   ctx.beginPath();
   ctx.clearRect(0,0,canvas.width, canvas.height);
   ctx.stroke();
}

function Axis(canvasName)  
{
   let canvas = document.getElementById(canvasName);
   let ctx = canvas.getContext('2d');
   let cx = canvas.width;
   let cy = canvas.height;

   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;

   for (let i=0; i < 8;i++) 
   {
      ctx.moveTo(0,cy * i/8);
      ctx.lineTo(10,cy * i/8);

      ctx.moveTo(cx * i/8,cy/2-5);
      ctx.lineTo(cx * i/8,cy/2+5);
   }

   ctx.moveTo(0,cy/2);
   ctx.lineTo(cx,cy/2);

   ctx.stroke();
}

function Reset() 
{
   document.getElementById("x0Input").value = 0;
   document.getElementById("y0Input").value = 1;
   document.getElementById("s0Input").value = 2;
   document.getElementById("x1Input").value = 7;
   document.getElementById("y1Input").value = -2;
   document.getElementById("s1Input").value = -.75;

   Clear("circles");
   Axis("circles");
}


function PlotCurve()
{
   let canvas = document.getElementById('circles');
   let ctx = canvas.getContext('2d');

   let point1= 
   {
      x: Number(document.getElementById("x0Input").value),
      y: Number(document.getElementById("y0Input").value)
   };

   let point2= 
   {
      x: Number(document.getElementById("x1Input").value),
      y: Number(document.getElementById("y1Input").value)
   };

   let slope1= Number(document.getElementById("s0Input").value);

   let slope2= Number(document.getElementById("s1Input").value);
   /*

   let points= framePoints(point1, slope1, point2, slope2);

   for (let i= 1; i < points.length; i++)
   {
      ctx.moveTo(points[i-1].x * 100, (canvas.height/2) - (points[i-1].y * 100));
      ctx.lineTo(points[i].x * 100, (canvas.height/2) - (points[i].y * 100));
   }
   ctx.stroke();
   */
   
   let points= curvePoints(point1, slope1, point2, slope2);
   
   for (let i= 1; i < points.length; i++)
   {
      ctx.moveTo(points[i-1].x * 100, (canvas.height/2) - (points[i-1].y * 100));
      ctx.lineTo(points[i].x * 100, (canvas.height/2) - (points[i].y * 100));
   }
   
   ctx.stroke();
}

ResetButton.addEventListener('click', Reset);
PlotButton.addEventListener('click', PlotCurve);

Reset()
