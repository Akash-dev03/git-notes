// Ordered list of markdown files with better organization
const files = [
    "What_is_Git.md",
    "Git_Installation_and_basic_configuration.md", 
    "Repository_basics.md",
    "Branching_&_Merging.md",
    "Remote,_Push,_Pull,.md",
    "Undoing_Changes.md",
    "Tracking_Branches_&_Upstream.md",
    "Fork_Syncing.md",
    "git_rebase.md",
    "Git_Stash.md",
    "Git_Reflog.md",
    "Git_Cherry-pick.md",
    "Git_Submodules.md",
    "git_worktree.md"
];

// Function to format filename for display
function formatFileName(filename) {
    return filename
        .replace('.md', '')
        .replace(/_/g, ' ')
        .replace(/,/g, ', ')
        .replace(/&/g, ' & ')
        .replace(/git /gi, 'Git ') // Capitalize Git
        .trim();
}

// Function to create file list with enhanced styling
function createFileList() {
    const list = document.getElementById("file-list");
    
    // Clear existing content
    list.innerHTML = '';
    
    files.forEach((file, index) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        
        // Set link properties
        link.href = `view.html?file=${encodeURIComponent(file)}`;
        link.textContent = formatFileName(file);
        link.title = `Read: ${formatFileName(file)}`;
        
        // Add click tracking for analytics (optional)
        link.addEventListener('click', () => {
            console.log(`Navigating to: ${file}`);
        });
        
        // Add keyboard navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
        
        li.appendChild(link);
        list.appendChild(li);
        
        // Add stagger animation
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            li.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        }, 100 + (index * 50));
    });
}

// Function to handle search functionality (future enhancement)
function initializeSearch() {
    // Create search input (can be added to HTML later)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search notes...';
    searchInput.className = 'search-input';
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
    
    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const listItems = document.querySelectorAll('#file-list li');
        
        listItems.forEach(li => {
            const linkText = li.querySelector('a').textContent.toLowerCase();
            if (linkText.includes(searchTerm) || searchTerm === '') {
                li.style.display = 'block';
                li.style.opacity = '1';
            } else {
                li.style.display = 'none';
                li.style.opacity = '0';
            }
        });
        
        // Update counter
        const visibleItems = Array.from(listItems).filter(li => 
            li.style.display !== 'none'
        ).length;
        
        console.log(`Showing ${visibleItems} of ${listItems.length} notes`);
    });
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#58a6ff';
        searchInput.style.boxShadow = '0 0 0 2px rgba(88, 166, 255, 0.2)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = 'rgba(56, 139, 253, 0.2)';
        searchInput.style.boxShadow = 'none';
    });
    
    // Uncomment to add search input to the page
    // const notesCard = document.querySelector('.card');
    // const notesGrid = document.querySelector('.notes-grid');
    // notesGrid.insertBefore(searchInput, document.getElementById('file-list'));
}

// Function to check if files exist (optional validation)
async function validateFiles() {
    const validFiles = [];
    const invalidFiles = [];
    
    for (const file of files) {
        try {
            const response = await fetch(file, { method: 'HEAD' });
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
        console.warn('Missing files:', invalidFiles);
    }
    
    console.log(`Validated ${validFiles.length}/${files.length} files`);
    return validFiles;
}

// Function to add keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt + H to go home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
        
        // Alt + number keys to navigate to specific notes
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            if (index < files.length) {
                window.location.href = `view.html?file=${encodeURIComponent(files[index])}`;
            }
        }
        
        // Ctrl/Cmd + K for search focus (when search is implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

// Function to add progress tracking
function initializeProgressTracking() {
    const STORAGE_KEY = 'git-notes-progress';
    
    // Get completed notes from localStorage (if available)
    function getCompletedNotes() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('localStorage not available');
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
            console.warn('Could not save progress');
        }
    }
    
    // Add progress indicators to links
    function updateProgressIndicators() {
        const completed = getCompletedNotes();
        const links = document.querySelectorAll('#file-list a');
        
        links.forEach(link => {
            const filename = new URLSearchParams(link.search).get('file');
            if (completed.includes(filename)) {
                link.style.opacity = '0.7';
                link.innerHTML += ' ✓';
            }
        });
    }
    
    // Mark current note as completed when viewing
    if (window.location.pathname.includes('view.html')) {
        const params = new URLSearchParams(window.location.search);
        const currentFile = params.get('file');
        if (currentFile) {
            markNoteCompleted(currentFile);
        }
    }
    
    updateProgressIndicators();
}

// Function to handle responsive navigation
function initializeResponsiveFeatures() {
    // Add mobile menu toggle if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add mobile-specific enhancements
        document.body.classList.add('mobile');
        
        // Add touch-friendly interactions
        const links = document.querySelectorAll('#file-list a');
        links.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.style.background = 'rgba(56, 139, 253, 0.1)';
            });
            
            link.addEventListener('touchend', () => {
                setTimeout(() => {
                    link.style.background = '';
                }, 200);
            });
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate layout if needed
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
}

// Function to add theme toggle (future enhancement)
function initializeThemeToggle() {
    // This could be expanded to support light theme in the future
    const theme = localStorage.getItem('git-notes-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
}

// Main initialization function
function initialize() {
    // Core functionality
    createFileList();
    initializeKeyboardShortcuts();
    initializeResponsiveFeatures();
    
    // Optional enhancements
    // initializeSearch(); // Uncomment to enable search
    // initializeProgressTracking(); // Uncomment to enable progress tracking
    // initializeThemeToggle(); // Uncomment to enable theme toggle
    
    // Validate files in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // validateFiles(); // Uncomment for development
    }
    
    console.log('Git Notes initialized successfully');
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
        // Refresh any dynamic content when page becomes visible
        console.log('Page is now visible');
    }
});

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        files,
        formatFileName,
        createFileList,
        initialize
    };
}