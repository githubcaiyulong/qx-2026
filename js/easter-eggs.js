/**
 * 彩蛋：暗号输入 / 狂点标题解锁 / 手机摇一摇撒花瓣 / 情书打字机 / 照片翻牌 / 恋爱天数 / 灯箱 / 滚动显示
 */

// ============================
//  配置
// ============================
const CONFIG = {
    // 在一起的日期（改成你们的纪念日！）
    togetherDate: '2020-01-19',

    // 狂点标题次数解锁
    clickUnlockCount: 10,

    // 暗号
    secretCode: 'love',

    // 彩蛋情话（暗号正确时弹出）
    secretMessage: `🔓 暗号正确！

你知道我为什么最喜欢七夕吗？
因为七夕的"七"，
谐音"妻"——

你，就是我唯一的七夕。💕`,

    // 狂点解锁的话
    clickUnlockMessage: `🎉 你发现了隐藏彩蛋！

其实……
每次看到你的消息提示，
我的心跳就和你一样快。

小宝，我超爱你的！💘`,
};

// ============================
//  恋爱天数
// ============================
function updateLoveDays() {
    const start = new Date(CONFIG.togetherDate);
    const today = new Date();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const el = document.getElementById('love-days-number');
    if (el) el.textContent = diff;
}
updateLoveDays();

// 情书签名日期
const dateEl = document.getElementById('current-date');
if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('zh-CN', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
}

// ============================
//  情书打字机
// ============================
function typeWriter(element, texts, index, charIndex, callback) {
    if (index >= texts.length) {
        if (callback) callback();
        return;
    }

    if (charIndex < texts[index].length) {
        // 段落分隔用特殊标记 ||P||
        if (texts[index].substring(charIndex, charIndex + 3) === '||P||') {
            element.innerHTML += '</p>';
            typeWriter(element, texts, index, charIndex + 3, callback);
            return;
        }
        // 开始新段落标记 ||PARA||
        if (texts[index].substring(charIndex, charIndex + 6) === '||PARA||') {
            const p = document.createElement('p');
            element.appendChild(p);
            typeWriter(element, texts, index, charIndex + 6, callback);
            return;
        }

        const currentP = element.querySelector('.typing-active') || element;
        currentP.appendChild(document.createTextNode(texts[index][charIndex]));
        typeWriter(element, texts, index, charIndex + 1, callback);
    } else {
        // 当前段落结束
        if (index < texts.length - 1) {
            typeWriter(element, texts, index + 1, 0, callback);
        } else {
            if (callback) callback();
        }
    }
}

// 简化版：段落可见后逐段淡入
let letterTyped = false;

function startLetterTyping() {
    if (letterTyped) return;
    letterTyped = true;

    const letterBody = document.querySelector('.letter-body');
    if (!letterBody) return;

    const paragraphs = letterBody.querySelectorAll('.letter-p');
    let cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';

    paragraphs.forEach((p, i) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(8px)';
        p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        p.style.display = 'block';

        setTimeout(() => {
            // 移除前一个光标
            const oldCursor = letterBody.querySelector('.typing-cursor');
            if (oldCursor) oldCursor.remove();

            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';

            // 在段落末尾加光标
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            p.appendChild(cursor);

            // 光标停留一会消失
            setTimeout(() => cursor.remove(), 600);

            // 最后一段结束后显示签名
            if (i === paragraphs.length - 1) {
                setTimeout(() => {
                    const sig = document.querySelector('.letter .signature');
                    if (sig) {
                        sig.style.opacity = '0';
                        sig.style.transition = 'opacity 0.8s ease';
                        setTimeout(() => sig.style.opacity = '1', 100);
                    }
                }, 800);
            }
        }, i * 1200);
    });
}

