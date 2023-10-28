function modal() {
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
}

module.exports = modal;
