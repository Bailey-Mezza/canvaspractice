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
    '#BEE9E8',
    '#1D3557'
]

var gravity = 1;
var friction = 0.99;

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

//Objects
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.dy = dy;
    this.dx = dx;

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
        //console.log(this.dy);
        if (this.x + this.radius + this.dx > canvas.width || this.x-radius <= 0) {
            this.dx = -this.dy;
        }

        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}

var circleArray = [];
//Implementation
function init() {
    for (let index = 0; index < 1000; index++) {
        var radius = randomIntFromRange(5,35);
        var x = randomIntFromRange(30, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height-200);
        var dy = randomIntFromRange(1,4);
        var dx = randomIntFromRange(-2, 2);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

//Animate loop
function animate() {
    content.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);
    circleArray.forEach(circle => {
        circle.update();
    });
}

init();
animate();