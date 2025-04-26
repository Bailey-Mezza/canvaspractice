var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var content = canvas.getContext('2d');
content.fillRect(100, 100, 100, 100);
content.fillRect(250, 250, 100, 100);
content.fillRect(250, 100, 100, 100);
content.fillRect(100, 250, 100, 100);