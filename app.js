var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');

// content.fillStyle = 'rgba(255, 0, 0, 0.5)';
// content.fillRect(100, 100, 100, 100);
// content.fillStyle = 'rgba(255, 0, 0, 0.3)';
// content.fillRect(250, 250, 100, 100);
// content.fillStyle = 'rgba(255, 0, 0, 0.1)';
// content.fillRect(250, 100, 100, 100);
// content.fillStyle = 'rgba(255, 0, 0, 0.2)';
// content.fillRect(100, 250, 100, 100);

// //line
// content.beginPath();
// content.moveTo(500, 100);
// content.lineTo(100, 500);
// content.lineTo(500, 500);
// content.lineTo(500, 100);
// content.strokeStyle = "#bbb";
// content.stroke();

//circle

// content.beginPath();
// content.arc(400, 400, 50, 0, Math.PI * 2, false);
// content.strokeStyle = 'rgba(0, 255, 0, 0.6)';
// content.stroke();

//for (let index = 0; index < 10; index++) {
// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// content.beginPath();
// content.arc(x, y, 50, 0, Math.PI * 2, false);
// content.strokeStyle = 'rgba(0, 255, 0, 0.6)';
// content.stroke();
//}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        content.beginPath();
        content.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        content.strokeStyle = 'rgba(0, 255, 0, 0.6)';
        content.stroke();
    }

    this.update = function () {
        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        } else if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

var circleArray = [];

for (let index = 0; index < 100; index++) {
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var radius = 50;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    content.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach(circle => {
        circle.draw();
        circle.update();
    });
}

animate();