var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');

//variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const gravity = 0.005;
const friction = 0.99;

//event listeners
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
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        content.save();
        content.globalAlpha = this.alpha;
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
        content.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
    }
}

let particles;
//Implementation
function init() {
    particles = [];

    // for (let index = 0; index < 10; index++) {
    //     particles.push(new Particle(canvas.height/2))
    // }
}

addEventListener('click',
    (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        const particleCount = 500;
        const angleIncrement = (Math.PI * 2) / particleCount;
        const power = 30;

        for (let index = 0; index < particleCount; index++) {
            particles.push(new Particle(mouse.x, mouse.y, 3, {
                x: Math.cos(angleIncrement * index) * Math.random() * power,
                y: Math.sin(angleIncrement * index) * Math.random() * power
            }))
        }
    })

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.fillStyle = 'rgba(0, 0, 0, 0.05)';
    content.fillRect(0, 0, innerWidth, innerHeight);

    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update();
        } else {
            particles.splice(i, 1);
        }
    });
}

init();
animate();
