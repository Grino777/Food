'use strict';

import calc from './modules/calc';
import carousel from './modules/carousel';
import menu from './modules/menu';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', function () {
    axios.defaults.baseURL = 'http://localhost:3000';

    calc();
    carousel();
    menu();
    modal();
    slider();
    tabs();
    timer();
});
