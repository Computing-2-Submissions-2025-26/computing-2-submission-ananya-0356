//import R from "./ramda.js";

//Hanafuda Game Module
//Pure Functions for game logic, game state and scoring.

/**
 * Shuffles a deck of cards using Fisher-Yates learnt from
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array
 * -of-items-using-javascript-or-typescript/
 * @param {Array} cards - Array of card objects to shuffle
 * @returns {Array} New shuffled array (original unchanged)
 */

function shuffleDeck(cards) {
    const deck = [...cards];
    let i = deck.length - 1;
    let j;
    while (i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
        i = i - 1;
    }
    return deck;
}

/**
 * Deals cards from deck to players and field.
 * @param {Array} deck - Shuffled deck of 48 cards
 * @returns {Object} Contains player1Hand, player2Hand,
 * fieldCards, remainingDeck
 */

function dealCards(deck) {
    return {
        player1Hand: deck.slice(0, 8),
        player2Hand: deck.slice(8, 16),
        fieldCards: deck.slice(16, 24),
        remainingDeck: deck.slice(24)
    };
}

// Game state holds all game data in one place
const gameState = {
    deck: [],
    fieldCards: [],
    player1: {
        name: "Player 1",
        hand: [],
        captured: [],
        score: 0
    },
    player2: {
        name: "Player 2",
        hand: [],
        captured: [],
        score: 0
    },
    currentPlayer: 1,
    gameOver: false,
    winner: null
};

/**
 * Counts red poetry slip cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of red poetry slip cards
 */
function countRedPoetrySlips(capturedCards) {
    let count = 0;
    let i = 0;

    while (i < capturedCards.length) {
        if (
            capturedCards[i].tags
            &&
            capturedCards[i].tags.includes("red poetry slips")
        ) {
            count = count + 1;
        }
        i = i + 1;
    }

    return count;
}

/**
 * Counts blue poetry slip cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of blue poetry slip cards
 */
function countBluePoetrySlips(capturedCards) {
    let count = 0;
    let i = 0;

    while (i < capturedCards.length) {
        if (
            capturedCards[i].tags
            &&
            capturedCards[i].tags.includes("blue poetry slips")
        ) {
            count = count + 1;
        }
        i = i + 1;
    }

    return count;
}

/**
 * Counts all poetry slip cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of poetry slip category cards
 */
function countPoetrySlips(capturedCards) {
    let count = 0;
    let i = 0;

    while (i < capturedCards.length) {
        if (capturedCards[i].category === "poetry slips") {
            count = count + 1;
        }
        i = i + 1;
    }

    return count;
}

/**
 * Counts seed cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of seed category cards
 */
function countSeeds(capturedCards) {
    let count = 0;
    let i = 0;

    while (i < capturedCards.length) {
        if (capturedCards[i].category === "seeds") {
            count = count + 1;
        }
        i = i + 1;
    }

    return count;
}

/**
 * Checks if player has Ino-Shika-Cho yaku (boar, deer, butterfly).
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {boolean} True if player has all three animal cards
 */
function checkInoShikaCho(capturedCards) {
    let hasBoar = false;
    let hasDeer = false;
    let hasButterfly = false;
    let i = 0;

    while (i < capturedCards.length) {
        const card = capturedCards[i];

        if (card.tags) {
            if (card.tags.includes("boar")) {
                hasBoar = true;
            }
            if (card.tags.includes("deer")) {
                hasDeer = true;
            }
            if (card.tags.includes("butterfly")) {
                hasButterfly = true;
            }
        }

        i = i + 1;
    }

    return hasBoar && hasDeer && hasButterfly;
}

/**
 * Counts chaff cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of chaff category cards
 */
function countChaff(capturedCards) {
    let count = 0;
    let i = 0;

    while (i < capturedCards.length) {
        if (capturedCards[i].category === "chaff") {
            count = count + 1;
        }
        i = i + 1;
    }

    return count;
}

/**
 * Calculates total score for a player based on captured cards.
 * Red/Blue Poetry Slips: 3+ cards = 3 points + 1 per extra
 * Poetry Slips: 5+ cards = 5 points + 1 per extra
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Total points scored
 */
function calculateScore(capturedCards) {
    let totalPoints = 0;
    let redCount = countRedPoetrySlips(capturedCards);
    let blueCount = countBluePoetrySlips(capturedCards);
    let poetryCount = countPoetrySlips(capturedCards);
    let seedCount = countSeeds(capturedCards);
    let chaffCount = countChaff(capturedCards);

    if (redCount >= 3) {
        totalPoints = totalPoints + 3 + (redCount - 3);
    }

    if (blueCount >= 3) {
        totalPoints = totalPoints + 3 + (blueCount - 3);
    }

    if (poetryCount >= 5) {
        totalPoints = totalPoints + 5 + (poetryCount - 5);
    }

    if (seedCount >= 5) {
        totalPoints = totalPoints + 5 + (seedCount - 5);
    }

    if (checkInoShikaCho(capturedCards)) {
        totalPoints = totalPoints + 5;
    }

    if (chaffCount >= 10) {
        totalPoints = totalPoints + 1;
    }

    return totalPoints;
}

/**
 * Finds cards on the field that match a player's card by month.
 * @param {Object} playerCard - Card object from player's hand
 * @param {Array} fieldCards - Cards currently on the field
 * @returns {Array} Array of matching cards on field
 */
function findMatchingCards(playerCard, fieldCards) {
    let matches = [];
    let i = 0;

    while (i < fieldCards.length) {
        if (fieldCards[i].month === playerCard.month) {
            matches.push(fieldCards[i]);
        }
        i = i + 1;
    }

    return matches;
}

export {shuffleDeck, dealCards, calculateScore};