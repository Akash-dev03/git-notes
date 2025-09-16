// Notes page functionality - Updated for new structure

// Ordered list of markdown files with better organization
const files = [
  "/notes/What_is_Git.md",
  "/notes/Git_Installation_and_basic_configuration.md",
  "/notes/Repository_basics.md",
  "/notes/Branching_&_Merging.md",
  "/notes/Remote_Push_Pull.md",
  "/notes/Undoing_Changes.md",
  "/notes/Tracking_Branches_&_Upstream.md",
  "/notes/Fork_Syncing.md",
  "/notes/git_rebase.md",
  "/notes/Git_Stash.md",
  "/notes/Git_Reflog.md",
  "/notes/Git_Cherry-pick.md",
  "/notes/Git_Submodules.md",
  "/notes/git_worktree.md",
];

// Function to format filename for display
function formatFileName(filename) {
  return filename
    .replace(/^\/?notes\//, "")
    .replace(".md", "")
    .replace(/_/g, " ")
    .replace(/,/g, ", ")
    .replace(/&/g, " & ")
    .replace(/git /gi, "Git ") // Capitalize Git
    .trim();
}

// Function to create file list with enhanced styling
function createFileList() {
  const list = document.getElementById("file-list");

  if (!list) {
    console.error("file-list element not found");
    return;
  }

  // Clear existing content
  list.innerHTML = "";

  files.forEach((file, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");

    // Set link properties
    link.href = `view.html?file=${encodeURIComponent(file)}`;
    link.textContent = formatFileName(file);
    link.title = `Read: ${formatFileName(file)}`;

    // Add click tracking for analytics (optional)
    link.addEventListener("click", () => {
      console.log(`Navigating to: ${file}`);
    });

    // Add keyboard navigation
    link.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        link.click();
      }
    });

    li.appendChild(link);
    list.appendChild(li);

    // Add stagger animation
    li.style.opacity = "0";
    li.style.transform = "translateX(-20px)";
    setTimeout(() => {
      li.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      li.style.opacity = "1";
      li.style.transform = "translateX(0)";
    }, 100 + index * 50);
  });
}

// Function to handle search functionality
function initializeSearch() {
  // Check if search input already exists
  let searchInput = document.querySelector('.search-input');
  
  if (!searchInput) {
    // Create search input
    searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search notes...";
    searchInput.className = "search-input";
    searchInput.style.cssText = `
      width: 100%;
      padding: 0.75rem 1rem;
      margin-bottom: 1.5rem;
      background: rgba(13, 17, 23, 0.6);
      border: 1px solid rgba(56, 139, 253, 0.2);
      border-radius: 8px;
      color: #f0f6fc;
      font-size: 1rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    `;

    // Add search input to the page
    const notesGrid = document.querySelector('.notes-grid');
    const fileList = document.getElementById('file-list');
    if (notesGrid && fileList) {
      notesGrid.insertBefore(searchInput, fileList);
    }
  }

  // Add search functionality
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll("#file-list li");

    let visibleCount = 0;
    listItems.forEach((li) => {
      const linkText = li.querySelector("a").textContent.toLowerCase();
      if (linkText.includes(searchTerm) || searchTerm === "") {
        li.style.display = "block";
        li.style.opacity = "1";
        li.style.transform = "translateX(0)";
        visibleCount++;
      } else {
        li.style.display = "none";
        li.style.opacity = "0";
        li.style.transform = "translateX(-20px)";
      }
    });

    // Update search results indicator
    updateSearchResultsIndicator(visibleCount, listItems.length, searchTerm);
  });

  searchInput.addEventListener("focus", () => {
    searchInput.style.borderColor = "#58a6ff";
    searchInput.style.boxShadow = "0 0 0 2px rgba(88, 166, 255, 0.2)";
  });

  searchInput.addEventListener("blur", () => {
    searchInput.style.borderColor = "rgba(56, 139, 253, 0.2)";
    searchInput.style.boxShadow = "none";
  });

  // Add keyboard shortcut for search focus
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

