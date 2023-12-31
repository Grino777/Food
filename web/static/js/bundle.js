/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //Calculator

    let sex = 'female',
        height,
        weight,
        age,
        ratio = 1.375;

    const calcFields = document.querySelectorAll('.calculating__choose div'),
        calcRes = document.querySelector('.calculating__result span'),
        inputsData = document.querySelectorAll('.calculating__choose input');

    function getDivData(field) {
        if (field.dataset['ratio']) {
            ratio = +field.dataset['ratio'];
        } else {
            sex = field.dataset['sex'];
        }

        addActiveClass(field);
        calculate();
    }

    function checkInputValue(field) {
        if (field.value.match(/\D/g)) {
            field.style.border = '1px solid red';
        } else {
            field.style.border = 'none';
            return +field.value;
        }
    }

    function getInputData(field) {
        switch (field.getAttribute('id')) {
            case 'height':
                height = checkInputValue(field);
                break;
            case 'weight':
                weight = checkInputValue(field);
                break;
            case 'age':
                age = checkInputValue(field);
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/carousel.js":
/*!********************************!*\
  !*** ./js/modules/carousel.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (carousel);


/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu() {
    // Menu
    class MenuItem {
        constructor(img_path, alt, title, descr, price) {
            this.img_path = img_path;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parrentSelector = document.querySelector('.menu .container');
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

    axios
        .get('http://localhost:3000/menu')
        .then((response) => response.data)
        .then((data) => {
            data.forEach((elem) => {
                const res = Object.values(elem);
                new MenuItem(...res).render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
    // Modal
    const btns = document.querySelectorAll('.btn'),
        modal = document.querySelector('.modal'),
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/carousel */ "./js/modules/carousel.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', function () {
    axios.defaults.baseURL = 'http://localhost:3000';

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_carousel__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map