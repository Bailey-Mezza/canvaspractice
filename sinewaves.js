var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');
content.fillStyle = '#FFF'
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
function Wave(y, length, amplitude, frequency) {
    this.y = y;
    this.length = length;
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.color = '#20B2AA';
    this.increment = frequency

    this.draw = function () {
        content.beginPath();
        content.moveTo(0, canvas.height/2)
        for (let index = 0; index < canvas.width; index++) {
            content.lineTo(index, this.y + Math.sin(index * this.length + this.increment)
             * this.amplitude * Math.sin(this.increment));
        }

        content.strokeStyle = this.color;
        content.stroke();
        content.closePath();
        this.increment += this.frequency;
    }

    this.update = function () {
        this.draw();
    }
}

let waves;
//Implementation
function init() {
    waves = [];

    waves.push(new Wave(canvas.height/2, 0.01, 100, 0.01));
    // waves.push(new Wave(canvas.height/4, 0.01, 100, 0.01));
    // waves.push(new Wave((canvas.height/4)*3, 0.01, 100, 0.01));
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.fillStyle = 'rgba(0, 0, 0, 0.02)'
    content.fillRect(0, 0, innerWidth, innerHeight);

    waves.forEach(wave => {
        wave.update();
    });
}

init();
animate();