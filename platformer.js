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

let vxr, vxl, vy, velocity = 0, gravity = 1, friction = 0.2;
let grounded = false;

//event listeners
addEventListener('resize',
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })


addEventListener("keydown", function (e) {
    if (e.code == 'KeyD') {
        vxr = 10;
        console.log("Yippee");
    } if (e.code == 'KeyA') {
        vxl = -10;
    } if (e.code == 'KeyW' && grounded) {
        vy = -30;
        grounded = false;
    }
});

addEventListener("keyup", function (e) {
    if (e.code == 'KeyD') {
        vxr = 0;
    } if (e.code == 'KeyA') {
        vxl = 0;
    }
});

//Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Objects
class Player {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw() {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
    }

    update() {
        this.draw();
        this.x += (vxr || 0) + (vxl || 0);

        if (this.x + this.radius <= 0) {
            this.x = 0 + this.radius;
            vxr = -vxr;
            vxl = -vxl;
        } else if (this.x + this.radius >= canvas.width) {
            this.x = canvas.width - this.radius
            vxr = -vxr;
            vxl = -vxl;
        }

        velocity += gravity

        this.y += (vy || 0) + gravity + velocity;

        const groundlevel = canvas.height - 100 - this.radius

        if (this.y >= groundlevel) {
            this.y = groundlevel;
            velocity *= -friction;
            vy = 0;
            if (Math.abs(velocity) < 1) {
                velocity = 0;
                grounded = true;
            }

        }
    }
}

class Obstacle {
    constructor(x, y, height, width,) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw() {
        content.fillStyle = this.color;
        content.fillRect(this.x, this.y, this.height, this.width);
    }

    update() {
        this.draw();
    }
}

let players;
let obstacles;
//Implementation
function init() {
    players = [];
    obstacles = [];

    for (let index = 0; index < 1; index++) {
        players.push(new Player(canvas.width / 2, canvas.height - 150, 30));
    }

    obstacles.push(new Obstacle(0, canvas.height - 100, canvas.width, 100));//floor

    for (let index = 0; index < 2; index++) {
        x = randomIntFromRange(100, canvas.width - 100);
        y = randomIntFromRange(100, canvas.height - 100);
        obstacles.push(new Obstacle(x, y, 100, 100));
    }
}

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.clearRect(0, 0, innerWidth, innerHeight);

    players.forEach(player => {
        player.update();
    });

    obstacles.forEach(obstacle => {
        obstacle.update();
    });
}

init();
animate();