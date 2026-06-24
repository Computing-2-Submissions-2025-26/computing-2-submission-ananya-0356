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
        score: 0,
        hasChosenKoiKoi: false
    },
    player2: {
        name: "Player 2",
        hand: [],
        handGrid: [1, 1, 1, 1, 1, 1, 1, 1],
        captured: [],
        score: 0,
        hasChosenKoiKoi: false
    },
    currentPlayer: 1,
    gameStarted: false,
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
        cardImg.title = card.name;
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
        cardImg.title = card.name;
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
        cardImg.title = card.name;
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
    if (gameState.gameStarted === false) {
        newGameButton.style.border = "3px solid white";
        setTimeout(function() {
            newGameButton.style.border = "none";
        }, 150);
        startNewGame();
        gameState.gameStarted = true;

        /* SHOW the buttons */
        document.getElementById("end-turn-button").style.display = "block";
        document.getElementById("pass-button").style.display = "block";
    }
});

const deckPile = document.getElementById("deck-pile");

deckPile.addEventListener("click", function() {
    // FIRST CLICK - Deal initial cards
    if (gameState.deck.length === 48) {
        const dealt = hanafuda.dealCards(gameState.deck);
        gameState.player1.hand = dealt.player1Hand;
        gameState.player2.hand = dealt.player2Hand;
        gameState.fieldCards = dealt.fieldCards;
        gameState.deck = dealt.remainingDeck;

        renderAll();
        setupHandCardClickHandlers();
        setupFieldCardClickHandlers();
        }
        // LATER CLICKS - Draw card during gameplay
        else if (gameState.deck.length > 0) {
            handleDeckDraw();
        }
    });

    const endTurnButton = document.getElementById("end-turn-button");

    endTurnButton.addEventListener("click", function() {
        if (gameState.currentPlayer === 1) {
            gameState.currentPlayer = 2;
        } else {
            gameState.currentPlayer = 1;
        }
        updateHandVisibility();
        setupHandCardClickHandlers();
        setupFieldCardClickHandlers();
        endTurnButton.addEventListener("click", function() {
            if (gameState.currentPlayer === 1) {
                gameState.currentPlayer = 2;
            } else {
                gameState.currentPlayer = 1;
            }
            document.getElementById("koikoi-modal").style.display = "none";
            updateHandVisibility();
            setupHandCardClickHandlers();
            setupFieldCardClickHandlers();
        });
    });

// Selected card state
let selectedHandCard = null;

/**
 * Handle hand card click - select for matching
 */
function setupHandCardClickHandlers() {
    const currentPlayer = gameState.currentPlayer === 1 ?
        gameState.player1 : gameState.player2;

    const handContainer = gameState.currentPlayer === 1 ?
        document.getElementById("player1-hand") :
        document.getElementById("player2-hand");

    const cardImages = handContainer.querySelectorAll("img");

    let i = 0;
    while (i < cardImages.length) {
        const cardImg = cardImages[i];
        cardImg.addEventListener("click", function() {
            const cardId = cardImg.alt;
            const matchedCard = findCardById(cardId, currentPlayer.hand);

            if (matchedCard) {
                // If already selected, DESELECT
                if (selectedHandCard && selectedHandCard.id === matchedCard.id)
                    {
                    selectedHandCard = null;
                    cardImg.style.border = "none";
                } else {
                    // Clear previous selection
                    let j = 0;
                    while (j < cardImages.length) {
                        cardImages[j].style.border = "none";
                        j = j + 1;
                    }

                    // Select new card
                    selectedHandCard = matchedCard;
                    cardImg.style.border = "3px solid yellow";
                }
            }
        });
        i = i + 1;
    }
}

/**
 * Helper to find card by id in array
 */
function findCardById(cardId, cardArray) {
    let i = 0;
    while (i < cardArray.length) {
        if (cardArray[i].id === cardId) {
            return cardArray[i];
        }
        i = i + 1;
    }
    return null;
}

/**
 * Capture pair of field cards
 */
function captureFieldPair(fieldCard1, fieldCard2) {
    const currentPlayer = gameState.currentPlayer === 1 ?
        gameState.player1 : gameState.player2;

    currentPlayer.captured.push(fieldCard1);
    currentPlayer.captured.push(fieldCard2);

    gameState.fieldCards = removeCardById(fieldCard1.id, gameState.fieldCards);
    gameState.fieldCards = removeCardById(fieldCard2.id, gameState.fieldCards);

    updatePlayerScore(gameState.currentPlayer);
    renderAll();
    setupFieldCardClickHandlers();
}

