let rock = document.querySelector('#rock')
let paper = document.querySelector('#paper')
let scissors = document.querySelector('#scissors')
let instructions = document.querySelector('#gameInstructions')
let msg = document.querySelector('#message')
let humanScoreContainer = document.querySelector('#humanScore')
let machineScoreContainer = document.querySelector('#machineScore')
let humanImgContainer = document.querySelector('#humanImg')
let machineImgContainer = document.querySelector('#machineImg')

//animate text to display one letter at a time
//resources:
//     https://stackoverflow.com/questions/29335435/javascript-writing-out-one-letter-at-a-time
//     https://stackoverflow.com/questions/43187870/efficient-way-of-executing-2-functions-one-after-another-in-javascript/43187893
let instructionText = 'Defeat the Machine in a best of 5 games!'
let msgText = 'GAME START...'

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
//resources:
    // https://stackoverflow.com/questions/48142511/how-do-i-fade-out-a-div-using-pure-javascript
function one(callback) {
    printOut(instructionText, instructions)
    setTimeout(callback, 2000)
    setTimeout(()=>{
        msg.style.transition = '1s'
        msg.style.opacity = '0'
        msg.style.visibility = 'hidden'
    }, 4000)
    setTimeout(()=>{
        instructions.style.transition = '1s'
        instructions.style.opacity = '0'
        instructions.style.visibility = 'hidden'
    }, 5000)
}

function two() {
    printOut(msgText, msg)
}

one(two)

//animate images
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

// -----------------------------------------------------------------------------

let humanHand = ''
let humanScore = 0
let machineHand = ''
let machineScore = 0

//generate random hand for computer
const hand = ['rock', 'paper', 'scissors']
function computerHand() {
    let randomIdx = Math.floor(Math.random()*hand.length)
    return hand[randomIdx]
}

//main game logic
for (let el of imgArr) {
    el.addEventListener('click', ()=>{
        machineHand = computerHand()
        machineImgContainer.src = `resources/${machineHand}.png`
        machineImgContainer.alt = `${machineHand}`
        machineImgContainer.style.visibility = 'visible'

        humanHand = el.firstElementChild[attribute='alt']
        humanImgContainer.src = `resources/${humanHand}.png`
        humanImgContainer.alt = `${humanHand}`
        humanImgContainer.style.visibility = 'visible'
        
        compareHand(machineHand, humanHand)
        isGameOver()
    })
}

//check for a winner / or a tie
function compareHand(machineHand, humanHand) {
    if (machineHand === humanHand) {
        setTimeout(()=>{
            machineImgContainer.style.transition = `0.3s`
            humanImgContainer.style.transition = `0.3s`
            machineImgContainer.style.visibility = 'hidden'
            humanImgContainer.style.visibility = 'hidden'
        }, 900)
        displayMsg("It's a tie!", 1000)  
    } 
    if (machineHand === 'rock' && humanHand === 'paper') humanWin()
    if (machineHand === 'rock' && humanHand === 'scissors') machineWin()
    if (machineHand === 'paper' && humanHand === 'rock') machineWin()
    if (machineHand === 'paper' && humanHand === 'scissors') humanWin()
    if (machineHand === 'scissors' && humanHand === 'rock') humanWin()
    if (machineHand === 'scissors' && humanHand === 'paper') machineWin()
}

function displayMsg(text, ms) {
    msg.innerHTML = text
    msg.style.transition = '0s'
    msg.style.opacity = '1'
    msg.style.visibility = 'visible'
    setTimeout(()=>{
        msg.style.transition = `0.3s`
        msg.style.opacity = '0'
        msg.style.visibility = 'hidden'
    }, ms)
}

function humanWin() {
    humanScore++
    humanScoreContainer.innerHTML = `${humanScore} / 5`
    setTimeout(()=>{
        machineImgContainer.style.transition = `0.3s`
        machineImgContainer.style.visibility = 'hidden'
    }, 1000)
}

function machineWin() {
    machineScore++
    machineScoreContainer.innerHTML = `${machineScore} / 5`
    setTimeout(()=>{
        humanImgContainer.style.transition = `0.3s`
        humanImgContainer.style.visibility = 'hidden'
    }, 1000)
}

//check for end of game
function isGameOver() {
    if (humanScore === 5) displayMsg('GAME OVER...you win!', 4000)
    if (machineScore === 5) displayMsg('GAME OVER...you lose, please try again', 4000)
}