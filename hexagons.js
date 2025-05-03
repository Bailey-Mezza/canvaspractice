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
function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

//Objects
class Hexagon {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.color = 'rgb(0, 255, 0)';
        this.radius = radius;
        this.sides = 6;
        this.angles = (Math.PI * 2) / this.sides;
    }

    draw() {
        content.beginPath();
        content.strokeStyle = this.color;
        for (let i = 0; i <= this.sides; i++) {
            const angle = i * this.angles;
            const x = this.x + this.radius * Math.cos(angle);
            const y = this.y + this.radius * Math.sin(angle);
    
            if (i === 0) {
                content.moveTo(x, y);
            } else {
                content.lineTo(x, y);
            }
        }
        content.stroke();
        content.closePath();
    }

    update() {
        this.draw();

        if (getDistance(mouse.x, mouse.y, this.x, this.y) < 80){
            this.color = "rgb(236, 236, 23)"
        } else{
            this.color = 'rgb(0, 0, 0)';
        }
    }
}

let hexagons;
//Implementation
function init() {
    hexagons = [];

    const radius = 100; // radius of each hexagon
    const rowCount = 100;
    const colCount = 100;

    const horizontalSpacing = radius * 3.05;
    const verticalSpacing = Math.sqrt(0.77) * radius;

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            // Offset every other row by half horizontal spacing
            const offsetX = (row % 2 === 0) ? 0 : horizontalSpacing / 2;

            const x = col * horizontalSpacing + offsetX;
            const y = row * verticalSpacing;

            hexagons.push(new Hexagon(x, y, radius));
        }
    }
}


//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.clearRect(0, 0, innerWidth, innerHeight);

    hexagons.forEach(hexagon => {
        hexagon.update();
    });
}

init();
animate();