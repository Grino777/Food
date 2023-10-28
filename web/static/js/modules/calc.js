function calc() {
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

module.exports = calc;
