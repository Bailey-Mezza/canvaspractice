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
    '#BEE9E8',
    '#1D3557'
]

let scale = 1;
let count = 0;

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

window.addEventListener('keydown', function (event) {
    const panSpeed = 20 / scale; 

    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            camera.y -= panSpeed;
            break;
        case 'ArrowDown':
        case 'KeyS':
            camera.y += panSpeed;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            camera.x -= panSpeed;
            break;
        case 'ArrowRight':
        case 'KeyD':
            camera.x += panSpeed;
            break;
        case 'Digit1':
            scale = Math.min(scale + 0.05, 2);
            break;
        case 'Digit2':
            scale = Math.max(scale - 0.05, 0.1);
            break;
    }
});



//Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

//Objects
let camera = {
    x: 0,
    y: 0
};

function Particle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: randomIntFromRange(-2.5, 2.5),
        y: randomIntFromRange(-2.5, 2.5)
    }
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.mass = 1;
    this.opacity = 0;

    this.draw = () => {
        content.beginPath();
        content.fillStyle = this.color;
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fill();
        content.closePath();
    }


    this.update = () => {
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x + this.radius > 5000 || this.x - this.radius < -5000) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > 5000 || this.y - this.radius < -5000) {
            this.velocity.y = -this.velocity.y;
        }


    }
}

//Implementation
let particles = [];
function init() {
    for (let i = 0; i < 200; i++) {
        let radius = 50;
        x = randomIntFromRange(radius, 5000);
        y = randomIntFromRange(radius, 5000);
    
        particles.push(new Particle(x, y, radius))
    }
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);

    content.setTransform(1, 0, 0, 1, 0, 0);
    content.clearRect(0, 0, canvas.width, canvas.height);

    content.translate(canvas.width / 2, canvas.height / 2);
    content.scale(scale, scale);
    content.translate(-camera.x, -camera.y);

    particles.forEach(particle => {
        particle.update();
    });
}


init();
animate();