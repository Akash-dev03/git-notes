// Main page functionality

// Function to add animation delays to cards
function initializeAnimations() {
  const cards = document.querySelectorAll('.nav-card, .card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Function to handle keyboard shortcuts
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // '1' key to go to Git Notes
    if (e.key === '1' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const notesLink = document.querySelector('a[href="notes.html"]');
      if (notesLink && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.location.href = 'notes.html';
      }
    }

    // '2' key to go to Git Games
    if (e.key === '2' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const gamesLink = document.querySelector('a[href="games.html"]');
      if (gamesLink && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.location.href = 'games.html';
      }
    }

    // 'h' key to go home (useful for consistency)
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.location.href = 'index.html';
      }
    }
  });
}

// Function to add hover effects and interactions
function initializeInteractions() {
  const navCards = document.querySelectorAll('.nav-card');
  
  navCards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(88, 166, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Add enhanced focus handling
    card.addEventListener('focus', () => {
      card.style.transform = 'translateY(-4px) scale(1.01)';
    });

    card.addEventListener('blur', () => {
      card.style.transform = '';
    });

    // Add keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// Function to handle responsive navigation
function initializeResponsiveFeatures() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    document.body.classList.add('mobile');

    // Add touch-friendly interactions
    const interactiveElements = document.querySelectorAll('.nav-card, .benefit-item');
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.style.background = 'rgba(56, 139, 253, 0.1)';
      });

      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.style.background = '';
        }, 200);
      });
    });
  }

  // Handle orientation changes
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  });
}

// Function to add CSS ripple animation
function addRippleAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Function to handle page visibility changes
function initializePageVisibility() {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // Refresh any dynamic content when page becomes visible
      console.log('Main page is now visible');
      
      // Could refresh stats, check for updates, etc.
      updatePageStats();
    }
  });
}

// Function to update page statistics (placeholder)
function updatePageStats() {
  // This could fetch and display stats like:
  // - Number of notes available
  // - Number of games
  // - Last updated date
  // - User progress (if implemented)
  
  const notesCount = 14; // Could be dynamic
  const gamesCount = 2;  // Could be dynamic
  
  console.log(`Git Notes: ${notesCount} topics, ${gamesCount} games available`);
}

// Function to initialize theme handling (for future enhancement)
function initializeTheme() {
  const savedTheme = localStorage.getItem('git-hub-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Could add theme toggle button in the future
}

// Function to add accessibility enhancements
function initializeAccessibility() {
  // Add skip navigation link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #58a6ff;
    color: white;
    padding: 8px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    z-index: 1000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content landmark
  const container = document.querySelector('.container');
  if (container) {
    container.setAttribute('id', 'main-content');
    container.setAttribute('role', 'main');
  }
}

// Function to handle analytics (placeholder)
function initializeAnalytics() {
  // Track page views
  console.log('Main page viewed');
  
  // Track user interactions
  const navCards = document.querySelectorAll('.nav-card');
  navCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const destination = card.getAttribute('href');
      console.log(`Navigation: User clicked ${destination}`);
    });
  });
}

// Main initialization function
function initialize() {
  // Core functionality
  initializeAnimations();
  initializeKeyboardShortcuts();
  initializeInteractions();
  initializeResponsiveFeatures();
  
  // Enhancements
  addRippleAnimation();
  initializePageVisibility();
  initializeTheme();
  initializeAccessibility();
  initializeAnalytics();
  
  // Update initial stats
  updatePageStats();
  
  console.log('Git Learning Hub initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Handle performance optimization
window.addEventListener('load', () => {
  // Remove loading states, optimize images, etc.
  console.log('Git Learning Hub fully loaded');
  
  // Could implement lazy loading for future content
});

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initialize,
    initializeAnimations,
    initializeKeyboardShortcuts,
    updatePageStats
  };
}