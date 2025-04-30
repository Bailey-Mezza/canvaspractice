var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');

//variables
var mouse = {
    x: 10,
    y: 10
}

var colorArray = [
    '#A8DADC',
    '#457B9D',
    '#F1FAEE',
    '#BEE9E8',
    '#1D3557'
]

//event listeners
window.addEventListener('mousemove', 
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
})

window.addEventListener('resize', 
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
})

//Utility Functions
function randomIntFromRange(min,max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

//Objects
function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
    }

    this.update = function () {
        this.draw();
    }
}

//Implementation
let circle1;
let circle2;
function init() {
    circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(undefined, undefined, 30, 'red');
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.clearRect(0, 0, innerWidth, innerHeight);
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius){
        circle1.color = 'red';
    } else {
        circle1.color = 'black';
    }
}

init();
animate();