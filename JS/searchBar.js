
export function searchCoin(e) {
    e.preventDefault()
    let CoinsId;
    let input = document.querySelector('#searchInput').value.toUpperCase()
    document.querySelectorAll('.card-header').forEach(function (val) {
        if (input === val.innerHTML) {
            CoinsId = val.innerHTML
            hideAllDiv(CoinsId)
        }
        if(input === '') {
            showAllDiv()
        }
    })
}

function hideAllDiv(id) {
    let allDivs = document.querySelectorAll('.card')
    for (var i = 0; i < allDivs.length; i++) {
        if (allDivs[i].firstElementChild.innerHTML === id) {
            console.log('shown')
            allDivs[i].style.display = "flex"
        }
        else {
            allDivs[i].style.display = "none"
        }
    }
}

export function showAllDiv() {
    let allDivs = document.querySelectorAll('.card')
    for (var i = 0; i < allDivs.length; i++) {
        allDivs[i].style.display = "flex"
    }
}
