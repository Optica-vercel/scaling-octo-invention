document.addEventListener('DOMContentLoaded', () => {
    const genreGrid = document.getElementById('genreGrid');
    const genreItems = document.querySelectorAll('.genre-item');
    const titleElement = document.getElementById('activeGenreTitle');
    const descElement = document.getElementById('genreDescription');

    // Sample Data with Categories
    const libraryData = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "classic", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400" },
        { title: "Meditations", author: "Marcus Aurelius", category: "philosophy", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400" },
        { title: "The Raven", author: "Edgar Allan Poe", category: "poetry", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400" },
        { title: "Beyond Good and Evil", author: "Friedrich Nietzsche", category: "philosophy", img: "images/beyond_good_and_evil.jpg" },
        { title: "The Big Sleep", author: "Raymond Chandler", category: "mystery", img: "https://images.unsplash.com/photo-1587876947083-5c1eb40cf928?q=80&w=400" },
        { title: "The Iliad", author: "Homer", category: "classic", img: "https://images.unsplash.com/photo-1621351123083-b8aefca8202d?q=80&w=400" }
    ];

    const genreInfo = {
        all: "Exploring the full breadth of the Archive's rare acquisitions.",
        classic: "Timeless narratives that have shaped the literary world.",
        philosophy: "Profound inquiries into the nature of existence and ethics.",
        mystery: "Enigmatic cases and shadowed corridors of the mind.",
        poetry: "The rhythmic heartbeat of human emotion and verse.",
        history: "Documenting the rise and fall of civilizations."
    };

    /**
     * Render Books based on filter
     */
    function renderGenre(filter = 'all') {
        genreGrid.innerHTML = ''; // Clear grid
        
        const filteredBooks = filter === 'all' 
            ? libraryData 
            : libraryData.filter(book => book.category === filter);

        filteredBooks.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <img src="${book.img}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <div class="quick-view">View Details</div>
            `;
            genreGrid.appendChild(card);
        });

        // Update Text
        titleElement.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
        descElement.textContent = genreInfo[filter];
    }

    /**
     * Sidebar Click Interaction
     */
    genreItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update Active State
            genreItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Filter
            const selectedGenre = item.getAttribute('data-genre');
            renderGenre(selectedGenre);
        });
    });

    // --- REUSE CURSOR LOGIC ---
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorInner.style.left = `${mouseX}px`;
        cursorInner.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursorOuter.style.left = `${cursorX - 15}px`;
        cursorOuter.style.top = `${cursorY - 15}px`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Initial Load
    renderGenre('all');
});