// Function to show search results indicator
function updateSearchResultsIndicator(visible, total, searchTerm) {
  let indicator = document.querySelector('.search-results-indicator');
  
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'search-results-indicator';
    indicator.style.cssText = `
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      background: rgba(56, 139, 253, 0.1);
      border: 1px solid rgba(56, 139, 253, 0.2);
      border-radius: 8px;
      color: #58a6ff;
      font-size: 0.875rem;
      text-align: center;
    `;
    
    const fileList = document.getElementById('file-list');
    const notesGrid = document.querySelector('.notes-grid');
    if (notesGrid && fileList) {
      notesGrid.insertBefore(indicator, fileList);
    }
  }

  if (searchTerm) {
    indicator.style.display = 'block';
    indicator.textContent = `Showing ${visible} of ${total} notes for "${searchTerm}"`;
    
    if (visible === 0) {
      indicator.style.background = 'rgba(248, 81, 73, 0.1)';
      indicator.style.borderColor = 'rgba(248, 81, 73, 0.2)';
      indicator.style.color = '#f85149';
      indicator.textContent = `No notes found for "${searchTerm}"`;
    } else {
      indicator.style.background = 'rgba(56, 139, 253, 0.1)';
      indicator.style.borderColor = 'rgba(56, 139, 253, 0.2)';
      indicator.style.color = '#58a6ff';
    }
  } else {
    indicator.style.display = 'none';
  }
}

// Function to check if files exist (optional validation)
async function validateFiles() {
  const validFiles = [];
  const invalidFiles = [];

  for (const file of files) {
    try {
      const response = await fetch(file, { method: "HEAD" });
      if (response.ok) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    } catch (error) {
      invalidFiles.push(file);
    }
  }

  if (invalidFiles.length > 0) {
    console.warn("Missing files:", invalidFiles);
    showMissingFilesWarning(invalidFiles);
  }

  console.log(`Validated ${validFiles.length}/${files.length} files`);
  return validFiles;
}

// Function to show warning for missing files
function showMissingFilesWarning(missingFiles) {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    const warning = document.createElement('div');
    warning.style.cssText = `
      background: rgba(248, 81, 73, 0.1);
      border: 1px solid rgba(248, 81, 73, 0.2);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      color: #f85149;
    `;
    warning.innerHTML = `
      <strong>⚠️ Development Warning:</strong><br>
      Missing files: ${missingFiles.join(', ')}<br>
      <small>This warning only shows in development mode.</small>
    `;
    
    const container = document.querySelector('.container');
    const firstCard = document.querySelector('.card');
    if (container && firstCard) {
      container.insertBefore(warning, firstCard);
    }
  }
}

// Function to add keyboard shortcuts for notes
function initializeNotesKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // ESC to go back to main hub
    if (e.key === 'Escape') {
      window.location.href = 'index.html';
    }

    // 'g' key to go to games
    if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.location.href = 'games.html';
      }
    }

    // 'h' key to go home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        window.location.href = 'index.html';
      }
    }

    // Alt + number keys to navigate to specific notes
    if (e.altKey && e.key >= "1" && e.key <= "9") {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      if (index < files.length) {
        window.location.href = `view.html?file=${encodeURIComponent(
          files[index]
        )}`;
      }
    }

    // Arrow keys for navigation between notes
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const links = Array.from(document.querySelectorAll('#file-list a'));
      const currentIndex = links.findIndex(link => link === document.activeElement);
      
      if (currentIndex !== -1) {
        e.preventDefault();
        if (e.key === 'ArrowDown' && currentIndex < links.length - 1) {
          links[currentIndex + 1].focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          links[currentIndex - 1].focus();
        }
      } else if (e.key === 'ArrowDown' && links.length > 0) {
        e.preventDefault();
        links[0].focus();
      }
    }
  });
}

// Function to add progress tracking for notes
function initializeNotesProgressTracking() {
  const STORAGE_KEY = "git-notes-progress";

  // Get completed notes from localStorage (if available)
  function getCompletedNotes() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn("localStorage not available");
      return [];
    }
  }

  // Save completed note
  function markNoteCompleted(filename) {
    try {
      const completed = getCompletedNotes();
      if (!completed.includes(filename)) {
        completed.push(filename);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      }
    } catch (error) {
      console.warn("Could not save progress");
    }
  }

  // Add progress indicators to links
  function updateProgressIndicators() {
    const completed = getCompletedNotes();
    const links = document.querySelectorAll("#file-list a");

    links.forEach((link) => {
      const urlParams = new URLSearchParams(link.search);
      const filename = urlParams.get('file') || link.getAttribute('href').split('file=')[1];
      
      if (filename && completed.includes(decodeURIComponent(filename))) {
        link.style.opacity = "0.7";
        link.innerHTML += " ✓";
        link.title += " (Completed)";
      }
    });

    // Update progress counter
    const progressCounter = document.createElement('div');
    progressCounter.className = 'progress-counter';
    progressCounter.style.cssText = `
      text-align: center;
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      background: rgba(46, 160, 67, 0.1);
      border: 1px solid rgba(46, 160, 67, 0.2);
      border-radius: 8px;
      color: #2ea043;
      font-weight: 500;
    `;
    progressCounter.textContent = `Progress: ${completed.length}/${files.length} notes completed`;

    const notesGrid = document.querySelector('.notes-grid');
    const existingCounter = document.querySelector('.progress-counter');
    if (existingCounter) existingCounter.remove();
    
    if (notesGrid && completed.length > 0) {
      notesGrid.appendChild(progressCounter);
    }
  }

  // Mark current note as completed when viewing (for integration with view page)
  if (window.location.pathname.includes("view.html")) {
    const params = new URLSearchParams(window.location.search);
    const currentFile = params.get("file");
    if (currentFile) {
      markNoteCompleted(currentFile);
    }
  }

  updateProgressIndicators();
  
  return { getCompletedNotes, markNoteCompleted, updateProgressIndicators };
}