function setupFieldCardClickHandlers() {
    const fieldContainer = document.getElementById("field-cards");
    const cardImages = fieldContainer.querySelectorAll("img");

    let i = 0;
    while (i < cardImages.length) {
        const fieldImg = cardImages[i];
        fieldImg.onclick = function() {
            const fieldCardId = fieldImg.alt;
            const clickedFieldCard = findCardById(fieldCardId,
                gameState.fieldCards);

            if (selectedHandCard) {
                if (clickedFieldCard &&
                    clickedFieldCard.month === selectedHandCard.month &&
                    clickedFieldCard.id !== selectedHandCard.id) {

                    const currentPlayer = gameState.currentPlayer === 1 ?
                        gameState.player1 : gameState.player2;
                    const isFromHand = findCardById(selectedHandCard.id,
                        currentPlayer.hand);

                    if (isFromHand) {
                        captureCardsPair(selectedHandCard, clickedFieldCard);
                    } else {
                        captureFieldPair(selectedHandCard, clickedFieldCard);
                    }
                }
                selectedHandCard = null;
            } else if (clickedFieldCard) {
                fieldImg.style.border = "3px solid gold";
                selectedHandCard = clickedFieldCard;
            }
        };
        i = i + 1;
    }
}
/**
 * Capture a pair of cards
 */
function captureCardsPair(handCard, fieldCard) {
    const currentPlayer = gameState.currentPlayer === 1 ?
        gameState.player1 : gameState.player2;

    currentPlayer.captured.push(handCard);
    currentPlayer.captured.push(fieldCard);

    if (gameState.currentPlayer === 1) {
        gameState.player1.hand = hanafuda.removeCardById(
            handCard.id,
            gameState.player1.hand
        );
    } else {
        gameState.player2.hand = hanafuda.removeCardById(
            handCard.id,
            gameState.player2.hand
        );
    }

    gameState.fieldCards = hanafuda.removeCardById(
        fieldCard.id,
        gameState.fieldCards
    );

    updatePlayerScore(gameState.currentPlayer);
    console.log("hand before render:", gameState.player1.hand.map(c => c.id));
    renderAll();

    gameState.player1.hand = removeCardById(handCard.id,
        gameState.player1.hand);
    gameState.player2.hand = removeCardById(handCard.id,
        gameState.player2.hand);
    gameState.fieldCards = removeCardById(fieldCard.id, gameState.fieldCards);
}

/**
 * Handle deck click - draw and play card
 */
function handleDeckDraw() {
    if (gameState.deck.length === 0) {
        return;
    }

    const drawnCard = hanafuda.drawDeckCard(gameState.deck);
    gameState.deck = gameState.deck.slice(1);

    const currentPlayer = gameState.currentPlayer === 1 ?
        gameState.player1 : gameState.player2;

    const matchingField = hanafuda.findMatchingFieldCard(
        drawnCard,
        gameState.fieldCards
    );

    if (matchingField) {
        currentPlayer.captured.push(drawnCard);
        currentPlayer.captured.push(matchingField);
        gameState.fieldCards = hanafuda.removeCardById(
            matchingField.id,
            gameState.fieldCards
        );
    } else {
        gameState.fieldCards.push(drawnCard);
    }

    updatePlayerScore(gameState.currentPlayer);
    renderAll();
    setupFieldCardClickHandlers();  // re-attach after re-render
    showKoiKoiPopup();
}

/**
 * Update player score and yaku
 */
function updatePlayerScore(playerNumber) {
    if (playerNumber === 1) {
        gameState.player1.score = hanafuda.calculateScore(
            gameState.player1.captured
        );
    } else {
        gameState.player2.score = hanafuda.calculateScore(
            gameState.player2.captured
        );
    }
}

/**
 * Render everything
 */
function renderAll() {
    renderFieldCards();
    renderPlayerHands();
    renderCapturedCards();
    displayScores();
}

/**
 * Show captured cards in player areas
 */
function renderCapturedCards() {
    const p1Captured = document.getElementById("player1-captured");
    const p2Captured = document.getElementById("player2-captured");

    p1Captured.innerHTML = "";
    p2Captured.innerHTML = "";

    let i = 0;
    while (i < gameState.player1.captured.length) {
        const img = document.createElement("img");
        img.src = gameState.player1.captured[i].image;
        img.style.width = "20%";
        img.style.margin = "2%";
        p1Captured.appendChild(img);
        i = i + 1;
    }

    i = 0;
    while (i < gameState.player2.captured.length) {
        const img = document.createElement("img");
        img.src = gameState.player2.captured[i].image;
        img.title = gameState.player1.captured[i].name;
        img.style.width = "20%";
        img.style.margin = "2%";
        p2Captured.appendChild(img);
        i = i + 1;
    }
}

