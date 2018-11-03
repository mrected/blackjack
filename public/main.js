// Variables -----------------------------------------------------

let gamePlaying = [true, true]
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

// Events -----------------------------------------------------

stayButton.addEventListener('click', () => {
  if (gamePlaying[1]) {
    dealerHand.forEach(card => {
      addCardToInterface(card, dealerInterface)
    })
    playerScore.textContent = getScore(playerHand)
    dealerScore.textContent = getScore(dealerHand)
    dealersTurn()
  }
})

hitButton.addEventListener('click', () => {
  if (gamePlaying[0]) {
    let card = deck.pop()
    playerHand.push(card)
    addCardToInterface(card, playerInterface)
    if (getScore(playerHand) > 21) {
      gamePlaying[0] = false
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
  if (getScore(dealerHand) < 17) {
    let card = deck.pop()
    dealerHand.push(card)
    addCardToInterface(card, dealerInterface)
    dealerScore.textContent = getScore(dealerHand)
  } else {
    gamePlaying = gamePlaying[(false, false)]
    winner()
  }
}

const winner = () => {
  if (
    getScore(playerHand) === getScore(dealerHand) &&
    getScore(playerHand) > 21
  ) {
    winnerIndicator.textContent = 'Draw'
  } else if (
    getScore(playerHand) > getScore(dealerHand) &&
    getScore(playerHand) < 21
  ) {
    winnerIndicator.textContent = 'Player'
  } else {
    winnerIndicator.textContent = 'Dealer'
  }
}

// Utilities -----------------------------------------------------

const addCardToInterface = (card, hand) => {
  let newCard = `The ${card.face} of ${card.suit}`
  let newLi = document.createElement('li')
  newLi.textContent = newCard
  hand.appendChild(newLi)
}

const getScore = cards => {
  let tempScoreArray = []
  cards.forEach(card => {
    tempScoreArray.push(card.value)
  })
  return tempScoreArray.reduce((score, currentValue) => score + currentValue)
}

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

// for (let index = 52 - 1; index > 1; index -= 1) {
//   let otherIndex = Math.floor(Math.random() * index)
//   let firstCard = deck[index]
//   let secondCard = deck[otherIndex]​
//   deck[index] = secondCard
//   deck[otherIndex] = firstCard
// }​

// BLACKJACK
// game starts by dealing 2 cards to the dealer, then 2 to the player - done
// dealers cards aren't shown, players cards are - done
// player has a hit button that when pressed adds 1 card -done
// if player score goes over 21, player loses - done
// player has a stand button, when pressed dealers cards are revealed - done
// and cards are added until the value is 17 or more - done
// if dealers cards are more than 21 or less than players the player wins - done
// else dealer wins - done
// play again button rebuilds and shuffles deck, sets scores to 0 and deals again

document.addEventListener('DOMContentLoaded', main)
