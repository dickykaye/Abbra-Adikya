
// --- (Bagian kode partikel, animasi scroll, video, & navbar tetap seperti sebelumnya) ---

// --- FITUR BACKGROUND ANIMASI PARTIKEL --- //
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;
const mouse = { x: null, y: null, radius: 150 };

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });

class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#007AFF';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 2;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 2;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 2;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 2;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

const initParticles = () => {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 1;
        particlesArray.push(new Particle(Math.random() * innerWidth, Math.random() * innerHeight, (Math.random() * 1) - 0.5, (Math.random() * 1) - 0.5, size));
    }
};

const connectParticles = () => {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const distance = Math.pow(particlesArray[a].x - particlesArray[b].x, 2) + Math.pow(particlesArray[a].y - particlesArray[b].y, 2);
            if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                const opacityValue = 1 - (distance / 15000);
                ctx.strokeStyle = `rgba(0, 198, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
};

const animateParticles = () => {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particlesArray.forEach(p => p.update());
    connectParticles();
};

initParticles();
animateParticles();

// --- FITUR ANIMASI SCROLL & LAINNYA --- //
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.hidden-y, .hidden-x-left, .hidden-x-right, .hidden-scale').forEach(el => observer.observe(el));

document.querySelectorAll('.video-container video').forEach(video => {
    video.addEventListener('mouseenter', () => video.muted = false);
    video.addEventListener('mouseleave', () => video.muted = true);
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('nav-active'));
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('nav-active'));
});

// --- (Bagian kode partikel, animasi scroll, video, & navbar tetap di atas) ---

// Data postingan 1: Karya MWA UGM
const igPosts = [
    { id: "DcPmnLrEy-e", title: "[REKRUTMEN TERBUKA BADAN KELENGKAPAN MWA UM UGM 2026/2027]", media: "MWA/1.jpg", type: "img" },
    { id: "Day8ZlcE_kJ", title: "KENALAN SAMA ORGAN TERTINGGI UGM", media: "MWA/2.mp4", type: "video" },
    { id: "DZ2cayVk-h1", title: "Selamat Bertugas MWA UM UGM 2026-2027", media: "MWA/3.jpg", type: "img" },
    { id: "DZcU8WFlMda", title: "Menantang Ombak Penjelajahan Baru MWA UM UGM 2026-2027", media: "MWA/4.jpg", type: "img" },
    { id: "DZXYu3DlG8Q", title: "[ Catatan Akhir & Terimakasih oleh MWA UM 2025-2026 ]", media: "MWA/5.jpg", type: "img" },
    { id: "DZXYhBOMcah", title: "[ Catatan Akhir & Terimakasih oleh MWA UM 2025-2026 ]", media: "MWA/6.jpg", type: "img" },
    { id: "DZXYRSilKjw", title: "[ Catatan Akhir & Terimakasih oleh MWA UM 2025-2026 ]", media: "MWA/7.jpg", type: "img" }
];

// Fungsi untuk merender galeri Instagram secara dinamis
const renderIGGallery = (elementId, posts, accountName) => {
    const gallery = document.getElementById(elementId);
    if (!gallery) return;

    gallery.innerHTML = posts.map(post => {
        let mediaContent = post.type === 'video' 
            ? `<video src="${post.media}" class="ig-card-video" autoplay muted loop playsinline></video>`
            : `<img src="${post.media}" alt="${post.title}" class="ig-card-img" loading="lazy">`;

        return `
        <a href="https://www.instagram.com/p/${post.id}/" target="_blank" class="ig-card">
            <div class="ig-card-img-container">
                ${mediaContent}
            </div>
            <div class="ig-card-content">
                <span class="ig-card-title">${post.title}</span>
                <div class="ig-card-footer">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span>${accountName}</span>
                </div>
            </div>
        </a>
    `;
    }).join('');
};

// Menjalankan fungsi untuk kedua wadah galeri di HTML
renderIGGallery('ig-gallery', igPosts, 'mwaum.ugm');
renderIGGallery('ig-personal-gallery', igPersonalPosts, 'abbraadikya'); // Ganti username sesuai akun IG pribadi Anda

// --- FITUR HOVER VIDEO INSTAGRAM UNTUK SUARA (MUTE/UNMUTE) --- //
const igCards = document.querySelectorAll('.ig-card');

igCards.forEach(card => {
    const video = card.querySelector('video:not(.ig-card-bg-blur)'); // Mengambil video utama (bukan video background blur)
    
    if (video) {
        card.addEventListener('mouseenter', () => {
            video.muted = false; // Suara aktif saat kursor diarahkan ke kartu
        });

        card.addEventListener('mouseleave', () => {
            video.muted = true;  // Suara dimatikan kembali saat kursor menjauh
        });
    }
});