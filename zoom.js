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
     return Math.floor[Math.random() * (max-min+1) + min]
 }

 function checkCollision(x1, x2, y1, y2, width1, width2, height1, height2) {
    if (
        x1 < x2 + width2 &&
        x1 + width1 > x2 &&
        y1 < y2 + height2 &&
        y1 + height1 > y2
     ){
        return true;
     } else {
        return false;
     }
 }
 
 //Objects
 function Square(x, y, height, width, color) {
     this.x = x;
     this.y = y;
     this.height = height;
     this.width = width;
     this.color = color;
 
     this.draw = function () {
         content.fillStyle = this.color;
         content.fillRect(this.x, this.y, this.height, this.width);
     }
 
     this.update = function () {
         this.draw();
     }
 }
 
 //Implementation
 let square1;
 let square2;
 function init() {
     square1 = new Square(300, 300, 200, 200, 'black');
     square2 = new Square(mouse.x, mouse.y, 50, 50, 'red');
 }
 
 //Animate loop
 function animate() {
     requestAnimationFrame(animate);
     content.clearRect(0, 0, innerWidth, innerHeight);
     square1.update();
     square2.x = mouse.x;
     square2.y = mouse.y;
     square2.update();
 
     let isColliding = checkCollision(square1.x, square2.x, square1.y, square2.y, 
        square1.width, square2.width, square1.height, square2.height);

     if(isColliding) {
        square1.color = 'red';
    } else {
        square1.color = 'black';
    }
}
 
 init();
 animate();