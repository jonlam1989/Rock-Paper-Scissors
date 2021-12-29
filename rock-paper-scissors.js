let rock = document.querySelector('#rock')
let paper = document.querySelector('#paper')
let scissors = document.querySelector('#scissors')
let msg = document.querySelector('#message')

const imgArr = [rock, paper, scissors];

for (let el of imgArr) {
    el.addEventListener('mousedown', ()=>{
        el.style.transition = '0.2s'
        el.style.transform = 'translate(5px, -5px'
    })
    el.addEventListener('mouseup', ()=>{
        el.style.transform = 'translate(-5px, 5px)'
    })
}
