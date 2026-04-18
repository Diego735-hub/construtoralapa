const galleries = document.querySelectorAll('.card-galeria');

galleries.forEach((gallery) => {
    const images = Array.from(gallery.querySelectorAll('.galeria-imagem'));
    const previousButton = gallery.querySelector('.galeria-btn-anterior');
    const nextButton = gallery.querySelector('.galeria-btn-proxima');
    const indicatorsContainer = gallery.querySelector('.galeria-indicadores');

    if (!images.length || !previousButton || !nextButton || !indicatorsContainer) {
        return;
    }

    let currentIndex = images.findIndex((image) => image.classList.contains('ativa'));
    if (currentIndex < 0) {
        currentIndex = 0;
        images[0].classList.add('ativa');
    }

    const indicators = images.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'galeria-indicador';
        dot.setAttribute('aria-label', `Ir para imagem ${index + 1}`);
        dot.addEventListener('click', () => updateGallery(index));
        indicatorsContainer.appendChild(dot);
        return dot;
    });

    function updateGallery(index) {
        images[currentIndex].classList.remove('ativa');
        indicators[currentIndex].classList.remove('ativo');

        currentIndex = index;

        images[currentIndex].classList.add('ativa');
        indicators[currentIndex].classList.add('ativo');
    }

    function showNext() {
        const nextIndex = (currentIndex + 1) % images.length;
        updateGallery(nextIndex);
    }

    function showPrevious() {
        const previousIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery(previousIndex);
    }

    previousButton.addEventListener('click', showPrevious);
    nextButton.addEventListener('click', showNext);

    gallery.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            showNext();
        }

        if (event.key === 'ArrowLeft') {
            showPrevious();
        }
    });

    gallery.setAttribute('tabindex', '0');
    indicators[currentIndex].classList.add('ativo');
});
