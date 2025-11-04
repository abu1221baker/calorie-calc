// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    
    // Floating label functionality
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input) {
            // Check if input has value on load
            if (input.value) {
                label.classList.add('active');
            }
            
            // Focus event
            input.addEventListener('focus', () => {
                label.classList.add('active', 'focus');
                group.classList.add('focused');
            });
            
            // Blur event
            input.addEventListener('blur', () => {
                label.classList.remove('focus');
                group.classList.remove('focused');
                
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
            
            // Input event for real-time validation
            input.addEventListener('input', () => {
                validateField(input);
            });
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            
            
            if (validateForm()) {
                showFormStatus('Sending message...', 'info');
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    showFormStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    resetFormLabels();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        hideFormStatus();
                    }, 5000);
                }, 2000);
            }
        });
    }
    
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Chat Widget functionality
    const chatWidget = document.querySelector('.chat-widget');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    const chatBody = document.querySelector('.chat-body');
    
    // Show chat widget after 10 seconds
    setTimeout(() => {
        if (!sessionStorage.getItem('chatShown')) {
            chatWidget.style.display = 'block';
            sessionStorage.setItem('chatShown', 'true');
        }
    }, 10000);
    
    // Close chat
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatWidget.style.display = 'none';
        });
    }
    
    // Send message
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response after delay
            setTimeout(() => {
                const botResponse = generateBotResponse(message);
                addChatMessage(botResponse, 'bot');
                scrollChatToBottom();
            }, 1000);
        }
    }
    
    function addChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <p>${message}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatBody.appendChild(messageDiv);
        scrollChatToBottom();
    }
    
    function scrollChatToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    function generateBotResponse(userMessage) {
        const responses = {
            greeting: "Hello! I'm here to help with any questions about CalorieCalc. How can I assist you today?",
            features: "CalorieCalc offers calorie counting, BMR/TDEE calculators, meal planning, and nutrition tracking. Which feature are you interested in?",
            support: "For technical support, please describe your issue and we'll help you resolve it quickly.",
            default: "Thank you for your message! Our team will get back to you soon. Is there anything else I can help with in the meantime?"
        };
        
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return responses.greeting;
        } else if (message.includes('feature') || message.includes('what can') || message.includes('offer')) {
            return responses.features;
        } else if (message.includes('help') || message.includes('support') || message.includes('problem')) {
            return responses.support;
        } else {
            return responses.default;
        }
    }
});

// Form Validation Functions
function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    
    // Remove previous error states
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    if (!value) {
        showFieldError(field, 'This field is required');
        isValid = false;
    } else if (fieldName === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        isValid = false;
    } else if (fieldName === 'name' && value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters long');
        isValid = false;
    } else if (fieldName === 'message' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        field.classList.add('valid');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: var(--error-color); font-size: 0.8rem; margin-top: 5px;';
    field.parentElement.appendChild(errorDiv);
}

function showFormStatus(message, type) {
    let statusDiv = document.querySelector('.form-status');
    
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.className = 'form-status';
        contactForm.appendChild(statusDiv);
    }
    
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = 'block';
}

function hideFormStatus() {
    const statusDiv = document.querySelector('.form-status');
    if (statusDiv) {
        statusDiv.style.display = 'none';
    }
}

function resetFormLabels() {
    const labels = document.querySelectorAll('.form-group label');
    labels.forEach(label => {
        label.classList.remove('active');
    });
}

// Smooth scrolling for anchor links
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

// Add some interactive animations
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
document.querySelectorAll('.form-container, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});