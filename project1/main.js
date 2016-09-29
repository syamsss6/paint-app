var canvas;
var    context;
var    dragging = false;
var    dragstartlocation;
var    snapshot;


function getcanvascoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takesnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoresnapshot() {
    context.putImageData(snapshot, 0, 0);
}

function drawline(position) {
    context.beginPath();
    context.moveTo(dragstartlocation.x, dragstartlocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function drawcircle(position) {
    var radius = Math.sqrt(Math.pow((dragstartlocation.x - position.x), 2) + Math.pow((dragstartlocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragstartlocation.x, dragstartlocation.y, radius, 0, 2 * Math.PI, false);
}


function drawfilledcircle(position)
{


    var imgElement = document.getElementById("logo");
    context.fillStyle = context.createPattern(imgElement, "repeat")

    var radius = Math.sqrt(Math.pow((dragstartlocation.x - position.x), 2) + Math.pow((dragstartlocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragstartlocation.x, dragstartlocation.y, radius, 0, 2 * Math.PI, false);
context.fill();



}

function drawpolygon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragstartlocation.x - position.x), 2) + Math.pow((dragstartlocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragstartlocation.x + radius * Math.cos(angle), y: dragstartlocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}

function draw(position) {

    var fillBox = document.getElementById("fillBox"),
        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    if (shape === "circle") {
        drawcircle(position);
    }
    if (shape === "line") 
    {
        drawline(position);
    }

    if (shape === "polygon") 
    {
        drawpolygon(position, 8, Math.PI / 4);
    }
    if (shape === "square")
    {
    
       drawpolygon(position, 4, Math.PI / 4);
    }
    if (shape === "filledcircle")
    {
       drawfilledcircle(position);
    }
    if (fillBox.checked) 
    {
        context.fill();
    
    } else 
    {
        context.stroke();
    }
}

function dragstart(event) {
    dragging = true;
    dragstartlocation = getcanvascoordinates(event);
    takesnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoresnapshot();
        position = getcanvascoordinates(event);
        draw(position, "polygon");
    }
}

function dragstop(event) {
    dragging = false;
    restoresnapshot();
    var position = getcanvascoordinates(event);
    draw(position, "polygon");
}

function changefillstyle()
{
context.fillStyle = this.value;
event.stopPropagation();
}


function changestrokecolor()
{
context.strokeStyle = this.value;
event.stopPropagation();
}


function clearcanvas()
{
        context.clearRect(0, 0, canvas.width, canvas.height);
}


function main() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    var fillcolor = document.getElementById("fillcolor");
    var strokecolor = document.getElementById("strokecolor");
    //context.strokeStyle = 'green';
    context.fillStyle = fillcolor.value;
    context.strokeStyle = strokecolor.value;
    context.lineWidth = 4;
    //context.lineCap = 'round';
    

    




    canvas.addEventListener('mousedown', dragstart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragstop, false);
    fillcolor.addEventListener("input",changefillstyle,false);
    strokecolor.addEventListener("input",changestrokecolor,false);
}

window.addEventListener('load', main, false);
