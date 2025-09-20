// Rome Tour Guide JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Bus stop data
    const busStopData = {
        'termini': {
            name: 'Termini Bahnhof',
            attractions: [
                'Roms größter Bahnhof und Verkehrsknotenpunkt',
                'Diokletiansthermen - antike römische Bäder',
                'Einkaufszentrum und Restaurants',
                'Startpunkt für viele Stadttouren'
            ]
        },
        'santa-maria': {
            name: 'Santa Maria Maggiore',
            attractions: [
                'Eine der vier Papstbasiliken Roms',
                'Wunderschöne byzantinische Mosaiken',
                'Mariensäule auf der Piazza',
                'Heilige Krippe aus Bethlehem'
            ]
        },
        'colosseum': {
            name: 'Kolosseum',
            attractions: [
                'Flavisches Amphitheater - UNESCO-Weltkulturerbe',
                'Konstantinsbogen - römischer Triumphbogen',
                'Domus Aurea - Neros goldener Palast',
                'Ludus Magnus - Gladiatorenschule',
                '🍦 Mama & Papas unvergesslicher Gelato-Moment!'
            ]
        },
        'circus-maximus': {
            name: 'Circus Maximus',
            attractions: [
                'Größte Rennbahn der Antike (realistisch ca. 150.000 Plätze; antike Quellen nennen bis 250.000)',
                'Palatinhügel mit Kaiserpalästen',
                'Städtischer Rosengarten',
                'Aventinhügel mit Orangengarten'
            ]
        },
        'piazza-venezia': {
            name: 'Piazza Venezia',
            attractions: [
                'Vittoriano - Monument für Viktor Emanuel II',
                'Forum Romanum - Zentrum des antiken Roms',
                'Kapitolinische Museen',
                'Trajanssäule und Trajansmärkte'
            ]
        },
        'vatican': {
            name: 'Vatikan',
            attractions: [
                'Petersdom - größte Kirche der Welt',
                'Vatikanische Museen mit 54 Galerien',
                'Sixtinische Kapelle - Michelangelos Meisterwerk',
                'Petersplatz mit Bernini-Kolonnaden'
            ]
        },
        'spanish-steps': {
            name: 'Spanische Treppe',
            attractions: [
                '135 Stufen zur Trinità dei Monti',
                'Via Condotti - Luxus-Einkaufsstraße',
                'Villa Borghese - einer der größten historischen Stadtparks Roms',
                'Fontana della Barcaccia'
            ]
        },
        'barberini': {
            name: 'Piazza Barberini',
            attractions: [
                'Trevi-Brunnen (5 Min. zu Fuß)',
                'Palazzo Barberini mit Caravaggio-Werken',
                'Via Veneto - berühmte Straße aus "La Dolce Vita"',
                'Quirinalspalast (Präsidentenpalast)'
            ]
        }
    };

    // Mobile navigation toggle functionality
    function initMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('nav-toggle--active');
            navMenu.classList.toggle('nav-menu--open');

            // Update aria-label for accessibility
            const isOpen = navMenu.classList.contains('nav-menu--open');
            navToggle.setAttribute('aria-label', isOpen ? 'Navigation schließen' : 'Navigation öffnen');
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('nav-toggle--active');
                navMenu.classList.remove('nav-menu--open');
                navToggle.setAttribute('aria-label', 'Navigation öffnen');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('nav-toggle--active');
                navMenu.classList.remove('nav-menu--open');
                navToggle.setAttribute('aria-label', 'Navigation öffnen');
            }
        });
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add active state
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }

    // Bus stop modal functionality
    function initBusStopModal() {
        const busStops = document.querySelectorAll('.bus-stop');
        const modal = document.getElementById('stop-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalAttractions = document.getElementById('modal-attractions');
        const closeBtn = document.querySelector('.modal-close');

        // Ensure modal exists
        if (!modal || !modalTitle || !modalAttractions || !closeBtn) {
            console.warn('Modal elements not found');
            return;
        }

        busStops.forEach(stop => {
            stop.addEventListener('click', function(e) {
                e.preventDefault();
                const stopKey = this.getAttribute('data-stop');
                const stopData = busStopData[stopKey];
                
                console.log('Bus stop clicked:', stopKey, stopData);
                
                if (stopData) {
                    modalTitle.textContent = stopData.name;
                    
                    // Create attractions list
                    const attractionsList = document.createElement('ul');
                    attractionsList.className = 'modal-attractions-list';
                    attractionsList.innerHTML = '';
                    
                    stopData.attractions.forEach(attraction => {
                        const listItem = document.createElement('li');
                        listItem.textContent = attraction;
                        attractionsList.appendChild(listItem);
                    });
                    
                    modalAttractions.innerHTML = '';
                    modalAttractions.appendChild(attractionsList);
                    
                    // Show modal
                    modal.classList.remove('hidden');
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal functionality
        function closeModal() {
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Attraction cards expand/collapse functionality
    function initAttractionCards() {
        const expandBtns = document.querySelectorAll('.expand-btn');
        
        expandBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.attraction-card');
                const details = card.querySelector('.attraction-details');
                
                if (!details) {
                    console.warn('Details element not found for card');
                    return;
                }
                
                const isExpanded = !details.classList.contains('hidden');
                
                if (isExpanded) {
                    // Collapse
                    details.classList.add('hidden');
                    this.textContent = 'Mehr erfahren';
                    this.classList.remove('btn--secondary');
                    this.classList.add('btn--primary');
                } else {
                    // Expand
                    details.classList.remove('hidden');
                    this.textContent = 'Weniger anzeigen';
                    this.classList.remove('btn--primary');
                    this.classList.add('btn--secondary');
                    
                    // Smooth scroll to show expanded content
                    setTimeout(() => {
                        const cardRect = card.getBoundingClientRect();
                        const detailsRect = details.getBoundingClientRect();
                        
                        // Check if details are partially out of view
                        if (detailsRect.bottom > window.innerHeight) {
                            details.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }
                    }, 100);
                }
            });
        });
    }

    // Personal photo interaction
    function initPersonalPhotoFeatures() {
        const photoFrame = document.querySelector('.photo-frame');
        const personalBadge = document.querySelector('.personal-badge');
        
        if (photoFrame) {
            // Add click interaction to photo
            photoFrame.addEventListener('click', function() {
                this.style.transform = 'rotate(0deg) scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'rotate(-1deg) scale(1)';
                }, 1000);
            });

            // Add subtle animation on scroll into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'rotate(-1deg) translateY(0)';
                    }
                });
            }, { threshold: 0.3 });

            photoFrame.style.opacity = '0';
            photoFrame.style.transform = 'rotate(-1deg) translateY(30px)';
            photoFrame.style.transition = 'all 0.8s ease';
            observer.observe(photoFrame);
        }

        if (personalBadge) {
            // Add hover effect to personal badge
            personalBadge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 4px 12px rgba(33, 128, 141, 0.3)';
            });

            personalBadge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'var(--shadow-sm)';
            });
        }
    }

    // Navbar background change on scroll
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;
        
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(19, 52, 59, 0.98)';
            } else {
                navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            }
            
            // Add special highlight when scrolling past personal experience
            const personalSection = document.getElementById('personal-experience');
            if (personalSection) {
                const rect = personalSection.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    navbar.style.borderBottom = '2px solid var(--color-primary)';
                } else {
                    navbar.style.borderBottom = 'none';
                }
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Add loading animation for images (placeholder functionality)
    function initImagePlaceholders() {
        // Since no actual images are provided, we'll add some placeholder styling
        const cards = document.querySelectorAll('.attraction-card, .overview-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('colosseum-special')) {
                    this.style.transform = 'translateY(-4px) scale(1.02)';
                } else {
                    // Special animation for Colosseum card
                    this.style.transform = 'translateY(-6px) scale(1.03)';
                    this.style.boxShadow = '0 8px 25px rgba(33, 128, 141, 0.2)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }

    // Timeline animation on scroll
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach((item, index) => {
            // Initial state
            item.style.opacity = '0';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            if (index % 2 === 0) {
                item.style.transform = 'translateX(-30px)';
            } else {
                item.style.transform = 'translateX(30px)';
            }
            
            observer.observe(item);
        });
    }

    // Add CSS for modal attractions list and other dynamic styles
    function addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .modal-attractions-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .modal-attractions-list li {
                padding: var(--space-8) 0;
                border-bottom: 1px solid var(--color-card-border-inner);
                color: var(--color-text-secondary);
                line-height: 1.5;
            }
            
            .modal-attractions-list li:last-child {
                border-bottom: none;
            }
            
            .modal-attractions-list li::before {
                content: '🏛️';
                margin-right: var(--space-8);
            }

            .modal-attractions-list li:contains('🍦')::before,
            .modal-attractions-list li[data-gelato="true"]::before {
                content: '🍦';
            }

            .nav-link.active {
                background: rgba(50, 184, 198, 0.3) !important;
                color: var(--color-teal-300) !important;
            }

            .bus-stop:hover {
                cursor: pointer;
                border-color: var(--color-primary) !important;
                background: var(--color-bg-1) !important;
            }

            .bus-stop:active {
                transform: translateY(-2px) scale(0.98) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll-triggered animations for cards
    function initScrollAnimations() {
        const cards = document.querySelectorAll('.overview-card, .attraction-card, .practical-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        cards.forEach((card, index) => {
            // Initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
            
            observer.observe(card);
        });
    }

    // Add Easter egg functionality
    function initEasterEggs() {
        let gelatoClickCount = 0;
        const personalBadge = document.querySelector('.personal-badge');
        
        if (personalBadge) {
            personalBadge.addEventListener('click', function() {
                gelatoClickCount++;
                
                if (gelatoClickCount === 1) {
                    this.innerHTML = '<span>🍦 Mmm, delizioso! 🍦</span>';
                } else if (gelatoClickCount === 3) {
                    this.innerHTML = '<span>🍦 Mama & Papa ❤️ Rom! 🍦</span>';
                    this.style.background = 'linear-gradient(45deg, #c0152f, #a84b2f)';
                } else if (gelatoClickCount === 5) {
                    this.style.animation = 'gelato-celebration 1s ease-in-out';
                    this.innerHTML = '<span>🎉 Grazie mille! 🎉</span>';
                    const celebrationStyle = document.createElement('style');
                    celebrationStyle.textContent = `@keyframes gelato-celebration {0%,100%{transform:scale(1) rotate(0deg);}25%{transform:scale(1.2) rotate(-5deg);}50%{transform:scale(1.3) rotate(5deg);}75%{transform:scale(1.2) rotate(-3deg);} }`;
                    document.head.appendChild(celebrationStyle);
                    setTimeout(() => {
                        this.style.animation = 'gentle-pulse 2s ease-in-out infinite';
                        this.innerHTML = '<span>🍦 Mama & Papas Gelato-Spot! 🍦</span>';
                    }, 2000);
                }
            });
        }
        console.log('🍦 Klickt aufs Gelato-Badge – kleine Überraschung für euch!');
    }

    // Add personalization touches
    function initPersonalization() {
        // Add subtle personalizations throughout the page
        const personalizedElements = document.querySelectorAll('h2, h3');
        
        personalizedElements.forEach((element, index) => {
            if (index % 7 === 0) { // Every 7th element
                element.innerHTML += ' 👀';
            }
        });

        // Add special message after some time
        setTimeout(() => {
            const experienceText = document.querySelector('.experience-text');
            if (experienceText && Math.random() < 0.3) {
                const loveMessage = document.createElement('div');
                loveMessage.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, var(--color-primary), var(--color-teal-400));
                    color: var(--color-btn-primary-text);
                    padding: 12px 16px;
                    border-radius: var(--radius-full);
                    font-size: var(--font-size-sm);
                    box-shadow: var(--shadow-lg);
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                `;
                loveMessage.textContent = '❤️ Buon viaggio – hab euch lieb, Mama & Papa!';
                document.body.appendChild(loveMessage);
                
                setTimeout(() => {
                    loveMessage.style.opacity = '1';
                }, 100);
                
                setTimeout(() => {
                    loveMessage.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(loveMessage)) {
                            document.body.removeChild(loveMessage);
                        }
                    }, 500);
                }, 4000);
            }
        }, 10000); // Show after 10 seconds
    }

    // Initialize all functionality
    function init() {
        console.log('🏛️ Initializing Rome Tour Guide...');
        
        addModalStyles(); // Add styles first
        initMobileNavigation(); // Add mobile navigation
        initSmoothScrolling();
        initBusStopModal();
        initAttractionCards();
        initPersonalPhotoFeatures();
        initNavbarScroll();
        initImagePlaceholders();
        initTimelineAnimation();
        initScrollAnimations();
        initEasterEggs();
        initPersonalization();
        
        // Add a special welcome message to console
        console.log('🏛️ Willkommen zur Big Bus Rom Tour! Für Mama & Papa – mit Liebe von eurem Sohn Tim & Anna-Lena ❤️');
        console.log('🍦 Euer Gelato-Moment am Kolosseum bleibt unvergesslich!');

        // Add loading complete class to body
        document.body.classList.add('loaded');
        
        console.log('✅ Rome Tour Guide fully loaded!');
    }

    // Run initialization
    init();

    // Add resize handler for responsive behavior
    window.addEventListener('resize', function() {
        // Recalculate any position-dependent elements
        const modal = document.getElementById('stop-modal');
        if (modal && !modal.classList.contains('hidden')) {
            // If modal is open, ensure it's still centered
            modal.style.display = 'flex';
        }
    });

    // Add print functionality
    window.addEventListener('beforeprint', function() {
        // Expand all attraction details for printing
        document.querySelectorAll('.attraction-details').forEach(detail => {
            detail.classList.remove('hidden');
        });
    });

    window.addEventListener('afterprint', function() {
        // Collapse attraction details after printing
        document.querySelectorAll('.expand-btn').forEach(btn => {
            if (btn.textContent === 'Weniger anzeigen') {
                btn.click();
            }
        });
    });
});

// Add some helper functions for potential future enhancements
window.RomeTourGuide = {
    showWelcomeMessage: function() {
        alert('Willkommen Mama & Papa! Viel Spaß auf eurer Rom-Tour – hab euch lieb! 🏛️❤️');
    },
    
    getCurrentTime: function() {
        return new Date().toLocaleTimeString('de-DE');
    },
    
    addToFavorites: function(attraction) {
        console.log(`${attraction} zu Favoriten hinzugefügt!`);
    },
    
    showGelatoMessage: function() {
        const message = 'Das war bestimmt das beste Gelato Roms! 🍦';
        alert(message);
        console.log(message);
    }
};

// Add special functionality for Colosseum section
document.addEventListener('click', function(e) {
    if (e.target.closest('.colosseum-special')) {
        const colosseumCard = e.target.closest('.colosseum-special');
        
        // Only add sparkle if it's not already there
        if (!colosseumCard.querySelector('.sparkle-effect')) {
            // Add temporary sparkle effect
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-effect';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 20px;
                animation: sparkle-fade 2s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            // Only add style if not already present
            if (!document.getElementById('sparkle-styles')) {
                const sparkleStyle = document.createElement('style');
                sparkleStyle.id = 'sparkle-styles';
                sparkleStyle.textContent = `
                    @keyframes sparkle-fade {
                        0% { opacity: 1; transform: scale(0.5) rotate(0deg); }
                        50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
                        100% { opacity: 0; transform: scale(0.8) rotate(360deg); }
                    }
                `;
                document.head.appendChild(sparkleStyle);
            }
            
            colosseumCard.style.position = 'relative';
            colosseumCard.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 2000);
        }
    }
});
