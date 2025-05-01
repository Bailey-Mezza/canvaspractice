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

var gravity = 1;

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

function rotate (velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0){
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        //One-dimensional Newtonian equation rotated by angle for 2 dimensions
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
    
}

//Objects
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
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.save();
        content.globalAlpha = this.opacity;
        content.fillStyle = this.color;
        content.fill();
        content.restore();
        content.strokeStyle = this.color;
        content.stroke();
        content.closePath();
    }

    this.update = particles => {
        this.draw();
        
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]){ continue; }
            if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, particles[i]);
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.velocity.x = -this.velocity.x;
        } else if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        // Gravity implemented, doesn't work fully and looks abosuletly chaotic
        // if (this.y + this.radius > canvas.height && this.velocity.y > 0) {
        //     this.velocity.y = -this.velocity.y;
        // } else if (this.y + this.radius > canvas.height && Math.abs(this.velocity.y) < 1) {
        //     this.velocity.y = 0;
        // } else {
        //     this.velocity.y += gravity;
        // }
        // if (this.x + this.radius + this.velocity.x > canvas.width || this.x-radius <= 0) {
        //     this.velocity.x = -this.velocity.x;
        // }

        if (getDistance(mouse.x, mouse.y, this.x, this.y) < 80){
            this.opacity += 0.02;
            this.opacity = Math.min(0.5, this.opacity)
        } else if (this.opacity > 0){
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

    }
}

//Implementation
let particles = [];
function init() {
    for (let i = 0; i < 300; i++) {
        let x, y;
        let radius = 10;
        let validPosition = false;

        while (!validPosition) {
            x = randomIntFromRange(radius, innerWidth - radius);
            y = randomIntFromRange(radius, innerHeight - radius);

            validPosition = true;
            for (let j = 0; j < particles.length; j++) {
                if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 5) {
                    validPosition = false;
                    break;
                }
            }
        }

        particles.push(new Particle(x, y, radius))
    }
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach(particle => {
        particle.update(particles);
    });

    // circle1.update();
    // circle2.x = mouse.x;
    // circle2.y = mouse.y;
    // circle2.update();

    // if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius){
    //     circle1.color = 'red';
    // } else {
    //     circle1.color = 'black';
    // }
}

init();
animate();