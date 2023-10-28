function carousel() {
    //Slider Carousel

    function createSliderCarousel() {
        const carousel = document.createElement('ol'),
            offerSlider = document.querySelector('.offer__slider');

        offerSlider.style.position = 'relative';
        carousel.classList.add('carousel-indicators');
        offerSlider.append(carousel);
    }

    async function addSliderIndicators() {
        for (let i = 0; i < (await quantity); i++) {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dot.setAttribute('data-number', i + 1);

            dot.addEventListener('click', (event) => {
                const target = event.target,
                    number = +target.getAttribute('data-number');

                highlightIndicator(number);
            });

            document.querySelector('.carousel-indicators').append(dot);
        }
    }

    function removeHighlight() {
        const indicators = document.querySelectorAll(`[data-number]`);
        indicators.forEach((indicator) => {
            indicator.classList.remove('highlight');
        });
    }

    async function highlightIndicator(slideNumber) {
        removeHighlight();
        const indicator = document.querySelector(`[data-number="${slideNumber}"]`);
        indicator.classList.add('highlight');

        offset = -((slideNumber - 1) * width);
        counter = slideNumber;
        current.textContent = await checkDigit(slideNumber);
        slidesField.style.transform = `translateX(${offset}px)`;
    }

    createSliderCarousel();
    addSliderIndicators();
}

export default carousel;
