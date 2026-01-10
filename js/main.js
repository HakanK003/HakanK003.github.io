/**
 * Main JavaScript File
 * Handles mobile menu toggle and common functionality across all pages
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll to top
    const backToTopLinks = document.querySelectorAll('a[href="#top"]');
    backToTopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
