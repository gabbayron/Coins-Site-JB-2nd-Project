import {arrayForGraph} from './firstLoad.js'

export function createModal(arr) {
    let html = arr.map((val, index) => {
        return (
            `<div class="form-group">
        <div class="custom-control custom-checkbox">
        Coin Number ${index +1} :  ${val}
          <input type="checkbox" class="custom-control-input" data-coin=${val} id="customCheck${index}" checked="">
          <label class="custom-control-label" data-coin=${val} for="customCheck${index}"></label>
        </div><br>` )
    }).join('')
    document.querySelector('.modal-body').innerHTML = html
}

document.querySelector('.modal-footer').addEventListener('click', clearCheckBox)
document.querySelector('.modal-body').addEventListener('click', makeFilterArray)

function clearCheckBox(e) {
    if (e.target.textContent === 'Save Changes') {
        for (let i = 0; i < arrayToCheck.length; i++) {
            document.querySelector(`#${arrayToCheck[i]}`).nextElementSibling.childNodes[1].checked = false
        }
        $('.modal').modal('hide')
        arrayToCheck = []
    }
    if (e.target.textContent ==='Close') {
        arrayIfCloseFromModale = arrayForGraph.concat(arrayToCheck)
        arrayToCheck = []
    }
}

function makeFilterArray(e) {
    if (e.target.nodeName === 'INPUT')
        if (!arrayToCheck.includes(e.target.dataset.coin)) {
            arrayToCheck.push(e.target.dataset.coin)
        }
        else if (arrayToCheck.includes(e.target.dataset.coin)) {
            arrayToCheck = arrayToCheck.filter(coin => coin !== e.target.dataset.coin)
        }
}

 let arrayToCheck = []
export let arrayIfCloseFromModale = []
