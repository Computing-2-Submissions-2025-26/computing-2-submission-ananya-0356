import R from "./ramda.js";

/**
 * Shuffles a deck of cards using Fisher-Yates algorithm.
 * Pure function - returns new array, doesn't modify input.
 * @param {Array} cards - Array of card objects to shuffle
 * @returns {Array} New shuffled deck
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
 * Deals cards from shuffled deck to players and field.
 * Divides 48-card deck into 8 + 8 + 8 + 24 distribution.
 * @param {Array} deck - Shuffled deck of cards
 * @returns {Object} Contains player1Hand, player2Hand,
 * fieldCards, remainingDeck
 */
function dealCards(deck) {
    return {
        player1Hand: R.slice(0, 8, deck),
        player2Hand: R.slice(8, 16, deck),
        fieldCards: R.slice(16, 24, deck),
        remainingDeck: R.slice(24, Infinity, deck)
    };
}

/**
 * Checks if card has red poetry slip tag.
 * @param {Object} card - Card object
 * @returns {boolean} True if has "red poetry slips" tag
 */
function isRedPoetrySlip(card) {
    return R.includes(
        "red poetry slips",
        R.defaultTo([], R.prop("tags", card))
    );
}

/**
 * Checks if card has blue poetry slip tag.
 * @param {Object} card - Card object
 * @returns {boolean} True if has "blue poetry slips" tag
 */
function isBluePoetrySlip(card) {
    return R.includes(
        "blue poetry slips",
        R.defaultTo([], R.prop("tags", card))
    );
}

/**
 * Checks if card is poetry slip category.
 * @param {Object} card - Card object
 * @returns {boolean} True if category is "poetry slips"
 */
function isPoetrySlip(card) {
    return R.propEq("category", "poetry slips", card);
}

/**
 * Checks if card is seed category.
 * @param {Object} card - Card object
 * @returns {boolean} True if category is "seeds"
 */
function isSeed(card) {
    return R.propEq("category", "seeds", card);
}

/**
 * Checks if card is chaff category.
 * @param {Object} card - Card object
 * @returns {boolean} True if category is "chaff"
 */
function isChaff(card) {
    return R.propEq("category", "chaff", card);
}

/**
 * Counts red poetry slip cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of red poetry slip cards
 */
function countRedPoetrySlips(capturedCards) {
    return R.length(R.filter(isRedPoetrySlip, capturedCards));
}

/**
 * Counts blue poetry slip cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of blue poetry slip cards
 */
function countBluePoetrySlips(capturedCards) {
    return R.length(R.filter(isBluePoetrySlip, capturedCards));
}

/**
 * Counts all poetry slip category cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of poetry slip category cards
 */
function countPoetrySlips(capturedCards) {
    return R.length(R.filter(isPoetrySlip, capturedCards));
}

/**
 * Counts seed category cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of seed category cards
 */
function countSeeds(capturedCards) {
    return R.length(R.filter(isSeed, capturedCards));
}

/**
 * Counts chaff category cards in captured cards.
 * @param {Array} capturedCards - Cards the player has captured
 * @returns {number} Count of chaff category cards
 */
function countChaff(capturedCards) {
    return R.length(R.filter(isChaff, capturedCards));
}

/**
 * Checks if player has all three animal cards: boar, deer, butterfly.
 * Ino-Shika-Cho yakusu combination.
 * @param {Array} cards - Captured cards to check
 * @returns {boolean} True if has all three animals
 */
function checkInoShikaCho(cards) {
    let hasBoar = false;
    let hasDeer = false;
    let hasButterfly = false;
    let i = 0;

    while (i < cards.length) {
        const card = cards[i];
        if (card.tags) {
            if (R.includes("boar", card.tags)) {
                hasBoar = true;
            }
            if (R.includes("deer", card.tags)) {
                hasDeer = true;
            }
            if (R.includes("butterfly", card.tags)) {
                hasButterfly = true;
            }
        }
        i = i + 1;
    }

    return hasBoar && hasDeer && hasButterfly;
}

