document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation tile clicks
    const navTiles = document.querySelectorAll('.nav-tile');
    const mainContent = document.querySelector('main');

    // Handle URL hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        const tile = document.querySelector(`.nav-tile[data-page="${hash}"]`);
        if (tile) {
            // Remove active class from all tiles
            navTiles.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tile
            tile.classList.add('active');
            // Load the appropriate content
            loadContent(hash);
        }
    });

    navTiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            // Remove active class from all tiles
            navTiles.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tile
            this.classList.add('active');
            // Load the appropriate content
            loadContent(page);
            // Update URL hash
            window.location.hash = page;
        });
    });

    // Default content based on URL hash
    const initialPage = window.location.hash.substring(1) || 'home';
    loadContent(initialPage);

    function loadContent(page) {
        // Load content based on page
        const content = {
            'home': `
                <h2>Home</h2>
    
                <p>Welcome to my portfolio website! I'm Ibrahimu Mwita, a passionate web developer and IT professional.</p>
                <p>Explore my projects and connect with me through the navigation tiles or footer links.</p>
                <p>Remember ICT is heart of World!!!</p>
            `,
            'about': `
                <h2>About Me</h2>
                <p>I'm a dedicated IT professional specializing in web development. With a strong passion for technology and innovation, I create modern, responsive websites and applications.</p>
                <p>My expertise includes:</p>
                <ul>
                    <li>Frontend Development (HTML5, CSS3, JavaScript)</li>
                    <li>Responsive Design</li>
                    <li>Modern Web Technologies</li>
                    <li>UI/UX Design</li>
                    <li>Networking troubleshooting issues</li>
                </ul>
            `,
            'contact': `
                <h2>Contact Me</h2>
                <p>Get in touch with me through any of my social media channels or send me a message using the form below:</p>
                <form id="contact-form">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            `
        };

        // Update content with fade animation
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.innerHTML = content[page];
            mainContent.style.opacity = '1';
        }, 300);
    }

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value,
                date: new Date().toISOString()
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if (data.success) {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                } else {
                    alert('Sorry, there was an error sending your message. Please try again later.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            }
        });
    }

    // Handle WhatsApp link click
    const whatsappLink = document.querySelector('.whatsapp-link');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', async function(e) {
            e.preventDefault();
            
            const name = prompt('Please enter your name:');
            const message = prompt('Please enter your message:');
            
            if (name && message) {
                const formData = {
                    name: name,
                    phone: '+255699158403',
                    message: message
                };

                try {
                    const response = await fetch('/api/whatsapp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    
                    if (data.success) {
                        alert('Your WhatsApp message has been received! I will get back to you soon.');
                    } else {
                        alert('Sorry, there was an error sending your WhatsApp message.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Sorry, there was an error sending your WhatsApp message.');
                }
            }
        });
    }

    // Handle external links
    const externalLinks = document.querySelectorAll('a');
    externalLinks.forEach(link => {
        if (link.hostname && link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.addEventListener('click', function(e) {
                // Add rel="noopener" for security
                this.rel = 'noopener noreferrer';
            });
        }
    });
});