// ============================
//  滚动显示动画
// ============================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('gallery-item')) {
                const items = [...entry.target.parentElement.children];
                const idx = items.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.12}s`;
            }
            entry.target.classList.add('visible');

            // 情书进入视口时启动打字机
            if (entry.target.id === 'letter') {
                setTimeout(startLetterTyping, 600);
            }
        }
    });
}, { threshold: 0.15 });

document.getElementById('letter') && observer.observe(document.getElementById('letter'));
document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));

// ============================
//  灯箱
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.getElementById('gallery')?.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    // 先尝试翻转
    const hasImg = item.querySelector('.card-front img');
    if (hasImg) {
        // 有图片才翻转
        item.classList.toggle('flipped');
        e.stopPropagation();
        return;
    }
    // 无图片不翻转
});

lightbox?.addEventListener('click', () => lightbox.classList.remove('active'));

// ============================
//  暗号输入
// ============================
const secretInput = document.getElementById('secret-input');
if (secretInput) {
    secretInput.addEventListener('input', () => {
        if (secretInput.value.toLowerCase().trim() === CONFIG.secretCode) {
            showEasterEgg(CONFIG.secretMessage);
            secretInput.value = '';
        }
    });
}

// 也支持键盘直接输入暗号（连续按键）
let keyBuffer = '';
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return; // 输入框里不触发
    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);
    if (keyBuffer.includes(CONFIG.secretCode)) {
        showEasterEgg(CONFIG.secretMessage);
        keyBuffer = '';
    }
});

// ============================
//  狂点标题解锁
// ============================
let titleClickCount = 0;
let titleClickTimer = null;

document.querySelector('.hero h1')?.addEventListener('click', () => {
    titleClickCount++;
    clearTimeout(titleClickTimer);

    titleClickTimer = setTimeout(() => { titleClickCount = 0; }, 3000);

    if (titleClickCount >= CONFIG.clickUnlockCount) {
        titleClickCount = 0;
        showEasterEgg(CONFIG.clickUnlockMessage);
    }
});

// ============================
//  手机摇一摇撒花瓣
// ============================
if (window.DeviceMotionEvent) {
    let lastX, lastY, lastZ;
    let lastShake = 0;

    window.addEventListener('devicemotion', (e) => {
        const acc = e.accelerationIncludingGravity;
        if (!acc) return;

        const now = Date.now();
        if (now - lastShake < 800) return; // 冷却

        if (lastX !== undefined) {
            const delta = Math.abs(acc.x - lastX) + Math.abs(acc.y - lastY) + Math.abs(acc.z - lastZ);
            if (delta > 25) {
                lastShake = now;
                createPetalRain();
            }
        }

        lastX = acc.x;
        lastY = acc.y;
        lastZ = acc.z;
    });
}

// iOS 需要请求权限
if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    document.addEventListener('touchstart', () => {
        try { DeviceMotionEvent.requestPermission(); } catch(e) {}
    }, { once: true });
}

// ============================
//  花瓣雨
// ============================
function createPetalRain() {
    const colors = ['#ff6b9d', '#ff8fb1', '#ffa8cc', '#ffb6c1', '#ffd700'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.top = -20 + 'px';
            petal.style.width = (Math.random() * 10 + 8) + 'px';
            petal.style.height = petal.style.width;
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            petal.style.animationDuration = (Math.random() * 2 + 2) + 's';
            petal.style.animationDelay = '0s';
            document.body.appendChild(petal);
            setTimeout(() => petal.remove(), 5000);
        }, i * 40);
    }
}

// ============================
//  彩蛋弹窗
// ============================
function showEasterEgg(message) {
    const popup = document.getElementById('easter-egg-popup');
    const textEl = document.getElementById('easter-egg-text');
    if (!popup || !textEl) return;

    textEl.innerHTML = message.replace(/\n/g, '<br>');
    popup.classList.add('active');

    // 同时撒花瓣
    createPetalRain();
}

document.getElementById('easter-egg-close')?.addEventListener('click', () => {
    document.getElementById('easter-egg-popup').classList.remove('active');
});

document.getElementById('easter-egg-popup')?.addEventListener('click', (e) => {
    if (e.target.id === 'easter-egg-popup') {
        document.getElementById('easter-egg-popup').classList.remove('active');
    }
});
