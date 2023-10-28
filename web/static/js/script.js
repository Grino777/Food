'use strict';

axios.defaults.baseURL = 'http://localhost:3000';

window.addEventListener('DOMContentLoaded', function () {
    const calc = require('./modules/calc'),
        carousel = require('./modules/carousel'),
        menu = require('./modules/menu'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        timer = require('./modules/timer');

    calc();
    carousel();
    menu();
    modal();
    slider();
    tabs();
    timer();
});
