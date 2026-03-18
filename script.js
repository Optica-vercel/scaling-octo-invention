/**
 * THE ARCHIVE - Bookstore Landing Page Logic
 * Senior Frontend Developer Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration & DOM Elements ---
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    const navbar = document.getElementById('navbar');
    const heroBook = document.getElementById('heroBook');
    const heroSection = document.getElementById('hero');
    const bookGrid = document.getElementById('bookGrid');

    // State for cursor smoothing
    let mouseX = 0, mouseY = 0;     // Actual mouse position
    let cursorX = 0, cursorY = 0;   // Delayed position for the ring

    // --- 1. High-Performance Custom Cursor ---
    
    // Update target coordinates on mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate position for the inner dot
        cursorInner.style.left = `${mouseX}px`;
        cursorInner.style.top = `${mouseY}px`;
    });

    /**
     * smoothing function using requestAnimationFrame
     * This ensures the "lag" effect is fluid at 60fps+
     */
    const animateCursor = () => {
        // Linear Interpolation (Lerp) for the "lag" effect
        // 0.15 controls the smoothness (lower = slower/smoother)
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        // Offset by 15px to center the 30px ring
        cursorOuter.style.left = `${cursorX - 15}px`;
        cursorOuter.style.top = `${cursorY - 15}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    /**
     * Cursor Interaction Logic
     * Attaches hover effects to all interactive elements
     */
    const attachCursorHoverListeners = (elements) => {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOuter.classList.add('cursor-grow');
                cursorInner.style.background = '#f0ebd8'; // Turn cream on hover
            });
            el.addEventListener('mouseleave', () => {
                cursorOuter.classList.remove('cursor-grow');
                cursorInner.style.background = '#c5a059'; // Return to gold
            });
        });
    };

    // Initial attachment for static elements
    const staticInteractives = document.querySelectorAll('a, button, .search-bar, .social-icons i');
    attachCursorHoverListeners(staticInteractives);


    // --- 2. 3D Interactive Hero Book ---

    heroSection.addEventListener('mousemove', (e) => {
        // Calculate rotation based on mouse position relative to center
        // Dividing by larger numbers makes the tilt more subtle/elegant
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        // Apply transformation while maintaining base 3D orientation
        heroBook.style.transform = `rotateY(${xAxis - 20}deg) rotateX(${yAxis + 10}deg)`;
        
        // Disable the auto-floating animation during manual interaction
        heroBook.style.animation = 'none';
    });

    // Reset book position and resume animation on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        heroBook.style.transition = 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        heroBook.style.transform = `rotateY(-20deg) rotateX(10deg)`;
        
        setTimeout(() => {
            heroBook.style.animation = 'float 4s ease-in-out infinite';
            heroBook.style.transition = 'transform 0.2s ease-out'; // Reset transition speed
        }, 600);
    });


    // --- 3. Sticky Glassmorphism Navbar ---

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 4. Dynamic Gallery Generation ---

    const bookData = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" },
        { title: "Diary of a wimpy kid", author: "Carlos Ruiz Zafón", img: "image/image.jpg" },
        { title: "Meditations", author: "Marcus Aurelius", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" },
        { title: "Sherlock Holmes", author: "Arthur Conan Doyle", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400" }
    ];

    /**
     * Create 16 cards (looping through sample data)
     */
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 16; i++) {
        const book = bookData[i % bookData.length];
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.img}" alt="${book.title}" loading="lazy">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <div class="quick-view">Quick View</div>
        `;
        
        fragment.appendChild(card);
    }
    
    bookGrid.appendChild(fragment);

    // Attach cursor listeners to the newly created book cards
    const dynamicCards = document.querySelectorAll('.book-card');
    attachCursorHoverListeners(dynamicCards);


    // --- 5. Smooth Scroll for Navigation ---
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Account for sticky nav height
                    behavior: 'smooth'
                });
            }
        });
    });
});