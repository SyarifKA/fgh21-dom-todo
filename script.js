const dataItem = document.getElementById('list-activity')

const btnAdd = document.getElementById('button-input')
const overlay = document.getElementsByClassName('overlay')
const form = overlay.item(0).getElementsByTagName('form').item(0)

overlay.item(0).addEventListener('click', () => {
    overlay.item(0).classList.toggle('hide')
})

btnAdd.addEventListener('click', () => {
    overlay.item(0).classList.toggle('hide')
})

form.addEventListener('click', (e)=> {
    e.stopPropagation()
})

const data = []

function renderData() {
    dataItem.innerHTML=''
    data.forEach((e, index) => {
        const listItem = document.createElement('li')
        const cb = document.createElement('input')
        cb.type = 'checkbox'
        cb.id = 'list' + `${index + 1}`
        if (e.finish) {
            cb.checked = true
        }
        
        listItem.appendChild(cb)
        const label = document.createElement('label')
        label.setAttribute('for', cb.id)
        
        const span1 = document.createElement('span')
        span1.textContent = e.text
        label.appendChild(span1)
        
        const span2 = document.createElement('span')
        const timeHours = new Date(e.time).getHours() > 12 ? new Date(e.time).getHours() - 12 + ':' + new Date(e.time).getMinutes() + ' PM' : new Date(e.time).getHours() + ":" + new Date(e.time).getMinutes() + ' AM'
        span2.textContent = timeHours
        label.appendChild(span2)
        
        listItem.appendChild(cb)
        listItem.appendChild(label)
        dataItem.appendChild(listItem)
    })
}

form.addEventListener('submit', event => {
    event.preventDefault()
    const text = event.target.text.value
    const timeStamp = new Date().getTime()
    data.push({
        text: text,
        time: timeStamp,
        finish: false,
    })
    form.reset()
    renderData()
})

renderData()