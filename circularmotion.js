var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');
content.fillStyle = '#000000'
content.fillRect(0, 0, canvas.width, canvas.height);

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
function Particle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distancefromCenter = {x: randomIntFromRange(75, 150), y: randomIntFromRange(75, 150)};
    this.lastMouse = {x: x, y: y};

    this.update = function () {
        //Move points over time
        const lastPoint = {x: this.x, y: this.y};
        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distancefromCenter.x;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distancefromCenter.y;
        this.draw(lastPoint);
    }

    this.draw = lastPoint => {
        content.beginPath();
        content.strokeStyle = this.color;
        content.lineWidth = radius;
        content.moveTo(lastPoint.x, lastPoint.y);
        content.lineTo(this.x, this.y);
        content.stroke();
        content.closePath();
    }
}

//Implementation
let particles;
function init() {
    particles = [];

    for (let index = 0; index < 100; index++) {
        const radius = randomIntFromRange(2, 4)
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius));
    }
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.fillStyle = 'rgba(0, 0, 0, 0.05)';
    content.fillRect(0, 0, canvas.width, canvas.height);
    //content.clearRect(0, 0, innerWidth, innerHeight);

    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();