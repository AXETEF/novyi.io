const slides = document.querySelectorAll('.page');
const progressBars = document.querySelectorAll('.progress-bar-inner');
let currentSlide = 0;
const slideInterval = 8000; // 3 секунды
let interval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateProgressBar(index);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function updateProgressBar(index) {
    progressBars.forEach((bar, i) => {
        if (i < index) {
            // Предыдущие слайды полностью заполнены
            bar.style.transition = 'none';
            bar.style.width = '100%';
        } else if (i === index) {
            // Текущий слайд заполняется
            bar.style.transition = `width ${slideInterval}ms linear`;
            bar.style.width = '100%';
        } else {
            // Остальные слайды сбрасываются
            bar.style.transition = 'none';
            bar.style.width = '0';
        }
    });
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, slideInterval);
    updateProgressBar(currentSlide);
}

document.getElementById('right-arrow').addEventListener('click', () => {
    nextSlide();
    resetInterval(); // Сбрасываем интервал при ручном переключении
});

document.getElementById('left-arrow').addEventListener('click', () => {
    prevSlide();
    resetInterval(); // Сбрасываем интервал при ручном переключении
});

// Инициализация автоматической прокрутки
interval = setInterval(nextSlide, slideInterval);
updateProgressBar(currentSlide);