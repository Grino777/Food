'use strict';

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
            dataForm = new FormData(form),
            modalContent = modal.querySelector('.modal__content'),
            thanksModal = document.createElement('div');

        thanksModal.innerHTML = '<h2>Скоро мы свяжемся с вами.</h2>';

        fetch('/form', {
            method: 'POST',
            body: dataForm,
        })
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
        constructor(img_path, alt, title, descr, price, parrentSelector) {
            this.img_path = img_path;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parrentSelector = document.querySelector(parrentSelector);
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

    const myObj = {
        obj1: {
            img_path: 'img/tabs/vegy.jpg',
            alt: 'vegy',
            title: 'Меню "Фитнес"',
            descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            price: 229,
            parrentSelector: '.menu .container',
        },
        obj2: {
            img_path: 'img/tabs/elite.jpg',
            alt: 'elite',
            title: 'Меню “Премиум”',
            descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            price: 550,
            parrentSelector: '.menu .container',
        },
        obj3: {
            img_path: 'img/tabs/post.jpg',
            alt: 'post',
            title: 'Меню "Постное"',
            descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            price: 430,
            parrentSelector: '.menu .container',
        },
    };

    for (let i in myObj) {
        const item = Object.values(myObj[i]);
        new MenuItem(...item).render();
    }
});
