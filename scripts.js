document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.sticky-header');
    let lastScrollY = window.scrollY;

    // Handle sticky header on mobile
    const handleScroll = () => {
        if (window.innerWidth >= 640) {
            header.style.transform = 'translateY(0)';
            return;
        }

        if (window.scrollY > lastScrollY) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling with a message box
    const contactForm = document.getElementById('contact-form');
    const messageBox = document.getElementById('message-box');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const url = contactForm.action;
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    messageBox.textContent = 'Message sent successfully!';
                    messageBox.classList.add('show');
                    contactForm.reset();
                } else {
                    messageBox.textContent = 'Oops! There was a problem sending your message.';
                    messageBox.classList.add('show');
                }
            } catch (error) {
                messageBox.textContent = 'Oops! An error occurred. Please try again later.';
                messageBox.classList.add('show');
                console.error('Error:', error);
            } finally {
                 setTimeout(() => {
                    messageBox.classList.remove('show');
                }, 3000);
            }
        });
    }
});