/**
 * Display scores and yaku
 */
function displayScores() {
    const p1Yaku = hanafuda.getCompletedYaku(gameState.player1.captured);
    const p2Yaku = hanafuda.getCompletedYaku(gameState.player2.captured);
    console.log("Player 1 Score: " + gameState.player1.score);
    console.log("Player 1 Yaku: ", p1Yaku);
    console.log("Player 2 Score: " + gameState.player2.score);
    console.log("Player 2 Yaku: ", p2Yaku);
}

/**
 * Removes card by id from array.
 * Returns new array without the card.
 * @param {string} cardId - Card id to remove
 * @param {Array} cards - Array to remove from
 * @returns {Array} New array without card
 */
function removeCardById(cardId, cards) {
    let result = [];
    let i = 0;
    while (i < cards.length) {
        if (cards[i].id !== cardId) {
            result.push(cards[i]);
        }
        i = i + 1;
    }
    return result;
}

/**
 * Pass: randomly place a hand card onto the field
 */
function passCard() {
    const currentPlayer = gameState.currentPlayer === 1 ?
        gameState.player1 : gameState.player2;

    if (currentPlayer.hand.length === 0) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * currentPlayer.hand.length);
    const passedCard = currentPlayer.hand[randomIndex];

    gameState.fieldCards.push(passedCard);

    if (gameState.currentPlayer === 1) {
        gameState.player1.hand = removeCardById(passedCard.id,
            gameState.player1.hand);
    } else {
        gameState.player2.hand = removeCardById(passedCard.id,
            gameState.player2.hand);
    }

    selectedHandCard = null;
    renderAll();
    setupFieldCardClickHandlers();
}

const passButton = document.getElementById("pass-button");

passButton.addEventListener("click", function() {
    passCard();
});

/**
 * Show Koi-Koi decision popup
 */

function showKoiKoiPopup() {
    const currentPlayer = gameState.currentPlayer === 1 ?
        gameState.player1 : gameState.player2;

    if (currentPlayer.hasChosenKoiKoi) {
        return;
    }

    const yaku = hanafuda.getCompletedYaku(currentPlayer.captured);

    if (yaku.length === 0) {
        return;
    }

    let yakuText = "<strong>You have:</strong><br>";
    let i = 0;
    while (i < yaku.length) {
        yakuText = yakuText + yaku[i].name +
            " (" + yaku[i].points + " pts)<br>";
        i = i + 1;
    }

    document.getElementById("yaku-list").innerHTML = yakuText;
    document.getElementById("current-score").innerHTML =
        "<strong>Current Score: " + currentPlayer.score + " points</strong>";

    document.getElementById("koikoi-modal").style.display = "flex";
}

/**
 * Handle Koi-Koi choice
 */
function handleKoiKoi() {
    const currentPlayer = gameState.currentPlayer === 1 ?
        gameState.player1 : gameState.player2;

    currentPlayer.hasChosenKoiKoi = true;
    document.getElementById("koikoi-modal").style.display = "none";
}

/**
 * Handle Finish choice - end game
 */
function handleFinish() {
    document.getElementById("koikoi-modal").style.display = "none";

    const p1Score = gameState.player1.score;
    const p2Score = gameState.player2.score;

    let winner = p1Score > p2Score ?
    gameState.player1.name : gameState.player2.name;

    alert(winner + " wins with " + Math.max(p1Score, p2Score) + " points!");

    gameState.gameOver = true;
}

const koikoiBtn = document.getElementById("koikoi-btn");
const finishBtn = document.getElementById("finish-btn");

koikoiBtn.addEventListener("click", function() {
    handleKoiKoi();
});

finishBtn.addEventListener("click", function() {
    handleFinish();
});

const howToPlayBtn = document.getElementById("how-to-play-btn");
const yakuReferenceBtn = document.getElementById("yaku-reference-btn");
const howtoplayModal = document.getElementById("howtoplay-modal");
const yakusModal = document.getElementById("yakus-modal");

howToPlayBtn.addEventListener("click", function() {
    if (howtoplayModal.style.display === "none" ||
        howtoplayModal.style.display === "") {
        howtoplayModal.style.display = "flex";
    } else {
        howtoplayModal.style.display = "none";
    }
});

yakuReferenceBtn.addEventListener("click", function() {
    if (yakusModal.style.display === "none" ||
        yakusModal.style.display === "") {
        yakusModal.style.display = "flex";
    } else {
        yakusModal.style.display = "none";
    }
});

document.querySelectorAll(".close-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        howtoplayModal.style.display = "none";
        yakusModal.style.display = "none";
    });
});