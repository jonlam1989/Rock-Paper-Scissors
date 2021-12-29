//animate text to display one letter at a time
//resources:
//     https://stackoverflow.com/questions/29335435/javascript-writing-out-one-letter-at-a-time
//     https://stackoverflow.com/questions/43187870/efficient-way-of-executing-2-functions-one-after-another-in-javascript/43187893
let instructionText = 'Defeat the Machine in a best of 5 games!'
let msgText = 'GAME START...'
let instructions = document.querySelector('#gameInstructions')
let msg = document.querySelector('#message')

function printOut(text, container) {
    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        setTimeout(appendLetter, 40*i, char, container)
    }
}

function appendLetter(char, container) {
    if (char) {
        container.innerHTML += char
    }
}

//display one message at a time
function one(callback) {
    printOut(instructionText, instructions)
    setTimeout(callback, 2000)
}

function two() {
    printOut(msgText, msg)
}

one(two)

//image animation 
let rock = document.querySelector('#rock')
let paper = document.querySelector('#paper')
let scissors = document.querySelector('#scissors')
const imgArr = [rock, paper, scissors];

for (let el of imgArr) {
    el.addEventListener('mousedown', ()=>{
        el.style.transition = '0.2s'
        el.style.transform = 'translate(5px, -5px)'
    })
    el.addEventListener('mouseup', ()=>{
        el.style.transform = 'translate(-5px, 5px)'
    })
}
