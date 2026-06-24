import R from "./ramda.js";
import { allcards } from "./cards.js";
import * as hanafuda from "./hanafuda.js";

console.log("JavaScript file loaded!");

const gameState = {
    deck: [],
    fieldCards: [],
    fieldCardGrid: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    player1: {
        name: "Player 1",
        hand: [],
        handGrid: [1, 1, 1, 1, 1, 1, 1, 1],
        captured: [],
        score: 0
    },
    player2: {
        name: "Player 2",
        hand: [],
        handGrid: [1, 1, 1, 1, 1, 1, 1, 1],
        captured: [],
        score: 0
    },
    currentPlayer: 1,
    gameOver: false,
    winner: null
};

function startNewGame() {
    const num1 = 5;
    const num2 = 3;
    const sum = R.add(num1, num2);
    console.log(sum);

    const name1 = prompt("Player 1, enter your name:") || "Player 1";
    const name2 = prompt("Player 2, enter your name:") || "Player 2";

    gameState.player1.name = name1;
    gameState.player2.name = name2;

    document.getElementById("player1-area").style.display = "block";
    document.getElementById("player2-area").style.display = "block";
    document.getElementById("player1-name").textContent = name1 + "'s Cards";
    document.getElementById("player2-name").textContent = name2 + "'s Cards";
    document.getElementById("deck-pile").style.display = "block";

    gameState.deck = hanafuda.shuffleDeck(allcards);
    gameState.currentPlayer = 1;
}

function renderFieldCards() {
    const fieldContainer = document.getElementById("field-cards");  
    fieldContainer.innerHTML = "";

    let i = 0;
    while (i < gameState.fieldCards.length) {
        const card = gameState.fieldCards[i];
        const cardImg = document.createElement("img");
        cardImg.src = card.image;
        cardImg.alt = card.id;
        cardImg.className = "field-card";
        fieldContainer.appendChild(cardImg);
        i = i + 1;
    }
}

function renderPlayerHands() {
    renderPlayer1Hand();
    renderPlayer2Hand();
    updateHandVisibility();
}

function renderPlayer1Hand() {
    const player1HandContainer = document.getElementById("player1-hand");
    player1HandContainer.innerHTML = "";

    let i = 0;
    while (i < gameState.player1.hand.length) {
        const card = gameState.player1.hand[i];
        const cardImg = document.createElement("img");
        cardImg.src = card.image;
        cardImg.alt = card.id;
        cardImg.className = "player1-card";
        player1HandContainer.appendChild(cardImg);
        i = i + 1;
    }
}

function renderPlayer2Hand() {
    const player2HandContainer = document.getElementById("player2-hand");
    player2HandContainer.innerHTML = "";

    let i = 0;
    while (i < gameState.player2.hand.length) {
        const card = gameState.player2.hand[i];
        const cardImg = document.createElement("img");
        cardImg.src = card.image;
        cardImg.alt = card.id;
        cardImg.className = "player2-card";
        player2HandContainer.appendChild(cardImg);
        i = i + 1;
    }
}

function updateHandVisibility() {
    const player1Hand = document.getElementById("player1-hand");
    const player2Hand = document.getElementById("player2-hand");
    if (gameState.currentPlayer === 1) {
        player1Hand.style.display = "block";
        player2Hand.style.display = "none";
    } else {
        player1Hand.style.display = "none";
        player2Hand.style.display = "block";
    }
}

const newGameButton = document.getElementById("new-game-button");

newGameButton.addEventListener("click", function() {
    newGameButton.style.border = "3px solid white";
    setTimeout(function() {
        newGameButton.style.border = "none";
    }, 150);
    startNewGame();
});

const deckPile = document.getElementById("deck-pile");

deckPile.addEventListener("click", function() {
    const dealt = hanafuda.dealCards(gameState.deck);
    gameState.player1.hand = dealt.player1Hand;
    gameState.player2.hand = dealt.player2Hand;
    gameState.fieldCards = dealt.fieldCards;
    gameState.deck = dealt.remainingDeck;

    console.log("Cards dealt!");
    console.log("Player 1 has " + gameState.player1.hand.length + " cards");
    console.log("Player 2 has " + gameState.player2.hand.length + " cards");
    console.log("Field has " + gameState.fieldCards.length + " cards");
    console.log("Deck has " + gameState.deck.length + " cards remaining");

     // Populate field grid with first 8 cards
     let cardIndex = 0;
     let i = 0;
     while (i < 2) {
         let j = 0;
         while (j < 5) {
             if (cardIndex < gameState.fieldCards.length) {
                 gameState.fieldCardGrid[i][j] = 1;
                 cardIndex = cardIndex + 1;
             }
             j = j + 1;
         }
         i = i + 1;
        };
        //Cards show up in the field grid??
        renderFieldCards();
        renderPlayerHands()
})

const endTurnButton = document.getElementById("end-turn-button");

    if (gameState.currentPlayer === 1) {
        gameState.currentPlayer = 2;
    } else {
        gameState.currentPlayer = 1;
    }
    updateHandVisibility();
});