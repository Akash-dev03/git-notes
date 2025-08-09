const params = new URLSearchParams(window.location.search);
const file = params.get("file");
const contentElement = document.getElementById("content");

// Show loading state
function showLoading() {
  contentElement.innerHTML = '<div class="loading">Loading</div>';
}

// Show error state
function showError(message) {
  contentElement.innerHTML = `<div class="error">Error loading file: ${message}</div>`;
}

// Show no file selected state
function showNoFile() {
  contentElement.innerHTML = `
    <div style="text-align: center; padding: 2rem; color: #8b949e;">
      <h2>No file selected</h2>
      <p>Please select a note from the <a href="index.html" style="color: #58a6ff;">main page</a>.</p>
    </div>
  `;
}

// Format filename for display
function formatFileName(filename) {
  return filename
    .replace('.md', '')
    .replace(/_/g, ' ')
    .replace(/,/g, ', ')
    .replace(/&/g, ' & ');
}

// Update document title
function updateTitle(filename) {
  const formattedName = formatFileName(filename);
  document.title = `${formattedName} - Git Notes`;
}

// Load and display markdown content
async function loadMarkdown() {
  if (!file) {
    showNoFile();
    return;
  }

  showLoading();
  updateTitle(file);

  try {
    const response = await fetch(file);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // Configure marked options for better rendering
    marked.setOptions({
      breaks: true,
      gfm: true,
      tables: true,
      sanitize: false,
      smartLists: true,
      smartypants: true
    });
    
    const html = marked.parse(text);
    contentElement.innerHTML = html;
    
    // Add smooth scroll to anchor links
    const anchorLinks = contentElement.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Add copy button to code blocks
    const codeBlocks = contentElement.querySelectorAll('pre code');
    codeBlocks.forEach(codeBlock => {
      const pre = codeBlock.parentElement;
      const copyButton = document.createElement('button');
      copyButton.innerHTML = '📋';
      copyButton.className = 'copy-button';
      copyButton.title = 'Copy to clipboard';
      copyButton.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
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
      
      pre.style.position = 'relative';
      pre.appendChild(copyButton);
      
      pre.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
      });
      
      pre.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0';
      });
      
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent);
          copyButton.innerHTML = '✅';
          setTimeout(() => {
            copyButton.innerHTML = '📋';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          copyButton.innerHTML = '❌';
          setTimeout(() => {
            copyButton.innerHTML = '📋';
          }, 2000);
        }
      });
    });
    
    // Add fade-in animation to content
    contentElement.style.opacity = '0';
    contentElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      contentElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      contentElement.style.opacity = '1';
      contentElement.style.transform = 'translateY(0)';
    }, 100);
    
  } catch (error) {
    console.error('Error loading markdown file:', error);
    showError(error.message || 'Unknown error occurred');
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // ESC key to go back
  if (e.key === 'Escape') {
    window.location.href = 'index.html';
  }
  
  // Ctrl/Cmd + K to focus search (if implemented)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // Could implement search functionality here
  }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  const newParams = new URLSearchParams(window.location.search);
  const newFile = newParams.get('file');
  if (newFile !== file) {
    location.reload();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadMarkdown);

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !contentElement.innerHTML.trim()) {
    loadMarkdown();
  }
});