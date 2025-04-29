var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');

//variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

var colorArray = [
    '#A8DADC',
    '#457B9D',
    '#F1FAEE',
    '#BEE9E8',
    '#1D3557'
]

var gravity = 1;
var friction = 0.9;

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

console.log(canvas.height)
//Objects
function Circle(x, y, dy, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.dy = dy;

    this.draw = function () {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
    }

    this.update = function () {
        if (this.y + this.radius > canvas.height && this.dy > 0) {
            this.dy = -this.dy * friction;
        } else if (this.y + this.radius > canvas.height && Math.abs(this.dy) < 1) {
            this.dy = 0;
        } else {
            this.dy += gravity;
            // console.log(this.y);
            // console.log(this.dy);
        }
        console.log(this.dy);
        this.y += this.dy;
        this.draw();
    }
}

var circle;
//Implementation
function init() {
    circle = new Circle(canvas.width / 2, canvas.height / 2, 2, 30)
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.clearRect(0, 0, innerWidth, innerHeight);
    circle.update();
}

init();
animate();