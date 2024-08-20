const dataItem = document.getElementById('list-activity')

const btnAdd = document.getElementById('button-input')
const overlay = document.getElementsByClassName('overlay')
const form = overlay.item(0).getElementsByTagName('form').item(0)
const deleteItem = document.getElementById('button-delete')
const autoInput = document.getElementById('text-input')
const btnSave = document.getElementById('save')

btnSave.addEventListener('click', () => {
    overlay.item(0).classList.toggle('hide')
})

overlay.item(0).addEventListener('click', () => {
    overlay.item(0).classList.toggle('hide')
})

btnAdd.addEventListener('click', () => {
    overlay.item(0).classList.toggle('hide')
    autoInput.focus()
})


form.addEventListener('click', (e)=> {
    e.stopPropagation()
})

deleteItem.addEventListener('click', () => {
    window.localStorage.removeItem('abc')
    window.location.reload()
})

let data = []

const dataConv = localStorage.getItem('abc')

if (dataConv !== null) {
    data = JSON.parse(dataConv)
}


function renderData() {
    dataItem.innerHTML=''
    data.forEach((e, index) => {
        const listItem = document.createElement('li')
        const cb = document.createElement('input')
        cb.type = 'checkbox'
        cb.classList.add('checkbox') 
        cb.setAttribute('name', 'checkbox') 
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
        
        const editBtn = document.createElement('button')
        editBtn.id = 'edit-button'
        editBtn.textContent = 'Edit'
        editBtn.classList.add('edit-button')
        
        if (span1.textContent !== '') {
            listItem.appendChild(cb)
            listItem.appendChild(label)
            listItem.appendChild(editBtn)
            dataItem.appendChild(listItem)
        }
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

    if (text === '') {
        window.alert('data harus diisi')
    } else {
        window.localStorage.setItem('abc', JSON.stringify(data))
    }
    autoInput.focus()
    form.reset()
    renderData()
})

renderData()
// const abc = document.getElementsByName('checkbox').item(0)
// console.log(abc)
// abc.forEach(event => {
//     console.log(name)
// })
// console.log(abc.item(0))