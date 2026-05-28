/**
 * IronForge Gym - Modular Application Script Engine
 * Dibungkus dengan IIFE untuk mengamankan namespace dokumen dari gangguan global variabel pihak ketiga.
 */
(function () {
    "use strict";

    // === 1. NOTIFIKASI TOAST CUSTOM FUNCTION ===
    function showNotification(message) {
        // Cek jika elemen toast sebelumnya masih ada, hapus terlebih dahulu demi performa DOM
        const activeToast = document.querySelector('.custom-toast-alert');
        if (activeToast) activeToast.remove();

        const toast = document.createElement('div');
        toast.className = 'custom-toast-alert';
        toast.textContent = message;

        // Deklarasi gaya layout langsung lewat Javascript Utility Style
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1a1a2e',
            color: '#ffb347',
            padding: '12px 24px',
            borderRadius: '50px',
            borderLeft: '4px solid #ffb347',
            zIndex: '10000',
            fontSize: '0.85rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            transition: 'opacity 0.3s ease'
        });

        document.body.appendChild(toast);
        
        // Aturan waktu animasi keluar transisi
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2200);
    }

    // === 2. EVENT BINDING SYSTEM CONTROLLERS ===
    function initializeEvents() {
        // Query seluruh elemen penunjuk konversi konvensional
        const actionButtons = document.querySelectorAll('#joinBtn, #startBtn, #ctaBtn, .choosePlan');
        
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                showNotification('💪 This is a demo. Contact me to build your real gym website!');
            });
        });

        // Mekanisme Smooth Scroll Anchor untuk navigasi tautan menu internal
        const navigationLinks = document.querySelectorAll('.nav-link');
        
        navigationLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetAttribute = this.getAttribute('href');
                
                // Cegah error pembacaan jika link hanya berupa hashtag '#' kosong
                if (targetAttribute === '#' || !targetAttribute.startsWith('#')) return;

                const destinationElement = document.querySelector(targetAttribute);
                if (destinationElement) {
                    destinationElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Otomatis menutup menu navbar bootstrap pada tampilan mobile pasca klik tautan
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show') && navbarToggler) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }

    // === 3. RUNNING SYSTEM APP INITIALIZATION ===
    document.addEventListener("DOMContentLoaded", () => {
        initializeEvents();
    });
})();