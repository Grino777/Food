function slider() {
    // Update Slider 2

    const data = axios
            .get('/slider_imgs')
            .then((response) => response.data)
            .catch((err) => console.error(err.message)),
        quantity = data.then((data) => data.length),
        slidesField = document.querySelector('.offer__slider-inner'),
        wrapper = document.querySelector('.offer__slider-wrapper'),
        width = Number.parseInt(window.getComputedStyle(wrapper).width),
        next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let offset = 0,
        counter = 1;

    function createSliderElement(data) {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('offer__slide');
        imgDiv.setAttribute('data-num', `${data.id + 1}`);
        imgDiv.style.width = width + 'px';
        imgDiv.innerHTML = `<img src="${data.img}" alt="${data.alt}" />`;
        slidesField.append(imgDiv);
    }

    async function addSlidesOnPage(data) {
        const slides = await data;
        slides.forEach((elem) => createSliderElement(elem));
    }

    const checkDigit = async (digit) => {
        let checkDigit = await digit;
        if (checkDigit < 10) {
            return `0${checkDigit}`;
        } else {
            return checkDigit;
        }
    };

    const showSliderCounter = async () => {
        total.textContent = await checkDigit(quantity);
        current.textContent = await checkDigit(counter);
        highlightIndicator(counter);
    };

    const setSlideField = async () => {
        slidesField.style.width = 100 * (await quantity) + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
        wrapper.style.overflow = 'hidden';
    };

    next.addEventListener('click', async () => {
        if (
            offset > -((await quantity) * width) &&
            offset <= 0 &&
            counter < (await quantity)
        ) {
            offset -= width;
            counter += 1;
        } else if ((await quantity) == counter) {
            offset = 0;
            counter = 1;
        }
        current.textContent = await checkDigit(counter);
        slidesField.style.transform = `translateX(${offset}px)`;
        highlightIndicator(counter);
    });

    prev.addEventListener('click', async () => {
        if (offset == 0) {
            offset = -((await quantity) * width) + width;
            counter = await quantity;
        } else {
            offset += width;
            counter -= 1;
        }
        current.textContent = await checkDigit(counter);
        slidesField.style.transform = `translateX(${offset}px)`;
        highlightIndicator(counter);
    });

    showSliderCounter();
    addSlidesOnPage(data);
    setSlideField();

}

module.exports = slider;