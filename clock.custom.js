document.addEventListener('DOMContentLoaded', function()
{
	radius = resize();
	dateClock();
	clock(radius, document.getElementById("sec").checked, document.getElementById("milli").checked, document.getElementById("night").checked, document.getElementById("hands").checked, document.getElementById("digit").checked, document.getElementById("rotate").checked);
	setInterval(function()
	{
		if(document.getElementById("digit").checked)
		{
			if(!document.getElementById("dateSwitch").checked)
			{
				dateClock(radius, document.getElementById("night").checked, document.getElementById("rotate").checked);
			}
			else
			{
				clock(radius, document.getElementById("sec").checked, document.getElementById("milli").checked, document.getElementById("night").checked, document.getElementById("hands").checked, document.getElementById("rotate").checked);
			}
		}
		else
		{
			digital(document.getElementById("sec").checked, document.getElementById("milli").checked);
		}
	}, 2);
	
	window.addEventListener('resize', function()
	{
		radius = resize();
	});
}, false);

var startAngleArcH = Math.floor((Math.random() * 360));
var startAngleArcM = Math.floor((Math.random() * 360));
var startAngleArcS = Math.floor((Math.random() * 360));
var startAngleArcMI = Math.floor((Math.random() * 360));

var startAngleArcD = Math.floor((Math.random() * 360));
var startAngleArcMO = Math.floor((Math.random() * 360));
var startAngleArcWD = Math.floor((Math.random() * 360));

function getStartAngle(angle)
{
	return toRadians(angle - 90);
}

