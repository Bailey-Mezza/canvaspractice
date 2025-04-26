var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');
content.fillStyle = 'rgba(255, 0, 0, 0.5)';
content.fillRect(100, 100, 100, 100);
content.fillStyle = 'rgba(255, 0, 0, 0.3)';
content.fillRect(250, 250, 100, 100);
content.fillStyle = 'rgba(255, 0, 0, 0.1)';
content.fillRect(250, 100, 100, 100);
content.fillStyle = 'rgba(255, 0, 0, 0.2)';
content.fillRect(100, 250, 100, 100);

//line
content.beginPath();
content.moveTo(500, 100);
content.lineTo(100, 500);
content.lineTo(500, 500);
content.lineTo(500, 100);
content.strokeStyle = "#bbb";
content.stroke();

//circle
content.beginPath();
content.arc(400, 400, 50, 0, Math.PI * 2, false);
content.strokeStyle = 'rgba(0, 255, 0, 0.6)';
content.stroke();

for (let index = 0; index < 10; index++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    content.beginPath();
    content.arc(x, y, 50, 0, Math.PI * 2, false);
    content.strokeStyle = 'rgba(0, 255, 0, 0.6)';
    content.stroke();
}