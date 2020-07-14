import { collapse } from './collapse.js';
import { createCard, showMoreInfo } from './ui.js'
import { makeGraph, createCanvasElement } from './graph.js';
import { callData } from './ajax.js';

export function firstLoad() {
    let data = [];
    let coins = [];
    data = this.response;
    coins = data.filter(function (val, index) {
        if (index < 100) {
            return val;
        }
    });
    createCard(coins);
    collapse()
    let coinsID = coins.map((val) => val.id);
    const items = document.querySelector('.items');
    items.addEventListener('click', function (e) {
        if (coinsID.includes(e.target.id) === true) {
            e.preventDefault()
            let id = e.target.id;
            let url = `https://api.coingecko.com/api/v3/coins/${id}`;
            callData(url, showMoreInfo);
        }
    });
    // Add coins for graph array
    items.addEventListener('click', function (e) {
        if (e.target.nodeName === 'INPUT') {
            if (arrayForGraph.length < 5 && (!arrayForGraph.includes(e.target.dataset.coin))) {
                arrayForGraph.push(e.target.dataset.coin)
                console.log('pushed')
            }
            else if (arrayForGraph.length === 5) {
                alert('שווה 5')
            }
            else if (arrayForGraph.includes(e.target.dataset.coin)) {
                arrayForGraph = arrayForGraph.filter(coin => coin !== e.target.dataset.coin)
                console.log('filtered')
            }
        }
    })
}

document.querySelector('nav').addEventListener('click', function (e) {

    if (e.target.textContent === 'Live Reports') {
        let url = arrayForGraph.join()
        createCanvasElement(arrayForGraph)
        callData(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${url}&tsyms=USD`, makeGraph)
        interval = setInterval(function () { callData(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${url}&tsyms=USD`, makeGraph) }, 2000)
        arrayForGraph = []
    }
    if (e.target.textContent === 'Home') {
        clearInterval(interval)
        content.innerHTML = ''
        callData('https://api.coingecko.com/api/v3/coins/list', firstLoad);
    }
})

let arrayForGraph = []
let interval;