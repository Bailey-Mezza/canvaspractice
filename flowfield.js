var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');

// content.fillStyle = 'rgb(0, 0, 0)';
// content.fillRect(0, 0, innerWidth, innerHeight);

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

const noise = new Noise(Math.random());

let time = 0;

//event listeners
addEventListener('mousemove',
    event => {
        mouse.x = event.x;
        mouse.y = event.y;
    })

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
    constructor(particle) {
        this.x = particle.x;
        this.y = particle.y;
        this.radius = particle.radius;
        this.velocity = { x: particle.velocity.x, y: particle.velocity.y };
        this.color = 'rgb(122, 0, 0)';
    }

    draw() {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
    }

    update() {
        const angle = getFlowAngle(this.x, this.y);

        // Calculate desired direction from angle
        const flowVelocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        // Smoothly steer toward flow direction
        const steerStrength = 0.1;
        this.velocity.x += (flowVelocity.x - this.velocity.x) * steerStrength;
        this.velocity.y += (flowVelocity.y - this.velocity.y) * steerStrength;

        // Move particle
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x > canvas.width + 20) {
            this.x = 0;
            this.y = Math.random() * (canvas.height);
        } else if (this.y > canvas.height + 20) {
            this.x = Math.random() * (canvas.width);
            this.y = 0;
        } else if (this.x < -20) {
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height);
        } else if (this.y < -20) {
            this.x = Math.random() * (canvas.width);
            this.y = canvas.height + 20;
        }
        

        this.draw();

    }
}

function drawField() {
    let xOffset = 0;
    const increment = 0.1;

    for (let x = 0; x < innerWidth; x += 50) {
        let yOffset = 0;
        for (let y = 0; y < innerHeight; y += 50) {
            const noiseValue = getFlowAngle(x, y);

            content.save();
            content.translate(x, y);
            content.rotate(noiseValue);
            content.beginPath();
            content.moveTo(0, 0);
            content.lineTo(20, 0);
            content.stroke();
            content.restore();

            yOffset += increment;
        }
        xOffset += increment;
    }
}

function getFlowAngle(x, y) {
    const increment = 0.1;
    const spacing = 50;

    const xIndex = Math.floor(x / spacing);
    const yIndex = Math.floor(y / spacing);

    const xOffset = xIndex * increment;
    const yOffset = yIndex * increment;

    // Generate noise-based angle
    let angle = noise.perlin3(xOffset, yOffset, time);

    // Map noise (-1 to 1) to angle (π/2 to 3π/2)
    angle = ((angle + 1) / 2) * Math.PI; // Maps to [0, π]
    angle += Math.PI / 2; // Shift to [π/2, 3π/2]

    return angle;
}



let particles;
//Implementation
function init() {
    particles = [];

    for (let index = 0; index < 2000; index++) {
        particles.push
            (new Particle(
                {
                    x: canvas.width * Math.random(),
                    y: canvas.height * Math.random(),
                    radius: 5,
                    velocity: {
                        x: Math.random(),
                        y: Math.random()
                    }
                }
            )
            )
    }
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.fillStyle = 'rgb(255, 255, 255)';
    content.fillRect(0, 0, innerWidth, innerHeight);

    time += 0.005;
    drawField();
    // console.log(particles);

    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();