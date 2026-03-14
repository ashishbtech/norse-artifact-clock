document.addEventListener("DOMContentLoaded", () => {
    
    const modeBtn = document.getElementById("mode-btn");
    modeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        if(document.body.classList.contains("light-mode")) {
            modeBtn.textContent = "Dark Mode";
        } else {
            modeBtn.textContent = "Antique Mode";
        }
    });

    const chars = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];
    const markersCont = document.getElementById("markers");

    chars.forEach((char, i) => {
        const marker = document.createElement("div");
        marker.className = "marker";
        const angle = (i + 1) * 30; 
        marker.style.transform = `rotate(${angle}deg)`;

        const inner = document.createElement("div");
        inner.className = "marker-inner";
        inner.style.transform = `rotate(-${angle}deg)`;

        const charSpan = document.createElement("span");
        charSpan.className = "char-text";
        charSpan.textContent = char;

        const numSpan = document.createElement("span");
        numSpan.className = "num-text";
        numSpan.textContent = i + 1;

        inner.appendChild(charSpan);
        inner.appendChild(numSpan);
        marker.appendChild(inner);
        markersCont.appendChild(marker);
    });

    const hrHand = document.getElementById("hr");
    const minHand = document.getElementById("min");
    const secHand = document.getElementById("sec");
    const digital = document.getElementById("digital");

    function updateClock() {
        const now = new Date();
        const hr = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        const ms = now.getMilliseconds();

        const secDeg = (sec + ms / 1000) * 6;
        const minDeg = (min + sec / 60) * 6;
        const hrDeg = ((hr % 12) + min / 60) * 30;

        secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
        minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
        hrHand.style.transform = `translateX(-50%) rotate(${hrDeg}deg)`;

        const displayHr = hr.toString().padStart(2, '0');
        const displayMin = min.toString().padStart(2, '0');
        const displaySec = sec.toString().padStart(2, '0');
        digital.textContent = `${displayHr}:${displayMin}:${displaySec}`;

        requestAnimationFrame(updateClock);
    }
    requestAnimationFrame(updateClock);

    const ptrDot = document.getElementById("ptr-dot");
    const ptrTrail = document.getElementById("ptr-trail");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function movePointer() {
        ptrDot.style.left = `${mouseX}px`;
        ptrDot.style.top = `${mouseY}px`;

        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        
        ptrTrail.style.left = `${trailX}px`;
        ptrTrail.style.top = `${trailY}px`;

        requestAnimationFrame(movePointer);
    }
    requestAnimationFrame(movePointer);

    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.2 ? "rgba(112, 209, 244, 0.3)" : "rgba(255, 51, 51, 0.4)"
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y -= p.speedY;
            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});