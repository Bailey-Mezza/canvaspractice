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

let draggingObstacle = null;
let offsetX = 0;
let offsetY = 0;

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

canvas.addEventListener('mousedown', function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // check if user clicked on any obstacle
    for (let i = 1; i < obstacles.length; i++) { // skip floor at index 0
        const obs = obstacles[i];
        if (
            mouseX >= obs.x &&
            mouseX <= obs.x + obs.height &&
            mouseY >= obs.y &&
            mouseY <= obs.y + obs.width
        ) {
            draggingObstacle = obs;
            offsetX = mouseX - obs.x;
            offsetY = mouseY - obs.y;
            break;
        }
    }
});

canvas.addEventListener('mousemove', function (e) {
    if (draggingObstacle) {
        draggingObstacle.x = e.clientX - offsetX;
        draggingObstacle.y = e.clientY - offsetY;
    }
});

canvas.addEventListener('mouseup', function () {
    draggingObstacle = null;
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

        if (this.x - this.radius <= 0) {
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

function isOnPlatform() {
    grounded = false; // reset each frame

    players.forEach(player => {
        obstacles.forEach(obstacle => {
            const playerBottom = player.y + player.radius;
            const playerTop = player.y - player.radius;
            const playerLeft = player.x - player.radius;
            const playerRight = player.x + player.radius;

            const obsTop = obstacle.y;
            const obsBottom = obstacle.y + obstacle.width;
            const obsLeft = obstacle.x;
            const obsRight = obstacle.x + obstacle.height;

            // check if player's bottom is touching obstacle's top and horizontal overlap
            const isLandingOnTop = playerBottom >= obsTop &&
                                    playerBottom <= obsTop + 10 &&
                                    playerRight >= obsLeft &&
                                    playerLeft <= obsRight &&
                                    velocity >= 0;

            if (isLandingOnTop) {
                player.y = obsTop - player.radius;
                velocity = 0;
                vy = 0;
                grounded = true;
            }
        });
    });
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

    isOnPlatform()
}

init();
animate();