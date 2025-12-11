// Warisan Batik Nusantara - Cleaned JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Panggil semua fungsi inisialisasi
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeTimelineInteractions(); // Fungsi Accordion + Gambar
});

// 1. Animation System (Intersection Observer)
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Selektor untuk semua elemen yang mau dianimasikan
    const selectors = [
        '.timeline-card', 
        '.motif-card', 
        '.region-card', 
        '.process-card', 
        '.video-container', 
        '.main-video-card', 
        '.definition-content', 
        '.definition-image-wrapper',
        '.timeline-image-container'
    ];

    const animateElements = document.querySelectorAll(selectors.join(', '));
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // Memastikan transisi CSS
        observer.observe(el);
    });
}

// 2. Timeline Interaction (Accordion + Image Changer)
function initializeTimelineInteractions() {
    const cards = document.querySelectorAll('.interactive-card');
    const images = document.querySelectorAll('.history-img');

    // Pastikan gambar pertama aktif saat load
    if(images.length > 0) {
        images[0].classList.add('active');
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const wasActive = this.classList.contains('active');
            
            // Reset: Tutup semua kartu & sembunyikan semua gambar
            cards.forEach(c => c.classList.remove('active'));
            images.forEach(img => img.classList.remove('active'));

            if (!wasActive) {
                // Aktifkan kartu yang diklik
                this.classList.add('active');
                
                // Cari gambar sesuai index
                const index = this.getAttribute('data-index');
                const targetImage = document.querySelector(`.history-img[data-img-index="${index}"]`);
                
                if (targetImage) {
                    targetImage.classList.add('active');
                }
            } else {
                // Jika user menutup kartu (klik lagi), kembalikan ke gambar pertama
                if(images.length > 0) images[0].classList.add('active');
            }
        });
    });
}

// 3. Scroll & Parallax Effects
function initializeScrollEffects() {
    let ticking = false;
    const heroBackground = document.querySelector('.hero-background');

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                // Parallax sederhana
                if (heroBackground) {
                    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// 4. General Interactive Elements (Hover, Buttons, Lazy Load)
function initializeInteractiveElements() {
    // Smooth scroll anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // CTA Button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            alert("Batik diakui UNESCO pada 2 Oktober 2009 sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi.");
        });
    }

    // Error handling gambar
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none'; // Sembunyikan gambar rusak
            console.warn('Gagal memuat gambar:', this.src);
        });
    });
}