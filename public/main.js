// Variables -----------------------------------------------------

let gamePlaying = true
let deck = []
let playerHand = []
let dealerHand = []
const dealerInterface = document.querySelector('.dealer-hand')
const playerInterface = document.querySelector('.player-hand')
const hitButton = document.querySelector('.hit-button')
const stayButton = document.querySelector('.stay-button')
const dealerScore = document.querySelector('.dealer-score')
const playerScore = document.querySelector('.player-score')
const winnerIndicator = document.querySelector('.winner-indicator')

// Buttons -----------------------------------------------------

stayButton.addEventListener('click', () => {
  if (gamePlaying) {
    playerScore.textContent = getScore(playerHand)
    dealerScore.textContent = getScore(dealerHand)
    dealersTurn()
  }
})

hitButton.addEventListener('click', () => {
  if (gamePlaying) {
    let card = deck.pop()
    playerHand.push(card)
    addCardToInterface(card, playerInterface)
    if (getScore(playerHand) > 21) {
      winnerIndicator.textContent = rules()
    }
    playerScore.textContent = getScore(playerHand)
  }
})

// Game Play -----------------------------------------------------

const startGame = () => {
  for (let i = 0; i < 2; i++) {
    let card = deck.pop()
    dealerHand.push(card)
  }
  for (let i = 0; i < 2; i++) {
    let card = deck.pop()
    addCardToInterface(card, playerInterface)
    playerHand.push(card)
  }
  playerScore.textContent = getScore(playerHand)
}

const dealersTurn = () => {
  while (getScore(dealerHand) < 17) {
    let card = deck.pop()
    dealerHand.push(card)
    dealerScore.textContent = getScore(dealerHand)
  }
  winnerIndicator.textContent = rules()
}

const rules = () => {
  let player = getScore(playerHand)
  let dealer = getScore(dealerHand)
  if (gamePlaying) {
    gamePlaying = false
    dealerHand.forEach(card => addCardToInterface(card, dealerInterface))
    if (player > 21) {
      dealerScore.textContent = getScore(dealerHand)
      return 'player busts'
    } else if (dealer > 21) {
      return 'dealer busts'
    } else if (player === dealer) {
      return 'draw'
    } else {
      return player > dealer ? 'player wins' : 'dealer wins'
    }
  }
}

// Utilities -----------------------------------------------------

const addCardToInterface = (card, hand) => {
  let newCard = `<img src="images/cards/${card.face}_of_${card.suit}.svg" />`
  let newLi = document.createElement('li')
  newLi.innerHTML = newCard
  hand.appendChild(newLi)
}

const getScore = cards => {
  let tempScoreArray = []
  cards.forEach(card => {
    tempScoreArray.push(card.value)
  })
  return tempScoreArray.reduce((score, currentValue) => score + currentValue)
}

// The Deck -----------------------------------------------------

const main = () => {
  let suits = ['spades', 'hearts', 'clubs', 'diamonds']

  let cards = [
    {
      face: '2',
      value: 2
    },
    {
      face: '3',
      value: 3
    },
    {
      face: '4',
      value: 4
    },
    {
      face: '5',
      value: 5
    },
    {
      face: '6',
      value: 6
    },
    {
      face: '7',
      value: 7
    },
    {
      face: '8',
      value: 8
    },
    {
      face: '9',
      value: 9
    },
    {
      face: '10',
      value: 10
    },
    {
      face: 'jack',
      value: 10
    },
    {
      face: 'queen',
      value: 10
    },
    {
      face: 'king',
      value: 10
    },
    {
      face: 'ace',
      value: 11
    }
  ]

  suits.forEach(suit => {
    cards.forEach(card => {
      deck.push({
        face: card.face,
        value: card.value,
        suit: suit
      })
    })
  })

  for (let index = 52 - 1; index > 1; index--) {
    let otherIndex = Math.floor(Math.random() * index)
    let firstCard = deck[index]
    let secondCard = deck[otherIndex]
    deck[index] = secondCard
    deck[otherIndex] = firstCard
  }

  startGame()
}

document.addEventListener('DOMContentLoaded', main)
