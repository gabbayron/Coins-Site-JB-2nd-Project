import { collapse } from './collapse.js';
import { createCard, showMoreInfo, clearInfo } from './ui.js'
import { makeGraph, createCanvasElement } from './graph.js';
import { createModal, arrayIfCloseFromModale } from './modale.js'
import { callData } from './ajax.js';
import { searchCoin, showAllDiv } from './searchBar.js'
import { removeFromLocalStorage, fromLocalStorage } from './localStorge.js'

export function firstLoad() {
    // let data = [];
    let coins = [];
    coins = this.response;
    // coins = data.filter(function (val, index) {
    //     if (index < 100) {
    //         return val;
    //     }
    // });
    createCard(coins);
    collapse()
    let coinsID = coins.map((val) => val.id);
    document.querySelector('#wrap').addEventListener('click',function (e) {
        //CHECK IF MORE INFO HAVE BEEN CALLED ALREADY  
        if (coinsID.includes(e.target.id) === true) {
            e.preventDefault()
            if (e.target.parentElement.childNodes[3].innerText === '') {
                // !fromLocalStorage(e.target.id) // incase localStorage
                let id = e.target.id;
                let url = `https://api.coingecko.com/api/v3/coins/${id}`;
                callData(url, showMoreInfo);
                setTimeout(() => clearInfo(e.target.parentElement.childNodes[3]), 120000) // cleared more-info div after 2 minutes
                // setTimeout(() => removeFromLocalStorage(e.target.id), 120000)  // clear LocalStorage after 2 minutes 
            }
        }
    });

    // Add coins for graph array
    document.body.querySelector('#wrap').onclick = function (e) {
        if (e.target.nodeName === 'INPUT') {
            if (arrayForGraph.includes(e.target.dataset.coin)) {
                arrayForGraph = arrayForGraph.filter(coin => coin !== e.target.dataset.coin)
                e.target.checked = false
            }
            else if ((arrayForGraph.length < 5 && (!arrayForGraph.includes(e.target.dataset.coin)) && e.target.checked === true)) {
                arrayForGraph.push(e.target.dataset.coin)
                e.target.checked = true
            }
            else if (arrayForGraph.length >= 5) {
                document.getElementById(e.target.id).checked = false //prevent from clickin 6th time
                createModal(arrayForGraph)
                $(".modal").modal("show")
            }
        }
    }
}

document.querySelector('.modal-footer').onclick = function (e) {
    if (e.target.textContent === 'Close') {
        arrayForGraph = arrayIfCloseFromModale
    }
}
document.querySelector('nav').addEventListener('click', function (e) {
    if (e.target.textContent === 'Live Reports') {
        if (arrayForGraph.length === 0) {
            alert('Please Pick At Least 1 Coin For Live Report Option')
        }
        if (arrayForGraph.length >= 1) {
            // contentHtml = document.querySelector('#content').innerHTML // incase LocalStorage
            document.querySelector('#content').style.display = 'none' // hide coins div
            document.querySelector('#chartContainer').style.display = 'block'
            let url = arrayForGraph.join()
            createCanvasElement(arrayForGraph)
            callData(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${url}&tsyms=USD`, makeGraph)
            graphInterval = setInterval(function () { callData(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${url}&tsyms=USD`, makeGraph) }, 2000)
        }
    }
    if (e.target.textContent === 'Home') {
        document.querySelector('#content').style.display = 'flex'
        document.querySelector('#chartContainer').style.display = 'none'
        showAllDiv() //incase someone still have the results on search bar
        clearInterval(graphInterval) // clear graph drawing
        
        // ----- old version ------ //
        // arrayForGraph = []
        // content.innerHTML = ''
        // callData('https://api.coingecko.com/api/v3/coins', firstLoad);
        // document.querySelector('#content').innerHTML = contentHtml // incase...
    }
    if (e.target.textContent === 'Search') {
        searchCoin(e)
    }
})

export let arrayForGraph = []
let graphInterval;
let contentHtml ;
