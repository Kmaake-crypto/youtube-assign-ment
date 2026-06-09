// =====================================================
// MOBILE SIDEBAR TOGGLE
// =====================================================
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
});

document.addEventListener('click', (e) => {
    if (
        document.body.classList.contains('sidebar-open') &&
        !e.target.closest('.sidebar') &&
        !e.target.closest('.menu-btn')
    ) {
        document.body.classList.remove('sidebar-open');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.body.classList.remove('sidebar-open');
    }
});

// =====================================================
// YOU SUBMENU TOGGLE WITH CURSOR FEEDBACK
// =====================================================
// This handles the expandable/collapsible "You" menu in sidebar
// with enhanced cursor interactions and visual feedback

const youToggle = document.getElementById('youToggle');
const youSubmenu = document.getElementById('youSubmenu');

// Toggle submenu on click
youToggle.addEventListener('click', (e) => {
    e.preventDefault();
    youToggle.classList.toggle('active');
    youSubmenu.classList.toggle('active');
    
    // Add visual feedback
    youToggle.style.transform = 'scale(0.98)';
    setTimeout(() => {
        youToggle.style.transform = 'scale(1)';
    }, 100);
});

// Add cursor pointer on hover
youToggle.addEventListener('mouseenter', () => {
    youToggle.style.cursor = 'pointer';
});

// Close submenu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#youToggle') && !e.target.closest('.you-submenu')) {
        youToggle.classList.remove('active');
        youSubmenu.classList.remove('active');
    }
});

// Add hover effects to submenu items
const submenuItems = document.querySelectorAll('.submenu-item');
submenuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.cursor = 'pointer';
        item.style.transform = 'translateX(4px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
    
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.97)';
        setTimeout(() => {
            item.style.transform = 'translateX(0)';
        }, 100);
    });
});

// Add smooth scroll behavior
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this !== youToggle) {
            e.preventDefault();
        }
    });
});

// =====================================================
// CUSTOM FEATURE 1: DARK MODE TOGGLE
// =====================================================
// This feature allows users to toggle between light and dark themes

const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const htmlElement = document.documentElement;

// Check if dark mode was previously enabled
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
if (isDarkMode) {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    htmlElement.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    localStorage.setItem('darkMode', 'enabled');
    
    // Apply dark mode styles
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#e0e0e0';
    applyDarkModeToElements();
}

function disableDarkMode() {
    htmlElement.removeAttribute('data-theme');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
    localStorage.setItem('darkMode', 'disabled');
    
    // Restore light mode styles
    document.body.style.backgroundColor = '#f9f9f9';
    document.body.style.color = '#0f0f0f';
    removeDarkModeFromElements();
}

function applyDarkModeToElements() {
    // Navigation bar
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) navContainer.style.backgroundColor = '#1f1f1f';
    
    // Sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.style.backgroundColor = '#1f1f1f';
    
    // Video cards and text
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const title = card.querySelector('.video-title');
        const channelName = card.querySelector('.channel-name');
        const videoMeta = card.querySelector('.video-meta');
        
        if (title) title.style.color = '#e0e0e0';
        if (channelName) channelName.style.color = '#aaaaaa';
        if (videoMeta) videoMeta.style.color = '#aaaaaa';
    });
    
    // Input fields
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.style.backgroundColor = '#2f2f2f';
        searchInput.style.color = '#e0e0e0';
        searchInput.style.borderColor = '#444444';
    }
    
    // Content wrapper
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) contentWrapper.style.backgroundColor = '#121212';
}

function removeDarkModeFromElements() {
    // Navigation bar
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) navContainer.style.backgroundColor = '#ffffff';
    
    // Sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.style.backgroundColor = '#ffffff';
    
    // Video cards and text
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const title = card.querySelector('.video-title');
        const channelName = card.querySelector('.channel-name');
        const videoMeta = card.querySelector('.video-meta');
        
        if (title) title.style.color = '#0f0f0f';
        if (channelName) channelName.style.color = '#606060';
        if (videoMeta) videoMeta.style.color = '#606060';
    });
    
    // Input fields
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.style.backgroundColor = '#ffffff';
        searchInput.style.color = '#0f0f0f';
        searchInput.style.borderColor = '#cccccc';
    }
    
    // Content wrapper
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) contentWrapper.style.backgroundColor = '#f9f9f9';
}

// =====================================================
// CUSTOM FEATURE 2: VIDEO SEARCH & FILTER
// =====================================================
// This feature allows users to search and filter videos in real-time
// Search matches against video titles, channel names, and data attributes

const searchInput = document.getElementById('videoSearch');
const videoCards = document.querySelectorAll('.video-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    let visibleCount = 0;
    
    videoCards.forEach(card => {
        const cardTitle = card.getAttribute('data-title').toLowerCase();
        const videoTitle = card.querySelector('.video-title').textContent.toLowerCase();
        const channelName = card.querySelector('.channel-name').textContent.toLowerCase();
        
        // Check if search term matches title, channel, or data attributes
        if (searchTerm === '' || 
            cardTitle.includes(searchTerm) || 
            videoTitle.includes(searchTerm) || 
            channelName.includes(searchTerm)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease-in';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show "no results" message if needed
    showNoResultsMessage(visibleCount === 0 && searchTerm !== '');
});

function showNoResultsMessage(show) {
    let noResultsDiv = document.getElementById('no-results');
    
    if (show) {
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'no-results';
            noResultsDiv.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px 20px;
                color: #606060;
                font-size: 18px;
                font-weight: 500;
            `;
            noResultsDiv.textContent = 'No videos found. Try different keywords.';
            document.querySelector('.video-grid').appendChild(noResultsDiv);
        }
    } else {
        if (noResultsDiv) {
            noResultsDiv.remove();
        }
    }
}

// Prevent form submission on search
document.querySelector('.search-container').addEventListener('submit', (e) => {
    e.preventDefault();
});

// Add fade-in animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth transitions for sidebar items */
    .sidebar-item, .submenu-item {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .sidebar-item {
        cursor: pointer;
    }
    
    /* Dark mode CSS variables */
    html[data-theme="dark"] {
        --bg-primary: #121212;
        --bg-secondary: #1f1f1f;
        --text-primary: #e0e0e0;
        --text-secondary: #aaaaaa;
        --border-color: #444444;
    }
    
    html[data-theme="dark"] body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
    }
    
    html[data-theme="dark"] .nav-container {
        background-color: var(--bg-secondary);
    }
    
    html[data-theme="dark"] .sidebar {
        background-color: var(--bg-secondary);
        border-right-color: var(--border-color);
    }
    
    html[data-theme="dark"] .sidebar-item {
        background-color: #282828;
        color: var(--text-primary);
    }
    
    html[data-theme="dark"] .sidebar-item:hover {
        background-color: #383838;
    }
    
    html[data-theme="dark"] .search-input {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        border-color: var(--border-color);
    }
    
    html[data-theme="dark"] .search-input::placeholder {
        color: var(--text-secondary);
    }
    
    html[data-theme="dark"] .you-submenu {
        background-color: transparent;
    }
    
    html[data-theme="dark"] .submenu-item {
        color: var(--text-primary);
        background-color: #282828;
    }
    
    html[data-theme="dark"] .submenu-item:hover {
        background-color: #383838;
    }
`;
document.head.appendChild(style);
