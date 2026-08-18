/**
 * 点击放烟花 + 鼠标爱心拖尾 + 月亮跟随
 */

// ============================
//  点击放烟花
// ============================
const fwCanvas = document.getElementById('fireworks');
const fwCtx = fwCanvas.getContext('2d');

function resizeFwCanvas() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
}
resizeFwCanvas();
window.addEventListener('resize', resizeFwCanvas);

const fireworks = [];

class FireworkParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.012;
        this.size = Math.random() * 3 + 1.5;
        // 混合颜色：心形或圆形
        this.isHeart = Math.random() > 0.5;
        this.color = [
            '#ff6b9d', '#ff8fb1', '#ffa8cc',
            '#ffd700', '#ff69b4', '#fff'
        ][Math.floor(Math.random() * 6)];
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04; // 重力
        this.vx *= 0.99;
        this.alpha -= this.decay;
    }
    draw() {
        fwCtx.save();
        fwCtx.globalAlpha = Math.max(this.alpha, 0);
        fwCtx.fillStyle = this.color;
        if (this.isHeart) {
            // 小爱心
            fwCtx.translate(this.x, this.y);
            const s = this.size;
            fwCtx.beginPath();
            fwCtx.moveTo(0, s * 0.3);
            fwCtx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
            fwCtx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
            fwCtx.fill();
        } else {
            fwCtx.beginPath();
            fwCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            fwCtx.fill();
        }
        fwCtx.restore();
    }
}

function launchFirework(x, y) {
    const count = 35 + Math.floor(Math.random() * 20);
    for (let i = 0; i < count; i++) {
        fireworks.push(new FireworkParticle(x, y));
    }
}

function animateFireworks() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();
        if (fireworks[i].alpha <= 0) {
            fireworks.splice(i, 1);
        }
    }
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// 点击/触摸放烟花 — 跳过交互元素
document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, .gallery-item, .easter-egg-popup, .lightbox, .secret-input-wrap')) return;
    launchFirework(e.clientX, e.clientY);
});

// ============================
//  鼠标爱心拖尾
// ============================
let lastTrailTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 80) return; // 节流
    lastTrailTime = now;

    const heart = document.createElement('div');
    heart.className = 'mouse-heart';
    heart.textContent = ['💗', '💕', '✨', '💖'][Math.floor(Math.random() * 4)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
});

// ============================
//  月亮跟随鼠标
// ============================
const moon = document.querySelector('.moon');

document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    moon.style.transform = `translate(${dx * -12}px, ${dy * -12}px)`;
});
