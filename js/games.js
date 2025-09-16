// Games page functionality

// Game data for future expansion
const gamesData = [
  {
    id: 'treasure-hunt',
    title: 'Git Treasure Hunt',
    description: 'Find the hidden flag in commit history',
    difficulty: 'Beginner',
    estimatedTime: '15-30 minutes',
    skills: ['git log', 'git checkout', 'git show'],
    downloadUrl: 'GitTreasureHunt.zip'
  },
  {
    id: 'merge-wars',
    title: 'The Merge Wars',
    description: 'GitHub collaboration race with forks and PRs',
    difficulty: 'Intermediate',
    estimatedTime: '20-45 minutes',
    skills: ['fork', 'clone', 'branch', 'pull request'],
    repoUrl: 'https://github.com/05Akash/merge-wars-git-game.git'
  }
];

// Future games data
const upcomingGames = [
  {
    id: 'branch-master',
    title: 'Git Branch Master',
    description: 'Navigate complex branching scenarios and master merge conflicts',
    status: 'In Development',
    estimatedRelease: 'Q2 2025',
    difficulty: 'Advanced'
  },
  {
    id: 'time-machine',
    title: 'Time Machine Git',
    description: 'Practice advanced git history manipulation and time travel',
    status: 'Planned',
    estimatedRelease: 'Q3 2025',
    difficulty: 'Expert'
  },
  {
    id: 'champions-league',
    title: 'Git Champions League',
    description: 'Compete with others in real-time Git challenges',
    status: 'Concept',
    estimatedRelease: 'Q4 2025',
    difficulty: 'Competitive'
  }
];

