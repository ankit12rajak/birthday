// Poem sequence (inspired by the reference)
const poemLines = [
    "Today is...",
    "as beautiful as other days",
    "but you realize",
    "another year has gone",
    "in a blink of the eyes",
    "however",
    "Do you know..?",
    "today is just special",
    "so special to you",
    "that's why",
    "Let's make it...",
    "the best celebration ever",
    "and let me share...",
    "a piece of happiness to you",
    "I made all this...",
    "as a birthday present to you",
    "thanks for being there",
    "thanks for the friendship we made",
    "thanks for everything",
    "I wish you all the best",
    "May your life be at ease",
    "May all your wishes come true",
    "Remember",
    "your ambitions",
    "you live as a free bird...",
    "flying in the blue sky",
    "Now things are different...",
    "real story of your life",
    "is just about to begin",
    "indeed..",
    "this life is not easy as we thought",
    "but...",
    "don't worry",
    "don't be afraid",
    "because...",
    "you are not alone in this world",
    "because...",
    "this year will be better",
    "and I hope",
    "you'll find...",
    "happiness along the way",
    "keep your spirits up",
    "enjoy every single moment...",
    "that you experience today",
    "fill it with your most beautiful smile",
    "and make it the best memory..",
    "lastly...",
    "I'd like to tell you that",
    "I love you so much",
];

// Memory images for each line (cycle if fewer than lines)
const memoryImages = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=400",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&h=400",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=facearea&w=400&h=400"
];

const poemContainer = document.getElementById('poem-container');
const poemMessage = document.getElementById('poem-message');
const actions = document.getElementById('actions');
const finalMessage = document.getElementById('final-message');
const bgMusic = document.getElementById('bg-music');

// --- Remove global music playback on any click ---
// (No global event listener for music playback)

// --- Action Buttons Logic ---
const lightsBtn = document.getElementById('lightsBtn');
const lights = document.getElementById('lights');
lightsBtn.addEventListener('click', () => {
    lights.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const bulb = document.createElement('div');
        bulb.className = 'light-bulb';
        bulb.style.background = `hsl(${Math.random()*360}, 90%, 80%)`;
        bulb.style.left = `${8 + i * 7.5}%`;
        lights.appendChild(bulb);
    }
});

const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', () => {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(()=>{});
    musicBtn.textContent = 'Music Playing ♫';
    musicBtn.disabled = true;
});

const decorateBtn = document.getElementById('decorateBtn');
decorateBtn.addEventListener('click', () => {
    // Confetti burst
    for (let i = 0; i < 40; i++) createConfettiPiece(true);
    // Hearts
    for (let i = 0; i < 12; i++) createHeartDecoration();
    // Stars
    for (let i = 0; i < 12; i++) createStarDecoration();
    // Flowers
    for (let i = 0; i < 8; i++) createFlowerDecoration();
});

