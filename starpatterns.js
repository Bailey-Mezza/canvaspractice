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

let radians = 0;
let alpha = 1;
let mouseDown = false;
//event listeners
addEventListener('mousedown',
    () => {
        mouseDown = true;
    }
)

addEventListener('mouseup',
    () => {
        mouseDown = false;
    }
)

addEventListener('resize',
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })

//Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Objects
class Particle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;

    }

    draw() {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.shadowColor = this.color;
        content.shadowBlur = 15;
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
    }

    update() {
        this.draw();
    }
}

let particles;
//Implementation
function init() {
    particles = [];

    const canvasWidth = canvas.width + 1000;
    const canvasHeight = canvas.height + 1000;
    for (let index = 0; index < 1000; index++) {
        const x = randomIntFromRange(-canvasWidth / 2, canvasWidth / 2);
        const y = randomIntFromRange(-canvasHeight / 2, canvasHeight / 2);
        const radius = randomIntFromRange(0, 2);
        particles.push(new Particle(x, y, radius));
    }
}

//Animate loop

function animate() {
    requestAnimationFrame(animate);
    content.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    content.fillRect(0, 0, canvas.width, canvas.height);

    content.save();
    content.translate(canvas.width / 2, canvas.height / 2)
    content.rotate(radians);
    particles.forEach(particle => {
        particle.update();
    });
    content.restore();
    radians += 0.005;

    if (mouseDown && alpha >= 0.05) {
        alpha -= 0.05;
        radians += 0.001;
    } else if (!mouseDown && alpha < 1) {
        alpha += 0.01;
        radians -= 0.001;
    }
    // console.log(radians)
}

init();
animate();