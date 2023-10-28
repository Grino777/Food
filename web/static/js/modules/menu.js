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

export default menu;
