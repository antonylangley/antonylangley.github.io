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

const projectData = {
  'pdf-translator': {
    title: 'PDF Translator',
    description: 'An intelligent AI-powered document translation platform built with Base44 and n8n. Features secure PDF processing with compression via PDFCo API and professional translation through DeepL, delivering translated documents via email in three simple steps.',
    features: [
      'Secure PDF upload and processing',
      'Multi-language translation support (Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Dutch)',
      'Automated PDF compression for optimized processing',
      'Professional-grade translation via DeepL API',
      'Email delivery system for translated documents',
      'Clean, intuitive three-step workflow'
    ],
    technologies: ['Base44', 'n8n', 'PDFCo API', 'DeepL API', 'PDF Processing', 'Email Integration'],
    github: 'https://github.com/antonylangley/pdf-translator',
    demo: 'https://app--pdf-translator-0bc20bdd.base44.app/',
    images: ['./attached_assets/screenshot-1754946109035.png']
  },
  'hey-fifi': {
    title: 'Hey Fifi',
    description: 'A sophisticated Raspberry Pi-based voice assistant that combines OpenAI GPT with advanced wake word detection. Features real-time voice interaction, contextual conversations, and seamless integration with home automation systems.',
    features: [
      'Wake word detection using Porcupine',
      'Real-time speech-to-text conversion',
      'GPT-powered contextual responses',
      'Text-to-speech with natural voice synthesis',
      'Raspberry Pi optimization for low latency',
      'Home automation integration capabilities'
    ],
    technologies: ['Python', 'OpenAI GPT', 'Raspberry Pi', 'Porcupine', 'TTS', 'Speech Recognition'],
    github: 'https://github.com/antonylangley/hey-fifi',
    demo: 'https://youtu.be/demo-video',
    images: ['./attached_assets/image_1750086371378.png']
  },
  'sylk': {
    title: 'Sylk',
    description: 'An elegant floating macOS AI dashboard that provides context-aware intelligence directly on your desktop. Features seamless integration with macOS, smart notifications, and adaptive UI elements that respond to your workflow.',
    features: [
      'Floating window with always-on-top functionality',
      'Context-aware AI responses based on active applications',
      'Smart notification system',
      'Adaptive UI that changes based on usage patterns',
      'Native macOS integration with Core ML',
      'Privacy-focused local processing'
    ],
    technologies: ['Swift', 'macOS', 'Core ML', 'AI Integration', 'SwiftUI', 'AppKit'],
    github: 'https://github.com/antonylangley/sylk',
    demo: 'https://sylk-demo.antonylangley.dev',
    images: ['./attached_assets/image_1750090276495.png']
  },
  'neural-network': {
    title: 'Neural Network Playground',
    description: 'An interactive web application for visualizing and experimenting with neural network architectures. Built for educational purposes with real-time training visualization, parameter adjustment, and comprehensive performance metrics.',
    features: [
      'Interactive neural network builder',
      'Real-time training visualization',
      'Multiple dataset options for experimentation',
      'Parameter tuning with live feedback',
      'Performance metrics and accuracy tracking',
      'Export trained models for further use'
    ],
    technologies: ['JavaScript', 'TensorFlow.js', 'D3.js', 'WebGL', 'HTML5 Canvas', 'Web Workers'],
    github: 'https://github.com/antonylangley/neural-playground',
    demo: 'https://neural-playground.antonylangley.dev',
    images: ['./attached_assets/image_1750090626234.png']
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Start particles immediately
  createDigitalParticles();

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const typedText = document.getElementById("typed-text");

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
        typedText.textContent += newText.charAt(charIndex++);
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
      setTimeout(() => this.style.transform = 'translateY(-2px) scale(1)', 150);
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

  // Project Modal Functionality
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalBackground = document.querySelector('.modal-background');

  function openProjectModal(projectKey) {
    const project = projectData[projectKey];
    if (!project) return;

    // Populate modal content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description-text').textContent = project.description;
    document.getElementById('modal-github').href = project.github;
    document.getElementById('modal-demo').href = project.demo;
    document.getElementById('modal-demo').textContent = 'View Project';

    // Features list
    const featuresList = document.getElementById('modal-features-list');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    // Tech stack
    const techStack = document.getElementById('modal-tech-stack');
    techStack.innerHTML = '';
    project.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      techStack.appendChild(span);
    });

    // Images
    const imageGallery = document.getElementById('modal-image-gallery');
    imageGallery.innerHTML = '';
    if (project.images && project.images.length > 0) {
      const img = document.createElement('img');
      img.src = project.images[0];
      img.alt = project.title;
      imageGallery.appendChild(img);
    } else {
      imageGallery.innerHTML = '<p>Project screenshots coming soon...</p>';
    }

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Event listeners for modal
  modalClose.addEventListener('click', closeProjectModal);
  modalBackground.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // Project card click handlers
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      card.style.transform = 'translateY(-5px) scale(0.98)';
      setTimeout(() => {
        openProjectModal(projectKey);
        card.style.transform = 'translateY(0) scale(1)';
      }, 150);
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
