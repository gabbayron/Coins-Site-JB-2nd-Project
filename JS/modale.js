import { arrayForGraph } from './firstLoad.js'
export function createModal(arr) {
    let html = arr.map((val, index) => {
        return (
            `<div class="form-group">
        <div class="custom-control custom-checkbox">
        ${val}
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
        console.log(arrayToCheck)
        for (let i = 0; i < arrayToCheck.length; i++) {
            document.querySelector(`#${arrayToCheck[i]}`).nextElementSibling.childNodes[1].checked = false
            console.log(`${arrayToCheck[i]} changed to false`)
        }
        $('.modal').modal('hide')
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

export let arrayToCheck = []


export function MakeModalHtmlElement() {
    return (`<div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">You Have Selected More Then 5 Coins For Live Report.</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Only 5 Chosen Coins Are Allowed, Please Choose Your Action</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>`)



}