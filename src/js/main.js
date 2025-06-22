// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll behavior - hide when scrolling down, show when scrolling up
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate how much to hide the navbar based on scroll position
    if (scrollTop > lastScrollTop && scrollTop > 0) {
        // Scrolling down - gradually hide navbar
        const hideAmount = Math.min(scrollTop / 100, 1); // Gradual hide over 100px
        navbar.style.transform = `translateY(-${hideAmount * 100}%)`;
        navbar.style.backgroundColor = 'rgba(24, 24, 24, 0.0)';
    } else {
        // Scrolling up or at the top - show navbar
        navbar.style.transform = 'translateY(0)';
        
        // Set opacity based on position
        if (scrollTop < 50) {
            // Very close to top - transparent
            navbar.style.backgroundColor = 'rgba(24, 24, 24, 0.0)';
        } else {
            // Away from top - opaque
            navbar.style.backgroundColor = 'rgba(24, 24, 24, 0.98)';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('timeline-container')) {
                // Animate the timeline line
                entry.target.classList.add('animate-line');
            } else {
                // Animate regular elements
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-item, .about-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Also observe timeline container for line animation
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        observer.observe(timelineContainer);
    }
});

// Add hover effects to social icons
document.querySelectorAll('.social-icon, .footer-social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation with blinking cursor
function typeWriter(element, text, speed = 100, onComplete = null) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (onComplete) onComplete();
        }
    }
    
    type();
}

// Typing animation that can handle HTML content
function typeWriterHTML(element, text, speed = 100, onComplete = null) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            // Check if we're at the start of an HTML tag
            if (text.charAt(i) === '<') {
                // Find the end of the tag
                let tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    // Add the entire tag at once
                    element.innerHTML += text.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    // If no closing tag found, just add the character
                    element.innerHTML += text.charAt(i);
                    i++;
                }
            } else {
                // Regular character
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        } else {
            if (onComplete) onComplete();
        }
    }
    
    type();
}

// Hero section animations
document.addEventListener('DOMContentLoaded', () => {
    const greeting1 = document.querySelector('.greeting h1');
    const greeting2 = document.querySelector('.greeting h2');
    const profileImage = document.querySelector('.profile-image');
    const socialIcons = document.querySelector('.social-icons');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Hide elements initially
    if (greeting1) greeting1.style.opacity = '0';
    if (greeting2) greeting2.style.opacity = '0';
    if (profileImage) {
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'translateX(-100px)';
    }
    if (socialIcons) {
        socialIcons.style.opacity = '0';
        socialIcons.style.transform = 'translateX(100px)';
    }
    
    // Make scroll indicator clickable
    if (scrollIndicator) {
        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Start typing animation after a short delay
    setTimeout(() => {
        if (greeting1) {
            greeting1.style.opacity = '1';
            typeWriter(greeting1, 'Hey there,', 150, () => {
                // After "Hey there," is typed, add typing-complete class
                greeting1.classList.add('typing-complete');
                
                // Start typing "I'm Nathan!" with longer pause
                setTimeout(() => {
                    if (greeting2) {
                        greeting2.style.opacity = '1';
                        typeWriterHTML(greeting2, "I'm <span class=\"gradient-text\">Nathan</span>!", 150, () => {
                            // After "I'm Nathan!" is typed, add typing-complete class
                            greeting2.classList.add('typing-complete');
                            
                            // Animate profile and socials
                            setTimeout(() => {
                                // Animate profile image sliding in from left
                                if (profileImage) {
                                    profileImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                                    profileImage.style.opacity = '1';
                                    profileImage.style.transform = 'translateX(0)';
                                }
                                
                                // Animate social icons sliding in from right
                                if (socialIcons) {
                                    socialIcons.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                                    socialIcons.style.opacity = '1';
                                    socialIcons.style.transform = 'translateX(0)';
                                }
                                
                                // Animate scroll indicator
                                if (scrollIndicator) {
                                    scrollIndicator.style.transition = 'opacity 0.8s ease';
                                    scrollIndicator.style.opacity = '1';
                                }
                            }, 500); // Wait 500ms after typing completes
                        });
                    }
                }, 800); // Wait 800ms between typing "Hey there," and "I'm Nathan!"
            });
        }
    }, 500); // Initial delay before starting animation
});

// Add CSS for active navigation state and typing cursor
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #ffffff !important;
        font-weight: 600;
    }
    
    /* Typing cursor animation */
    .greeting h1::after,
    .greeting h2::after {
        content: '|';
        animation: blink 0.8s infinite;
        color: #ffffff;
        font-weight: 400;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Hide cursor when typing is complete */
    .greeting h1.typing-complete::after,
    .greeting h2.typing-complete::after {
        display: none;
    }
    
    /* Initial states for slide animations */
    .profile-image {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .social-icons {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    /* Navbar transition for smooth hide/show */
    .navbar {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
`;
document.head.appendChild(style); 