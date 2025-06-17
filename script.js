function createDigitalParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'digital-particles';
    document.body.appendChild(particleContainer);

    const characters = ['◆', '◇', '●', '○', '■', '□', '▲', '△', '★', '☆', '◉', '◎', '⬢', '⬡', '◼', '◻'];
    const codeChars = ['0', '1', '>', '<', '/', '\\', '|', '-', '+', '*', '#', '@', '$', '%', '{', '}'];

    function createParticle() {
        if (particleContainer.children.length > 20) return;

        const particle = document.createElement('div');
        particle.className = 'particle';

        const allChars = Math.random() > 0.6 ? characters : codeChars;
        particle.textContent = allChars[Math.floor(Math.random() * allChars.length)];

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.setProperty('--breathe-delay', Math.random() * 2 + 's');

        particleContainer.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove());
    }

    setInterval(createParticle, 800);
    for (let i = 0; i < 4; i++) setTimeout(createParticle, i * 200);
    setInterval(() => { for (let i = 0; i < 2; i++) setTimeout(createParticle, i * 150); }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    createDigitalParticles();

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const terminalPrefix = document.getElementById("terminal-prefix");
    const typedText = document.getElementById("typed-text");
    const h1 = document.querySelector("h1");

    const tabTitleMap = {
        projects: " Project Portfolio",
        about: " About Me",
        skills: " Technical Skills",
        contact: " Contact Info"
    };

    let typingTimeout;

    function typeText(newText) {
        if (!typedText) return;
        typedText.textContent = "";
        let charIndex = 0;

        function typeChar() {
            if (charIndex < newText.length) {
                typedText.textContent += newText.charAt(charIndex);
                charIndex++;
                typingTimeout = setTimeout(typeChar, Math.floor(Math.random() * 100) + 40);
            }
        }

        clearTimeout(typingTimeout);
        typeChar();
    }

    typeText(tabTitleMap["projects"]);

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');

            if (tabTitleMap[targetTab]) typeText(tabTitleMap[targetTab]);

            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => { this.style.transform = 'translateY(-2px) scale(1)'; }, 150);
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-card').forEach(card => observer.observe(card));

    document.addEventListener('mousemove', e => {
        const container = document.querySelector('.container');
        if (container) {
            container.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 20}px`);
            container.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 20}px`);
        }
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        card.addEventListener('click', () => {
            card.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => { card.style.transform = 'translateY(-10px) scale(1.02)'; }, 150);
        });
    });

    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05) translateY(-2px)';
            tag.style.boxShadow = '0 4px 12px rgba(0, 255, 0, 0.3)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) translateY(0)';
            tag.style.boxShadow = 'none';
        });
    });

    window.addEventListener('scroll', () => {
        const container = document.querySelector('.container::before');
        if (container) {
            const rate = window.pageYOffset * -0.5;
            container.style.transform = `translateY(${rate}px)`;
        }
    });

    setInterval(() => {
        if (Math.random() > 0.95) {
            const h1 = document.querySelector('h1');
            if (h1) {
                h1.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';
                setTimeout(() => {
                    h1.style.textShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
                }, 100);
            }
        }
    }, 3000);
});