// Function to handle responsive navigation for notes
function initializeResponsiveNotesFeatures() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    document.body.classList.add("mobile");

    // Add touch-friendly interactions
    const links = document.querySelectorAll("#file-list a");
    links.forEach((link) => {
      link.addEventListener("touchstart", () => {
        link.style.background = "rgba(56, 139, 253, 0.1)";
      });

      link.addEventListener("touchend", () => {
        setTimeout(() => {
          link.style.background = "";
        }, 200);
      });
    });
  }

  // Handle orientation changes
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      // Recalculate layout if needed
      window.dispatchEvent(new Event("resize"));
    }, 100);
  });
}

// Function to add theme toggle (future enhancement)
function initializeNotesThemeToggle() {
  // This could be expanded to support light theme in the future
  const theme = localStorage.getItem("git-notes-theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);
}

// Function to add quick navigation panel
function addQuickNavigation() {
  const quickNav = document.createElement('div');
  quickNav.className = 'quick-navigation';
  quickNav.style.cssText = `
    position: fixed;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(22, 27, 34, 0.95);
    border: 1px solid rgba(56, 139, 253, 0.2);
    border-radius: 12px;
    padding: 1rem;
    backdrop-filter: blur(10px);
    z-index: 100;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    max-width: 200px;
  `;

  const navTitle = document.createElement('div');
  navTitle.style.cssText = `
    color: #58a6ff;
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
    text-align: center;
  `;
  navTitle.textContent = 'Quick Navigation';

  const navLinks = document.createElement('div');
  navLinks.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `;

  // Add navigation shortcuts
  const shortcuts = [
    { key: 'H', label: 'Home', action: () => window.location.href = 'html/index.html' },
    { key: 'G', label: 'Games', action: () => window.location.href = 'games/games.html' },
    { key: 'Ctrl+K', label: 'Search', action: () => document.querySelector('.search-input')?.focus() }
  ];

  shortcuts.forEach(shortcut => {
    const shortcutEl = document.createElement('div');
    shortcutEl.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.375rem 0.5rem;
      background: rgba(13, 17, 23, 0.6);
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.2s ease;
    `;
    shortcutEl.innerHTML = `
      <span style="color: #c9d1d9;">${shortcut.label}</span>
      <kbd style="background: rgba(56, 139, 253, 0.2); color: #58a6ff; padding: 0.125rem 0.25rem; border-radius: 3px; font-size: 0.75rem;">${shortcut.key}</kbd>
    `;
    shortcutEl.addEventListener('click', shortcut.action);
    navLinks.appendChild(shortcutEl);
  });

  quickNav.appendChild(navTitle);
  quickNav.appendChild(navLinks);
  document.body.appendChild(quickNav);

  // Show/hide quick navigation
  let showTimeout;
  document.addEventListener('keydown', (e) => {
    if (e.key === '?') {
      quickNav.style.opacity = '1';
      quickNav.style.pointerEvents = 'auto';
      clearTimeout(showTimeout);
      showTimeout = setTimeout(() => {
        quickNav.style.opacity = '0';
        quickNav.style.pointerEvents = 'none';
      }, 3000);
    }
  });

  // Hide on mobile
  if (window.innerWidth <= 768) {
    quickNav.style.display = 'none';
  }
}

// Main initialization function
function initialize() {
  console.log('Initializing Git Notes page...');
  
  // Core functionality
  createFileList();
  initializeNotesKeyboardShortcuts();
  initializeResponsiveNotesFeatures();

  // Enhanced features
  initializeSearch();
  const progressTracker = initializeNotesProgressTracking();
  initializeNotesThemeToggle();
  addQuickNavigation();

  // Validate files in development
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    validateFiles();
  }

  console.log("Git Notes page initialized successfully");
  
  return { files, formatFileName, createFileList, progressTracker };
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    // Refresh any dynamic content when page becomes visible
    console.log("Notes page is now visible");
  }
});

// Export functions for potential use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    files,
    formatFileName,
    createFileList,
    initialize,
  };
}