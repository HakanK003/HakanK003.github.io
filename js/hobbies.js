/**
 * Hobbies Page JavaScript
 * Handles modal open/close functionality for hobby detail popups
 */

function openModal(hobbyId) {
    const modal = document.getElementById('modal-' + hobbyId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(hobbyId) {
    const modal = document.getElementById('modal-' + hobbyId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
});
