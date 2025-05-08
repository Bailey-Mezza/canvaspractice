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
    '#FF6B6B',
    '#E63946',
    '#D90429',
    '#EF476F',
    '#F94144',
    '#F37272',
]

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
class Player {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = 'rgb(255,255,255)';
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
    }
}

class Projectile {
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color ='rgb(149, 0, 255)';
        this.velocity = { x: velocity.x, y: velocity.y };
    }

    draw() {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
}

class Enemy {
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.velocity = { x: velocity.x, y: velocity.y };
    }

    draw() {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.fillStyle = this.color;
        content.fill();
        content.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
}

let projectiles = [];
let enemies;
let player;
//Implementation
function init() {
    enemies = [];

    player = new Player(canvas.width / 2, canvas.height / 2, 20);

    setInterval(() => {
        const x = randomIntFromRange(0, canvas.width);
        const y = randomIntFromRange(0, canvas.height);
        const radius = randomIntFromRange(10, 50);
        const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2)
        const velocity = {
            x: -Math.cos(angle),
            y: -Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, velocity));
    }, 1000)
}

addEventListener('click',
    event => {
        mouse.x = event.x;
        mouse.y = event.y;
        const angle = Math.atan2(mouse.y - canvas.height / 2, mouse.x - canvas.width / 2)
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
        projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, velocity));

    })

//Animate loop
function animate() {
    requestAnimationFrame(animate);
    content.fillStyle = 'rgba(0,0,0, 0.5)'
    content.fillRect(0, 0, innerWidth, innerHeight);

    player.update();

    projectiles.forEach(projectile => {
        projectile.update();
    });

    enemies.forEach(enemy => {
        enemy.update();
    });
}

init();
animate();