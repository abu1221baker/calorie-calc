// About Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate statistic counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    }
    
    // Only animate when section is in view
    const missionSection = document.querySelector('.mission-section');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(missionSection);
        }
    });
    
    if (missionSection) {
        observer.observe(missionSection);
    }
    
    // Add active class to current page in navbar
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});