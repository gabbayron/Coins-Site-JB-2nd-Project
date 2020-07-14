export function toLocalStorage(arr) {
    let data = []
    if(fromLoacalStorage() !== null) {
        data = fromLoacalStorage()
    }
    data.push(arr)
    localStorage.setItem('more-info',JSON.stringify(data))
}

export function fromLoacalStorage () {
    let temp = localStorage.getItem('more-info')
    let data = JSON.parse(temp)
    return data
}