let canvas;
let ctx;
let canvasWidth = 1200;
let canvasHeight = 800;
let keys = [];
let ship;
 
document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){
    canvas = document.getElementById("game-view");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ship = new Ship();
 
    document.body.addEventListener("keydown", HandleKeyDown);
    document.body.addEventListener("keyup", HandleKeyUp);
 
    Render();
}

function HandleKeyDown(e){
    keys[e.keyCode] = true;
}

function HandleKeyUp(e){
    keys[e.keyCode] = false;
    if (e.keyCode === 32){
        bullets.push(new Bullet(ship.angle));
    }
}

class Ship {
    constructor() {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
    }
    Rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }
    Update() {
        let radians = this.angle / Math.PI * 180;

        if (this.movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }   
        if (this.x < this.radius) {
            this.x = canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = this.radius;
        }
        if (this.y < this.radius) {
            this.y = canvas.height;
        }
        if (this.y > canvas.height) {
            this.y = this.radius;
        }
        this.velX *= 0.99;
        this.velY *= 0.99;

        this.x -= this.velX;
        this.y -= this.velY;
    }
    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 3);

        let radians = this.angle / Math.PI * 180;
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);
 
        for (let i = 0; i < 3; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}
 
function Render() {
    ship.movingForward = (keys[87]);
 
    if (keys[68]) {
        ship.Rotate(1);
    }
    if (keys[65]) {
       ship.Rotate(-1);
    }
   
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
 
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
 
    ship.Update();
    ship.Draw();
 
    ctx.font = '21px Arial';
 
    requestAnimationFrame(Render);
}