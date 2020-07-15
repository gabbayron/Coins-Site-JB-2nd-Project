import { collapse } from './collapse.js';
import { createCard, showMoreInfo } from './ui.js'
import { makeGraph, createCanvasElement } from './graph.js';
import { createModal, MakeModalHtmlElement } from './modale.js'
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
        //CHECK IF MORE INFO HAVE BEEN CALLED ALREADY  
        if (coinsID.includes(e.target.id) === true) {
            e.preventDefault()
            if (e.target.parentElement.childNodes[3].innerText === '') {
                let id = e.target.id;
                let url = `https://api.coingecko.com/api/v3/coins/${id}`;
                callData(url, showMoreInfo);
            }
        }
    });

    // Add coins for graph array
    document.body.querySelector('#wrap').onclick = function (e) {
        if (e.target.nodeName === 'INPUT') {
            if (arrayForGraph.includes(e.target.dataset.coin)) {
                arrayForGraph = arrayForGraph.filter(coin => coin !== e.target.dataset.coin)
                e.target.checked = false
                console.log('fil')
            }
            else if (arrayForGraph.length < 5 && (!arrayForGraph.includes(e.target.dataset.coin))) {
                arrayForGraph.push(e.target.dataset.coin)
                e.target.checked = true
                console.log('pus')
            }
            else if (arrayForGraph.length === 5) {
                document.getElementById(e.target.id).checked = false //prevent from clickin 6th time
                createModal(arrayForGraph)
                $(".modal").modal("show")
            }
        }
    }
}

document.querySelector('nav').addEventListener('click', function (e) {
    if (e.target.textContent === 'Live Reports') {
        if (arrayForGraph.length === 0) {
            alert('Please Pick At Least 1 Coin For Live Report Option')
        }
        if (arrayForGraph.length >= 1) {
            console.log(arrayForGraph)
            let url = arrayForGraph.join()
            createCanvasElement(arrayForGraph)
            callData(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${url}&tsyms=USD`, makeGraph)
            interval = setInterval(function () { callData(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${url}&tsyms=USD`, makeGraph) }, 2000)
            arrayForGraph = []
        }
    }
    if (e.target.textContent === 'Home') {
        clearInterval(interval)
        content.innerHTML = ''
        // content.innerHTML = MakeModalHtmlElement()
        callData('https://api.coingecko.com/api/v3/coins', firstLoad);
    }
})

export let arrayForGraph = []
let interval;