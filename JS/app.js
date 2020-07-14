import {firstLoad} from './firstLoad.js'
import { callData } from './ajax.js';

window.onload = function () {
        callData('https://api.coingecko.com/api/v3/coins/list', firstLoad);
    };