// Function to add game interactions
function initializeGameInteractions() {
  // Add hover effects to game cards
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = `
        0 16px 64px rgba(0, 0, 0, 0.6),
        0 8px 24px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // Add click tracking for download buttons
  const downloadButtons = document.querySelectorAll('.btn');
  downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const gameTitle = button.closest('.card').querySelector('h2').textContent;
      console.log(`Game interaction: ${gameTitle}`);
      
      // Add loading state
      const originalText = button.innerHTML;
      button.innerHTML = `<span class="btn-icon">⏳</span>Loading...`;
      button.style.pointerEvents = 'none';
      
      // Reset after delay (for visual feedback)
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.pointerEvents = '';
      }, 2000);
    });
  });
}

// Function to initialize step animations
function initializeStepAnimations() {
  const stepItems = document.querySelectorAll('.step-item');
  
  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, observerOptions);

  stepItems.forEach((step, index) => {
    // Initial state
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    observer.observe(step);
  });
}

// Function to add progress tracking for games
function initializeGameProgress() {
  const PROGRESS_KEY = 'git-games-progress';
  
  // Get game progress from localStorage
  function getGameProgress() {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('localStorage not available for game progress');
      return {};
    }
  }

  // Save game progress
  function saveGameProgress(gameId, status) {
    try {
      const progress = getGameProgress();
      progress[gameId] = {
        status,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      updateProgressIndicators();
    } catch (error) {
      console.warn('Could not save game progress');
    }
  }

  // Update progress indicators
  function updateProgressIndicators() {
    const progress = getGameProgress();
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
      const title = card.querySelector('h2').textContent;
      const gameId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      if (progress[gameId]) {
        // Add completed indicator
        const indicator = document.createElement('div');
        indicator.className = 'completion-indicator';
        indicator.innerHTML = '✅ Completed';
        indicator.style.cssText = `
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(46, 160, 67, 0.15);
          color: #2ea043;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid rgba(46, 160, 67, 0.2);
        `;
        
        // Remove existing indicator
        const existing = card.querySelector('.completion-indicator');
        if (existing) existing.remove();
        
        card.style.position = 'relative';
        card.appendChild(indicator);
      }
    });
  }

  // Initialize progress indicators
  updateProgressIndicators();

  // Return functions for external use
  return { saveGameProgress, getGameProgress };
}

// Function to handle keyboard shortcuts for games
function initializeGameKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // ESC to go back to main hub
    if (e.key === 'Escape') {
      window.location.href = 'index.html';
    }

    // 'n' key to go to notes
    if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.location.href = 'notes.html';
      }
    }

    // 'h' key to go home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.location.href = 'index.html';
      }
    }

    // Number keys to quick-access games
    if (e.key >= '1' && e.key <= '9' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const gameIndex = parseInt(e.key) - 1;
      const gameButtons = document.querySelectorAll('.download-section .btn');
      if (gameButtons[gameIndex] && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        gameButtons[gameIndex].click();
      }
    }
  });
}

// Function to add copy-to-clipboard for code snippets
function initializeCodeCopy() {
  const codeElements = document.querySelectorAll('code');
  
  codeElements.forEach(codeEl => {
    // Only add copy button to command codes, not inline code
    if (codeEl.parentElement.classList.contains('step-content') || 
        codeEl.parentElement.classList.contains('command-item')) {
      
      const copyButton = document.createElement('button');
      copyButton.innerHTML = '📋';
      copyButton.className = 'copy-code-btn';
      copyButton.title = 'Copy command';
      copyButton.style.cssText = `
        position: absolute;
        top: 50%;
        right: 0.5rem;
        transform: translateY(-50%);
        background: rgba(56, 139, 253, 0.8);
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 1;
      `;

      const container = codeEl.parentElement;
      container.style.position = 'relative';
      container.appendChild(copyButton);

      container.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
      });

      container.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0';
      });

      copyButton.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
          await navigator.clipboard.writeText(codeEl.textContent);
          copyButton.innerHTML = '✅';
          setTimeout(() => {
            copyButton.innerHTML = '📋';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text:', err);
          copyButton.innerHTML = '❌';
          setTimeout(() => {
            copyButton.innerHTML = '📋';
          }, 2000);
        }
      });
    }
  });
}

// Function to add game difficulty indicators
function addDifficultyIndicators() {
  const gameCards = document.querySelectorAll('.game-card');
  
  gameCards.forEach((card, index) => {
    const gameData = gamesData[index];
    if (!gameData) return;

    const difficultyBadge = document.createElement('div');
    difficultyBadge.className = 'difficulty-badge';
    difficultyBadge.textContent = gameData.difficulty;
    
    const difficultyColor = {
      'Beginner': '#2ea043',
      'Intermediate': '#ffa500',
      'Advanced': '#f85149',
      'Expert': '#8b5cf6'
    }[gameData.difficulty] || '#8b949e';

    difficultyBadge.style.cssText = `
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: rgba(${hexToRgb(difficultyColor)}, 0.15);
      color: ${difficultyColor};
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid rgba(${hexToRgb(difficultyColor)}, 0.2);
    `;

    card.style.position = 'relative';
    card.insertBefore(difficultyBadge, card.firstChild);
  });
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return '139, 148, 158'; // Default gray
}

// Function to handle responsive features for games
function initializeResponsiveGamesFeatures() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    document.body.classList.add('mobile');

    // Simplify step items for mobile
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(step => {
      step.addEventListener('touchstart', () => {
        step.style.background = 'rgba(56, 139, 253, 0.1)';
      });

      step.addEventListener('touchend', () => {
        setTimeout(() => {
          step.style.background = '';
        }, 200);
      });
    });
  }
}

// Main initialization function for games page
function initialize() {
  console.log('Initializing Git Games page...');
  
  // Core functionality
  initializeGameInteractions();
  initializeStepAnimations();
  initializeGameKeyboardShortcuts();
  initializeCodeCopy();
  initializeResponsiveGamesFeatures();
  
  // Enhancements
  const gameProgress = initializeGameProgress();
  addDifficultyIndicators();
  
  console.log('Git Games page initialized successfully');
  
  // Return game progress functions for external access
  return gameProgress;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    console.log('Games page is now visible');
  }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initialize,
    gamesData,
    upcomingGames,
    initializeGameProgress
  };
}