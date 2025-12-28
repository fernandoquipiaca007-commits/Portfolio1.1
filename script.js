// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isActive = this.classList.contains('active');
        
        // Remove all active classes
        document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
        
        // Add active to current if not already active
        if (!isActive) {
            this.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .tech-card, .certification-card, .experience-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== PROJECTS CAROUSEL =====
(function() {
    const carousel = document.getElementById('projectsCarousel');
    const indicators = document.getElementById('projectsIndicators');
    const prevBtn = document.getElementById('projectsPrev');
    const nextBtn = document.getElementById('projectsNext');
    
    if (!carousel || !indicators) return;

    const slides = carousel.querySelectorAll('.project-slide');
    const indicatorDots = indicators.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoplayInterval;
    let isPaused = false;

    function showSlide(index, direction = 'next') {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) {
                slide.classList.add('active');
            } else if (direction === 'next' && i === currentSlide) {
                slide.classList.add('prev');
            } else if (direction === 'prev' && i === currentSlide) {
                slide.classList.add('prev');
            }
        });
        
        indicatorDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    function nextSlide() {
        if (isPaused) return;
        const next = (currentSlide + 1) % slides.length;
        showSlide(next, 'next');
    }

    function prevSlide() {
        if (isPaused) return;
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev, 'prev');
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000); // 4 segundos
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Setas de navegação
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            isPaused = true;
            stopAutoplay();
            setTimeout(() => {
                isPaused = false;
                startAutoplay();
            }, 4000);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            isPaused = true;
            stopAutoplay();
            setTimeout(() => {
                isPaused = false;
                startAutoplay();
            }, 4000);
        });
    }

    // Pausa ao clicar na imagem
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                isPaused = true;
                stopAutoplay();
            });
            
            slide.addEventListener('mouseleave', () => {
                if (isPaused) {
                    isPaused = false;
                    startAutoplay();
                }
            });
        }
    });

    // Indicadores clicáveis
    indicatorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const direction = index > currentSlide ? 'next' : 'prev';
            showSlide(index, direction);
            isPaused = true;
            stopAutoplay();
            setTimeout(() => {
                isPaused = false;
                startAutoplay();
            }, 4000);
        });
    });

    // Suporte para touch/swipe em mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }

    // Pausa quando a aba não está ativa
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            if (!isPaused) {
                startAutoplay();
            }
        }
    });

    // Iniciar autoplay
    startAutoplay();
})();
