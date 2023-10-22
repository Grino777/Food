'use strict';

axios.defaults.baseURL = 'http://localhost:3000';

window.addEventListener('DOMContentLoaded', function () {
    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const endDate = '2023-09-27';

    function convertTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);

        return {
            time: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = convertTime(endtime);

            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.time <= 0) {
                clearInterval(timeInterval);

                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }

    setTimer('.timer', endDate);

    // Modal
    const btns = this.document.querySelectorAll('.btn'),
        modal = this.document.querySelector('.modal'),
        btnClose = modal.querySelector('.modal__close');

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        const btn = modal.querySelector('button');

        btn.addEventListener('click', sendRequest);
    }

    function sendRequest(event) {
        event.preventDefault();

        const form = modal.querySelector('form'),
            // dataForm = new FormData(form),
            dataForm = Object.fromEntries(new FormData(form).entries()),
            modalContent = modal.querySelector('.modal__content'),
            thanksModal = document.createElement('div');

        thanksModal.innerHTML = '<h2>Скоро мы свяжемся с вами.</h2>';

        postDataForm('http://localhost:3000/requests', dataForm)
            .then((response) => response.json())
            .then((result) => {
                form.remove();
                modalContent.append(thanksModal);

                console.log(result);

                setTimeout(() => {
                    closeModal();
                    event.target.removeEventListener('click', sendRequest);
                    thanksModal.remove();
                    modalContent.append(form);
                    form.reset();
                }, 3000);
            })
            .catch((err) => {});
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    btns.forEach((btn) => {
        btn.addEventListener('click', showModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === btnClose || event.target == modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (
            window.scrollY + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            showModal();
            document.removeEventListener('scroll', showModalByScroll);
        }
    }

    // const timer = setTimeout(showModal, 3000);
    document.addEventListener('scroll', showModalByScroll);

    // Menu
    class MenuItem {
        constructor(img_path, alt, title, descr, price) {
            this.img_path = img_path;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parrentSelector = document.querySelector('.menu .container');
            // this.parrentSelector = document.querySelector(parrentSelector);
        }

        render() {
            const elem = document.createElement('div');
            elem.innerHTML += `
            <div class="menu__item">
                <img src=${this.img_path} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parrentSelector.append(elem);
        }
    }

    async function getMenuItem(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`GET-запрос по адресу ${url} не отработал!`);
        }

        return await res.json();
    }

    async function postDataForm(url, data) {
        console.log(data);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return res;
    }

    // getMenuItem('http://localhost:3000/menu').then((data) => {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         new MenuItem(img, altimg, title, descr, price).render();
    //     });
    // });

    axios
        .get('http://localhost:3000/menu')
        .then((response) => response.data)
        .then((data) => {
            data.forEach((elem) => {
                const res = Object.values(elem);
                new MenuItem(...res).render();
            });
        });

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

    //Calculator

    let sex = 'female',
        height,
        weight,
        age,
        ratio = 1.375;

    const calcFields = this.document.querySelectorAll('.calculating__choose div'),
        calcRes = this.document.querySelector('.calculating__result span'),
        inputsData = this.document.querySelectorAll('.calculating__choose input');

    function getDivData(field) {
        if (field.dataset['ratio']) {
            ratio = +field.dataset['ratio'];
        } else {
            sex = field.dataset['sex'];
        }

        addActiveClass(field);
        calculate();
    }

    function getInputData(field) {
        switch (field.getAttribute('id')) {
            case 'height':
                height = +field.value;
                break;
            case 'weight':
                weight = +field.value;
                break;
            case 'age':
                age = +field.value;
                break;
        }

        calculate();
    }

    function addActiveClass(field) {
        field.classList.add('calculating__choose-item_active');
    }

    function removeActiveClass(pSelector) {
        const fields = pSelector.querySelectorAll('div');
        fields.forEach((field) => {
            field.classList.remove('calculating__choose-item_active');
        });
    }

    function calculate() {
        let total;
        if (!sex || !height || !weight || !age || !ratio) {
            total = '____';
        } else {
            if (sex == 'male') {
                total = Math.round(
                    (88.36 + 13.4 * +weight + 4.8 * +height - 5.7 * +age) * ratio
                );
            }
            if (sex == 'female') {
                total = Math.round(
                    (447.6 + 9.2 * +weight + 3.1 * +height - 4.3 * +age) * ratio
                );
            }
        }
        calcRes.textContent = total;
    }

    calculate();

    calcFields.forEach((field) => {
        field.addEventListener('click', (event) => {
            const target = event.target,
                pSelector = target.parentElement;

            removeActiveClass(pSelector);
            getDivData(target);
        });
    });

    inputsData.forEach((field) => {
        field.addEventListener('change', (event) => {
            getInputData(event.target);
        });
    });
});
