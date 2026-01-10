
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const offset = navbarHeight + 20;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Reset to start if at end
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Move carousel with smooth transition
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update active dot
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });

    // Update active slide with fade effect
    slides.forEach((slide, idx) => {
        if (idx === currentSlide) {
            slide.style.opacity = '0';
            setTimeout(() => {
                slide.style.opacity = '1';
            }, 50);
        }
    });
}

// Next/Previous buttons
document.getElementById('nextBtn').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play carousel
let carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause on hover
const promoCarouselContainer = document.querySelector('.promo-carousel-container');
if (promoCarouselContainer) {
    promoCarouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    promoCarouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });
}

// Products Carousel - Improved with categories
const products = [
    { image: 'images/local/_DSC0069.jpg', name: 'BSN Syntha-6', category: 'Proteínas' },
    { image: 'images/local/_DSC0071-2.jpg', name: 'Platinum Whey', category: 'Proteínas' },
    { image: 'images/local/_DSC0074.jpg', name: 'Botellas Everlast', category: 'Accesorios' },
    { image: 'images/local/_DSC0078.jpg', name: 'Whey Protein', category: 'Proteínas' },
    { image: 'images/local/_DSC0080.jpg', name: 'BCAA', category: 'Recuperación' },
    { image: 'images/local/_DSC0102.jpg', name: 'Variedad Premium', category: 'Suplementos' },
    { image: 'images/local/_DSC6601-2.jpg', name: 'LAX Whey + Creatina', category: 'Combos' },
    { image: 'images/local/_DSC6601.jpg', name: 'LAX Whey 3.5', category: 'Proteínas' },
    { image: 'images/local/_DSC7574.jpg', name: 'LAX Whey 3.5', category: 'Proteínas' },
    { image: 'images/local/_DSC7578.jpg', name: 'ENA TrueMade', category: 'Proteínas' },
    { image: 'images/local/_DSC7580.jpg', name: 'Body Advance Whey', category: 'Combos' },
    { image: 'images/local/_DSC7581.jpg', name: 'Body Advance Gold', category: 'Combos' }
];

let currentProductPage = 0;
const productsCarousel = document.getElementById('productsCarousel');
const productIndicators = document.getElementById('productIndicators');

// Load products
function loadProducts() {
    products.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = 'product-slide';
        
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = `${product.name} - ${product.category} - efitness`;
        img.className = 'product-image';
        img.loading = 'lazy';
        
        const info = document.createElement('div');
        info.className = 'product-info';
        
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;
        
        const category = document.createElement('p');
        category.className = 'product-category';
        category.textContent = product.category;
        
        info.appendChild(name);
        info.appendChild(category);
        slide.appendChild(img);
        slide.appendChild(info);
        productsCarousel.appendChild(slide);
    });
    
    initProductsCarousel();
}

function initProductsCarousel() {
    const productSlides = document.querySelectorAll('.product-slide');
    const totalProducts = productSlides.length;
    const productsPerView = window.innerWidth > 768 ? 4 : 1;
    const totalPages = Math.ceil(totalProducts / productsPerView);
    
    // Create indicators
    if (productIndicators) {
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'indicator-dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Página ${i + 1}`);
            dot.addEventListener('click', () => goToPage(i));
            productIndicators.appendChild(dot);
        }
    }
    
    function updateCarousel() {
        // Get the actual computed gap from CSS
        const style = window.getComputedStyle(productsCarousel);
        const gap = parseFloat(style.gap) || 16;
        
        // Calculate the exact translateX based on actual slide positions
        let translateX = 0;
        for (let i = 0; i < currentProductPage * productsPerView; i++) {
            if (productSlides[i]) {
                translateX += productSlides[i].offsetWidth + gap;
            }
        }
        
        productsCarousel.style.transform = `translateX(-${translateX}px)`;
        
        // Update indicators
        if (productIndicators) {
            document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentProductPage);
            });
        }
    }
    
    function goToPage(pageIndex) {
        currentProductPage = Math.max(0, Math.min(pageIndex, totalPages - 1));
        updateCarousel();
    }
    
    function scrollProductsCarousel(direction) {
        if (direction === 'next') {
            currentProductPage = (currentProductPage + 1) % totalPages;
        } else {
            currentProductPage = (currentProductPage - 1 + totalPages) % totalPages;
        }
        updateCarousel();
    }
    
    // Products carousel buttons
    document.getElementById('nextProductBtn').addEventListener('click', () => {
        scrollProductsCarousel('next');
    });
    
    document.getElementById('prevProductBtn').addEventListener('click', () => {
        scrollProductsCarousel('prev');
    });
    
    // Auto-scroll products carousel
    let autoScrollInterval = setInterval(() => {
        scrollProductsCarousel('next');
    }, 5000);
    
    // Pause auto-scroll on hover
    const productsCarouselContainer = document.querySelector('.products-carousel-container');
    if (productsCarouselContainer) {
        productsCarouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        productsCarouselContainer.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                scrollProductsCarousel('next');
            }, 5000);
        });
    }
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 250);
    });
}

// Load products when page loads
loadProducts();

// Enhanced Scroll Reveal Animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add stagger effect for grid items
            if (entry.target.classList.contains('product-card') || 
                entry.target.classList.contains('contact-list-item')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.product-slide, .contact-list-item, .section-title, .section-header').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Enhanced Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Enhanced shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 8px 40px rgba(0, 102, 255, 0.4)';
        navbar.style.borderBottomColor = 'rgba(0, 102, 255, 0.4)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.borderBottomColor = 'rgba(0, 102, 255, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add animation to cards on load with stagger
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.product-slide, .contact-list-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }, index * 150);
    });
});

// Mouse move parallax effect for hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        hero.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Add glow effect on hover for buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
});

// Animate numbers/counters (if needed in future)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add ripple effect to cards
document.querySelectorAll('.product-slide, .contact-list-item, .promo-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Scroll Spy - Active menu item based on current section
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + navbarHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // If we're at the top, highlight "inicio"
    if (window.pageYOffset < 200) {
        currentSection = 'inicio';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Ensure hero animations start
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize scroll spy
    updateActiveNavItem();
});

// Update active nav item on scroll
window.addEventListener('scroll', () => {
    updateActiveNavItem();
    updateBackToTopButton();
});

// Back to Top Button
function updateBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

// Back to Top functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
