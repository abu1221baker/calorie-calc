document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Form submission
    const signinForm = document.querySelector('.signin-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('.remember-me input').checked;
            
            // Here you would typically validate and send to your backend
            console.log('Sign in attempt:', { email, password, rememberMe });
            
            // Simulate successful sign in
            const submitBtn = document.querySelector('.signin-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Redirect after simulated API call
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Apple';
            console.log(`${provider} sign in clicked`);
            // Implement OAuth flow here
        });
    });
    
    // Add active class to current page in navbar
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});