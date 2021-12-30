let rock = document.querySelector('#rock')
let paper = document.querySelector('#paper')
let scissors = document.querySelector('#scissors')
let instructions = document.querySelector('#gameInstructions')
let msg = document.querySelector('#message')
let humanScoreContainer = document.querySelector('#humanScore')
let machineScoreContainer = document.querySelector('#machineScore')
let humanImgContainer = document.querySelector('#humanImg')
let machineImgContainer = document.querySelector('#machineImg')
let audio = document.querySelector('audio')
let gameContainer = document.querySelector('.game-container')
let gameOverContainer = document.querySelector('.gameOver-container')
let gameOverMsg = document.querySelector('#gameOver-msg')
let playAgain = document.querySelector('#playAgain')

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
    if (char) container.innerHTML += char
}

//display one message at a time
//resources:
    // https://stackoverflow.com/questions/48142511/how-do-i-fade-out-a-div-using-pure-javascript
function startMsg(callback1, callback2) {
    printOut(instructionText, instructions)
    setTimeout(callback1, 2000)
    setTimeout(callback2, 6000)
}

function endMsg() {
    printOut(msgText, msg)
    setTimeout(()=>{fadeOut(msg, 1)}, 3000)
    setTimeout(()=>{fadeOut(instructions, 1)}, 4000)
}

startMsg(endMsg, handleClick)

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

//game logic
function handleClick() {
    for (let el of imgArr) {
        el.addEventListener('click', ()=>{
            machineHand = computerHand()
            machineImgContainer.src = `resources/${machineHand}.png`
            machineImgContainer.alt = `${machineHand}`
            fadeIn(machineImgContainer, 0)
    
            humanHand = el.firstElementChild[attribute='alt']
            humanImgContainer.src = `resources/${humanHand}.png`
            humanImgContainer.alt = `${humanHand}`
            fadeIn(humanImgContainer, 0)

            compareHand(machineHand, humanHand)
            isGameOver()
            audio.play()
        })
    }
}

//check for a winner / or a tie
function compareHand(machineHand, humanHand) {
    if (machineHand === humanHand) {
        setTimeout(()=>{fadeOut(machineImgContainer, 0.3), fadeOut(humanImgContainer, 0.3)}, 900)
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
    fadeIn(msg, 0)
    setTimeout(()=>{fadeOut(msg, 0.3)}, ms)
}

function humanWin() {
    humanScore++
    humanScoreContainer.innerHTML = `${humanScore}`
    setTimeout(()=>{fadeOut(machineImgContainer, 0.3)}, 1000)
}

function machineWin() {
    machineScore++
    machineScoreContainer.innerHTML = `${machineScore}`
    setTimeout(()=>{fadeOut(humanImgContainer, 0.3)}, 1000)
}

function fadeOut(el, ms) {
    el.style.transition = `${ms}s`
    el.style.opacity = '0'
    el.style.visibility = 'hidden'
}

function fadeIn(el, ms) {
    el.style.transition = `${ms}s`
    el.style.opacity = '1'
    el.style.visibility = 'visible'
}

//check for end of game
function isGameOver() {
    if (humanScore === 5 || machineScore === 5) {
        fadeOut(gameContainer, 1)
        setTimeout(()=>{
            gameContainer.style.position = 'absolute'
            gameOverContainer.classList.add('gameOver')
            if (humanScore === 5) gameOverMsg.innerHTML = 'GAME OVER...you win!'
            if (machineScore === 5) gameOverMsg.innerHTML = 'GAME OVER...you lose!'
        }, 1000)
       resetGame()
    }
}

function resetGame() {
    playAgain.addEventListener('mousedown', ()=>{
        playAgain.style.transition = '0.2s'
        playAgain.style.transform = 'translate(3px, -3px)'
    })
    playAgain.addEventListener('mouseup', ()=>{
        playAgain.style.transform = 'translate(-3px, 3px)'
    })
}