const balloonBtn = document.getElementById('balloonBtn');
const balloons = document.getElementById('balloons');
balloonBtn.addEventListener('click', () => {
    for (let i = 0; i < 8; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${10 + i * 10 + Math.random()*5}%`;
        balloon.style.bottom = '-80px';
        balloon.style.background = `radial-gradient(circle at 60% 40%, hsl(${Math.random()*360}, 90%, 80%) 60%, #fff 100%)`;
        balloon.style.animationDelay = `${Math.random()*2}s`;
        balloons.appendChild(balloon);
        setTimeout(() => balloon.remove(), 6000);
    }
});

const cakeBtn = document.getElementById('cakeBtn');
const cake = document.getElementById('cake');
cakeBtn.addEventListener('click', () => {
    cake.innerHTML = `<div class='cake-body'></div><div class='cake-icing'></div><div class='candle'></div><div class='flame'></div>`;
    cake.style.display = 'block';
});

const candleBtn = document.getElementById('candleBtn');
candleBtn.addEventListener('click', () => {
    const candle = cake.querySelector('.candle');
    const flame = cake.querySelector('.flame');
    if (candle && flame) {
        candle.style.display = 'block';
        flame.style.display = 'block';
    }
});

const wishBtn = document.getElementById('wishBtn');
wishBtn.addEventListener('click', () => {
    const wish = document.createElement('div');
    wish.textContent = '🎉 Happy Birthday! 🎉';
    wish.style.position = 'fixed';
    wish.style.top = '50%';
    wish.style.left = '50%';
    wish.style.transform = 'translate(-50%, -50%)';
    wish.style.fontSize = '2.5rem';
    wish.style.color = '#fcb69f';
    wish.style.background = '#fff';
    wish.style.padding = '24px 40px';
    wish.style.borderRadius = '32px';
    wish.style.boxShadow = '0 8px 40px rgba(29,43,100,0.25)';
    wish.style.zIndex = 2000;
    wish.style.opacity = 0;
    wish.style.transition = 'opacity 0.5s';
    document.body.appendChild(wish);
    setTimeout(() => { wish.style.opacity = 1; }, 50);
    setTimeout(() => { wish.style.opacity = 0; setTimeout(()=>wish.remove(), 500); }, 2000);
});

// Message for You (Poem Reveal with Memory Image)
const messageBtn = document.getElementById('messageBtn');
messageBtn.addEventListener('click', () => {
    actions.style.display = 'none';
    poemMessage.style.display = 'flex';
    poemContainer.innerHTML = '';
    revealPoemLineWithImage(0);
});

function revealPoemLineWithImage(index) {
    poemContainer.innerHTML = '';
    if (index < poemLines.length) {
        const line = document.createElement('div');
        line.className = 'poem-line';
        line.textContent = poemLines[index];
        poemContainer.appendChild(line);
        // Add memory image
        const img = document.createElement('img');
        img.className = 'poem-memory-img';
        img.src = memoryImages[index % memoryImages.length];
        img.style.opacity = 0;
        img.style.transition = 'opacity 0.7s';
        img.style.display = 'block';
        img.style.margin = '32px auto 0 auto';
        img.style.maxWidth = '220px';
        img.style.borderRadius = '18px';
        img.style.boxShadow = '0 4px 24px rgba(29,43,100,0.15)';
        poemContainer.appendChild(img);
        setTimeout(() => { img.style.opacity = 1; }, 100);
        setTimeout(() => {
            line.classList.add('fade-out');
            img.style.opacity = 0;
            setTimeout(() => revealPoemLineWithImage(index + 1), 700);
        }, 1400);
    } else {
        // Show the last line and keep it with its image
        const lastLine = document.createElement('div');
        lastLine.className = 'poem-line';
        lastLine.textContent = poemLines[poemLines.length - 1];
        poemContainer.innerHTML = '';
        poemContainer.appendChild(lastLine);
        lastLine.style.opacity = 1;
        lastLine.style.transform = 'translateY(0)';
        const img = document.createElement('img');
        img.className = 'poem-memory-img';
        img.src = memoryImages[(poemLines.length - 1) % memoryImages.length];
        img.style.opacity = 0;
        img.style.transition = 'opacity 0.7s';
        img.style.display = 'block';
        img.style.margin = '32px auto 0 auto';
        img.style.maxWidth = '220px';
        img.style.borderRadius = '18px';
        img.style.boxShadow = '0 4px 24px rgba(29,43,100,0.15)';
        poemContainer.appendChild(img);
        setTimeout(() => { img.style.opacity = 1; }, 100);
    }
}

// --- Confetti Animation (as before, but allow burst) ---
const confettiColors = ["#fcb69f", "#ffe6fa", "#f8cdda", "#1d2b64", "#fff"];
const confettiContainer = document.querySelector('.confetti');
function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}
function createConfettiPiece(burst = false) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    const size = randomBetween(8, 18);
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * 0.4}px`;
    confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.position = 'absolute';
    confetti.style.top = burst ? `${randomBetween(40, 60)}vh` : `-${size}px`;
    confetti.style.left = `${randomBetween(0, 100)}vw`;
    confetti.style.opacity = randomBetween(0.7, 1);
    confetti.style.borderRadius = `${randomBetween(2, 8)}px`;
    confetti.style.transform = `rotate(${randomBetween(0, 360)}deg)`;
    confetti.style.zIndex = 999;
    confettiContainer.appendChild(confetti);
    // Animate
    const fallDuration = burst ? randomBetween(1.2, 2.2) : randomBetween(2.5, 5);
    confetti.animate([
        { transform: confetti.style.transform, top: confetti.style.top },
        { transform: `rotate(${randomBetween(0, 360)}deg)`, top: burst ? `${randomBetween(80, 100)}vh` : '100vh' }
    ], {
        duration: fallDuration * 1000,
        easing: 'ease-in',
        fill: 'forwards'
    });
    setTimeout(() => confetti.remove(), fallDuration * 1000);
}
setInterval(() => {
    for (let i = 0; i < 4; i++) createConfettiPiece();
}, 350);

// --- Decorations ---
function createHeartDecoration() {
    const heart = document.createElement('div');
    heart.className = 'decoration-heart';
    heart.style.left = `${randomBetween(5, 95)}vw`;
    heart.style.top = `${randomBetween(10, 80)}vh`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2200);
}
function createStarDecoration() {
    const star = document.createElement('div');
    star.className = 'decoration-star';
    star.style.left = `${randomBetween(5, 95)}vw`;
    star.style.top = `${randomBetween(10, 80)}vh`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}
function createFlowerDecoration() {
    const flower = document.createElement('div');
    flower.className = 'decoration-flower';
    flower.style.left = `${randomBetween(5, 95)}vw`;
    flower.style.top = `${randomBetween(10, 80)}vh`;
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 2500);
} 