function daysInMonth(anyDateInMonth) 
{
    return new Date(anyDateInMonth.getYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();
}

function getRealWeekday(day)
{
	day = day.getDay();
	if(day == 0)
	{
		day = 7;
	}
	return day;
}

function dateClock(r, night, rotate)
{
	length = 9 * (r / 10);
	
	width = 4 * (r / 100);
	
	//Color
	if(!night)
	{
		color = "#ffffff";
	}
	else
	{
		color = "#000000";
	}
	
	var currDate = new Date();
	var date = currDate.getDate();
	var weekday = getRealWeekday(currDate);
	var month = currDate.getMonth() + 1;
	var dIM = daysInMonth(currDate);
	
	var angleD = date * (360/dIM);
	var dateX = Math.sin(toRadians(angleD)) * length + r;
	var dateY = Math.cos(toRadians(angleD)) * length + r;
	dateY = r - (dateY - r);
	
	var angleWD = weekday * (360/7);
	var weekDX = Math.sin(toRadians(angleWD)) * length + r;
	var weekDY = Math.cos(toRadians(angleWD)) * length + r;
	weekDY = r - (weekDY - r);
	
	var angleM = month * (360/12) - (date * ((360/12)/dIM));
	var monthX = Math.sin(toRadians(angleM)) * length + r;
	var monthY = Math.cos(toRadians(angleM)) * length + r;
	
	var c = document.getElementById("clock");
	var ctx = c.getContext("2d");
	
	ctx.canvas.width = r * 2;
	ctx.canvas.height = r * 2;
	
	//Clear Canvas
	
	ctx.clearRect(0, 0, c.width, c.height);
		
	//Month
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	if(rotate)
	{
		ctx.arc(r, r, length, getStartAngle(startAngleArcMO), getStartAngle(startAngleArcMO) + toRadians(angleM));
		startAngleArcMO++;
	}
	else
	{
		ctx.arc(r, r, length, toRadians(-90), toRadians(-90) + toRadians(angleM));
	}
	ctx.stroke();
	ctx.closePath();
	
	//Weekdays
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	if(rotate)
	{
		ctx.arc(r, r, length - (2 * width), getStartAngle(startAngleArcWD), getStartAngle(startAngleArcWD) + toRadians(angleWD));
		startAngleArcWD--;
	}
	else
	{
		ctx.arc(r, r, length - (2 * width), toRadians(-90), toRadians(-90) + toRadians(angleWD));
	}
	ctx.stroke();
	ctx.closePath();
	
	//Days
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	if(rotate)
	{
		ctx.arc(r, r, length - (4 * width), getStartAngle(startAngleArcD), getStartAngle(startAngleArcD) + toRadians(angleD));
		startAngleArcD++;
	}
	else
	{
		ctx.arc(r, r, length - (4 * width), toRadians(-90), toRadians(-90) + toRadians(angleD));
	}
	ctx.stroke();
	ctx.closePath();
	
	//String
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "3rem consolas";
	ctx.fillStyle = color;
	ctx.fillText(date + '.' + month + '.' + currDate.getFullYear(), r, r, (length - (4 * width + 20)) * 2);
}

function digital(showSec, showMilli)
{
	//Digital clock
	
	var currDate = new Date();
	var minutes = currDate.getMinutes();
	var hours24 = currDate.getHours();
	var seconds = currDate.getSeconds();
	var milli = currDate.getMilliseconds();
	
	//Weekdays
	var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var time;
	var date;
	var timestamp;
	time = pad(hours24, 2) + ":" + pad(minutes, 2);
	date = weekdays[currDate.getDay()] + " " + currDate.getDate() + "." + (currDate.getMonth() + 1) + "." + currDate.getFullYear();
	if(showSec)
	{
		time += ":" + pad(seconds, 2);
	}
	else
	{
		if(showMilli)
		{
			time += ":00";
		}
	}
	if(showMilli)
	{
		time += ":" + pad(milli, 4);
		timestamp = "(unix timestamp: " + Date.now() + ")";
	}
	else
	{
		timestamp = "";
	}
	
	document.getElementById("date").innerHTML = date;
	document.getElementById("time").innerHTML = time;
	document.getElementById("timestamp").innerHTML = timestamp;
}

function clock (r, showSec, showMilli, night, hands, rotate)
{
	lengthS = 8 * (r / 10);
	lengthM = 7 * (r / 10);
	lengthMI = 9 * (r / 10);
	lengthH = 6 * (r / 10);
	
	//line width
	widthH = 4 * (r / 100);
	widthM = 2.5 * (r / 100);
	widthS = 1 * (r / 100);
	widthMI = .5 * (r / 100);
	
	//circle parameters
	arcRadius = 4.5 * (r / 100);
	
	//Color
	if(!night)
	{
		color = "#ffffff";
	}
	else
	{
		color = "#000000";
	}
	
	var currDate = new Date();
	var minutes = currDate.getMinutes();
	var hours = currDate.getHours() % 12;
	var hours24 = currDate.getHours();
	var seconds = currDate.getSeconds();
	var milli = currDate.getMilliseconds();
	
	var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var time;
	var date;
	var timestamp;
	time = pad(hours24, 2) + ":" + pad(minutes, 2);
	date = weekdays[currDate.getDay()] + " " + currDate.getDate() + "." + (currDate.getMonth() + 1) + "." + currDate.getFullYear();
	if(showSec)
	{
		time += ":" + pad(seconds, 2);
	}
	else
	{
		if(showMilli)
		{
			time += ":00";
		}
	}
	if(showMilli)
	{
		time += ":" + pad(milli, 4);
	}
	
	var angleMI = milli * (360/1000);
	var milliX = Math.sin(toRadians(angleMI)) * lengthMI + r;
	var milliY = Math.cos(toRadians(angleMI)) * lengthMI + r;
	milliY = r - (milliY - r);
	var angleS = seconds * (360/60);
	if(showMilli)
	{
		angleS += (milli * (6/1000));
	}
	var secondX = Math.sin(toRadians(angleS)) * lengthS + r;
	var secondY = Math.cos(toRadians(angleS)) * lengthS + r;
	secondY = r - (secondY - r);
	var angleM = minutes * (360/60);							//Angle of minute hand
	if(showSec)
	{
		angleM += (seconds * (6/60));
	}
	if(showMilli)
	{
		angleM += (milli * ((6/60)/1000));
	}
	var minuteX = Math.sin(toRadians(angleM)) * lengthM + r;	//X-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50))
	var minuteY = Math.cos(toRadians(angleM)) * lengthM + r;  	//Y-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50))
	minuteY = r - (minuteY - r); 							//Spiegeln, da Y-Achse von oben nach unten geht
	var angleH = (hours * (360/12)) + (minutes * (30/60)) + (seconds * ((30/60)/60)) + (milli * (((30/60)/60)/1000));
	var hourX = Math.sin(toRadians(angleH)) * lengthH + r;		//X-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50))
	var hourY = Math.cos(toRadians(angleH)) * lengthH + r;  	//Y-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50)
	hourY = r - (hourY - r);
	
	var c = document.getElementById("clock");
	var ctx = c.getContext("2d");
	
	ctx.canvas.width = r * 2;
	ctx.canvas.height = r * 2;
	
	//Clear Canvas
	
	ctx.clearRect(0, 0, c.width, c.height);
	
	//Draw Hands
	if(!hands)
	{
		//hour
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = widthH;
		if(rotate)
		{
			ctx.arc(r, r, lengthMI, getStartAngle(startAngleArcH), getStartAngle(startAngleArcH) + toRadians(angleH));
			startAngleArcH++;
		}
		else
		{
			ctx.arc(r, r, lengthMI, toRadians(-90), toRadians(-90) + toRadians(angleH));
		}
		ctx.stroke();
		ctx.closePath();
		//minute
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = widthH;
		if(rotate)
		{
			ctx.arc(r, r, lengthMI - (2 * widthH), getStartAngle(startAngleArcM), getStartAngle(startAngleArcM) + toRadians(angleM));
			startAngleArcM--;
		}
		else	
		{
			ctx.arc(r, r, lengthMI - (2 * widthH), toRadians(-90), toRadians(-90) + toRadians(angleM));
		}
		ctx.stroke();
		ctx.closePath();
		if(showSec)
		{
			//second
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = widthH;
			if(rotate)
			{
				ctx.arc(r, r, lengthMI - (4 * widthH), getStartAngle(startAngleArcS), getStartAngle(startAngleArcS) + toRadians(angleS));
				startAngleArcS++;
			}
			else
			{
				ctx.arc(r, r, lengthMI - (4 * widthH), toRadians(-90), toRadians(-90) + toRadians(angleS));
			}
			ctx.stroke();
			ctx.closePath();
		}
		if(showMilli)
		{
			//milli
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = widthH;
			if(rotate)
			{
				ctx.arc(r, r, lengthMI - (6 * widthH + 10), getStartAngle(startAngleArcMI), getStartAngle(startAngleArcMI) + toRadians(angleMI));
				startAngleArcMI--;
			}
			else
			{
				ctx.arc(r, r, lengthMI - (6 * widthH + 10), toRadians(-90), toRadians(-90) + toRadians(angleMI));
			}
			ctx.stroke();
			ctx.closePath();
		}
		
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.font = "3rem consolas";
		ctx.fillStyle = color;
		ctx.fillText(time, r, r, (lengthMI - (6 * widthH + 20)) * 2);
		ctx.textBaseline = "bottom";
		ctx.font = "2rem consolas";
		ctx.fillText(date, r, r, (lengthMI - (6 * widthH + 20)) * 2);
	}
	else
	{
		//Draw dial
		var img = document.getElementsByClassName("img")[0];
		ctx.drawImage(img, 0, 0, r * 2, r * 2);
		if(!night)
		{
			negativeImage(ctx);
		}
		
		//Hours
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(r, r);
		ctx.lineWidth = widthH;
		ctx.lineTo(hourX, hourY);
		ctx.stroke();
		//Minutes
		ctx.lineWidth = widthM;
		ctx.moveTo(r, r);
		ctx.lineTo(minuteX, minuteY);
		ctx.stroke();
		ctx.closePath();
		//Milliseconds
		if(showMilli)
		{
			ctx.beginPath();
			ctx.lineWidth = widthMI;
			ctx.strokeStyle = color;
			ctx.moveTo(r, r);
			ctx.lineTo(milliX, milliY);
			ctx.stroke();
			ctx.closePath();
		}
		//Seconds (Has to be the last one otherwise it will be visibly overlapped due to the red color)
		if(showSec)
		{
			ctx.beginPath();
			ctx.lineWidth = widthS;
			ctx.strokeStyle = "#ff0000";
			ctx.moveTo(r, r);
			ctx.lineTo(secondX, secondY);
			ctx.stroke();
			ctx.closePath();
		}
		
		//Draw Dot in the middle
		ctx.beginPath();
		if(!night)
		{
			ctx.strokeStyle = "#ffffff";
			ctx.fillStyle = "#ffffff";
		}
		else
		{
			ctx.strokeStyle = "#000000";
			ctx.fillStyle = "#000000";
		}
		ctx.arc(r, r, arcRadius, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	}	
}

function resize()
{
	if(window.innerHeight < window.innerWidth)
	{	
		ra = window.innerHeight / 2;
	}
	else
	{
		ra = window.innerWidth / 2;
	}
	
	return ra;
}

function toRadians(angle)
{
	return (angle * (Math.PI/180));
}

function pad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

function negativeImage(context) {
	var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	var data = imageData.data;
	for(var i = 0; i < data.length; i += 4) {
		// red
		data[i] = 255 - data[i];
		// green
		data[i + 1] = 255 - data[i + 1];
		// blue
		data[i + 2] = 255 - data[i + 2];
	}

	// overwrite original image
	context.putImageData(imageData, 0, 0);
}