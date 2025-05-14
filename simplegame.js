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

    spawnEnemies()
}

function spawnEnemies() {
    setInterval(() => {
        const radius = randomIntFromRange(10, 50);
        let x, y;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.height;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

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
let animationId;
function animate() {
    animationId = requestAnimationFrame(animate);
    content.fillStyle = 'rgba(0,0,0, 0.5)'
    content.fillRect(0, 0, innerWidth, innerHeight);

    player.update();

    projectiles.forEach((projectile, index) => {
        projectile.update();

        if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.x - projectile.radius > canvas.height){
            projectiles.splice(index, 1);
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.update();
        const dist =  Math.hypot(player.x - enemy.x, player.y - enemy.y);
                   
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId);
        }

        projectiles.forEach((projectile, projectileIndex) => {
           const dist =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

           if (dist - enemy.radius - projectile.radius < 1) {
            if (enemy.radius > 20) {
                gsap.to(enemy, {
                    radius: enemy.radius - 10
                })
                setTimeout(() => {
                projectiles.splice(projectileIndex, 1);
            }, 0)
            } else {
                setTimeout(() => {
                projectiles.splice(projectileIndex, 1);
                enemies.splice(index, 1);
            }, 0)
            }
           }
        })
    });
}

init();
animate();