/**
 * Calculates total score from captured cards.
 * Scoring: Red Poetry 3+ (3+1 per extra), Blue Poetry 3+ (3+1 per extra),
 * Poetry Slips 5+ (5+1 per extra), Seeds 5+ (5+1 per extra),
 * Ino-Shika-Cho (5), Chaff 10+ (1).
 * @param {Array} cards - Player's captured cards
 * @returns {number} Total points scored
 */
function calculateScore(cards) {
    let totalPoints = 0;
    let redCount = countRedPoetrySlips(cards);
    let blueCount = countBluePoetrySlips(cards);
    let poetryCount = countPoetrySlips(cards);
    let seedCount = countSeeds(cards);
    let chaffCount = countChaff(cards);

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

    if (checkInoShikaCho(cards)) {
        totalPoints = totalPoints + 5;
    }

    if (chaffCount >= 10) {
        totalPoints = totalPoints + 1;
    }

    return totalPoints;
}

/**
 * Finds field card matching hand card by month.
 * Returns first match or null if no match exists.
 * @param {Object} handCard - Player's card to match
 * @param {Array} fieldCards - Cards currently on field
 * @returns {Object|null} Matching field card or null
 */
function findMatchingFieldCard(handCard, fieldCards) {
    const handMonth = R.prop("month", handCard);
    const predicate = function (card) {
        return R.propEq("month", handMonth, card);
    };
    return R.find(predicate, fieldCards) || null;
}

/**
 * Removes card by id from array.
 * Returns new array without the card.
 * @param {string} cardId - Card id to remove
 * @param {Array} cards - Array to remove from
 * @returns {Array} New array without card
 */
function removeCardById(cardId, cards) {
    const predicate = function (card) {
        return !R.propEq("id", cardId, card);
    };
    return R.filter(predicate, cards);
}

/**
 * Draws top card from deck.
 * Returns first card or null if deck is empty.
 * @param {Array} deck - Current deck
 * @returns {Object|null} Top card or null
 */
function drawDeckCard(deck) {
    if (R.isEmpty(deck)) {
        return null;
    }
    return R.head(deck);
}

/**
 * Gets completed yaku with point values.
 * Returns array of {name, points} for each achieved yakusu.
 * @param {Array} cards - Player's captured cards
 * @returns {Array} Array of {name, points} objects
 */
function getCompletedYaku(cards) {
    let yaku = [];

    let redCount = countRedPoetrySlips(cards);
    if (redCount >= 3) {
        yaku = R.append(
            {
                name: "Red Poetry Slips",
                points: 3 + (redCount - 3)
            },
            yaku
        );
    }

    let blueCount = countBluePoetrySlips(cards);
    if (blueCount >= 3) {
        yaku = R.append(
            {
                name: "Blue Poetry Slips",
                points: 3 + (blueCount - 3)
            },
            yaku
        );
    }

    let poetryCount = countPoetrySlips(cards);
    if (poetryCount >= 5) {
        yaku = R.append(
            {
                name: "Poetry Slips",
                points: 5 + (poetryCount - 5)
            },
            yaku
        );
    }

    let seedCount = countSeeds(cards);
    if (seedCount >= 5) {
        yaku = R.append(
            {
                name: "Seeds",
                points: 5 + (seedCount - 5)
            },
            yaku
        );
    }

    if (checkInoShikaCho(cards)) {
        yaku = R.append(
            {
                name: "Ino-Shika-Cho",
                points: 5
            },
            yaku
        );
    }

    let chaffCount = countChaff(cards);
    if (chaffCount >= 10) {
        yaku = R.append(
            {
                name: "Chaff",
                points: 1
            },
            yaku
        );
    }

    return yaku;
}

export {
    shuffleDeck,
    dealCards,
    calculateScore,
    countRedPoetrySlips,
    countBluePoetrySlips,
    countPoetrySlips,
    countSeeds,
    countChaff,
    checkInoShikaCho,
    findMatchingFieldCard,
    removeCardById,
    drawDeckCard,
    getCompletedYaku
};