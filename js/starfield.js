/**
 * 星空背景 + 流星 + 爱心粒子
 */

// ============================
//  星空
// ============================
const starCanvas = document.getElementById('starfield');
const starCtx = starCanvas.getContext('2d');

function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resizeStarCanvas();
window.addEventListener('resize', resizeStarCanvas);

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.alphaSpeed = Math.random() * 0.01 + 0.003;
        this.alphaDir = Math.random() > 0.5 ? 1 : -1;
    }
    update() {
        this.alpha += this.alphaSpeed * this.alphaDir;
        if (this.alpha >= 1) { this.alpha = 1; this.alphaDir = -1; }
        if (this.alpha <= 0.2) { this.alpha = 0.2; this.alphaDir = 1; }
    }
    draw() {
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        starCtx.fill();
    }
}

const stars = Array.from({ length: 300 }, () => new Star());

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animateStars);
}
animateStars();

// ============================
//  流星
// ============================
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = Math.random() * 60 + '%';
    star.style.transform = `rotate(${30 + Math.random() * 20}deg)`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1500);
}
setInterval(createShootingStar, 3000 + Math.random() * 4000);

// ============================
//  爱心粒子
// ============================
const heartsCanvas = document.getElementById('hearts');
const heartsCtx = heartsCanvas.getContext('2d');

function resizeHeartsCanvas() {
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
}
resizeHeartsCanvas();
window.addEventListener('resize', resizeHeartsCanvas);

class HeartParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * heartsCanvas.width;
        this.y = heartsCanvas.height + Math.random() * 100;
        this.size = Math.random() * 14 + 8;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = ['#ff6b9d', '#ff8fb1', '#ffa8cc', '#ffd700'][Math.floor(Math.random() * 4)];
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y < -50) this.reset();
    }
    draw() {
        heartsCtx.save();
        heartsCtx.translate(this.x, this.y);
        heartsCtx.rotate(this.rotation);
        heartsCtx.globalAlpha = this.alpha;
        heartsCtx.fillStyle = this.color;
        heartsCtx.beginPath();
        const s = this.size;
        heartsCtx.moveTo(0, s * 0.3);
        heartsCtx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
        heartsCtx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
        heartsCtx.fill();
        heartsCtx.restore();
    }
}

const heartParticles = Array.from({ length: 20 }, () => new HeartParticle());

function animateHearts() {
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    heartParticles.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(animateHearts);
}
animateHearts();
