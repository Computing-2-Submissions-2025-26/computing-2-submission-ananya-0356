const assert = require("assert");
const { shuffleDeck, dealCards, allcards } = require("./main.js");

describe("Hanafuda Card Game - Shuffle and Deal", function() {

    describe("shuffleDeck function", function() {

        it("returns correct number of cards", function() {
            const result = shuffleDeck(allcards);
            assert.strictEqual(result.length, 48);
        });

        it("preserves original deck", function() {
            const firstCard = allcards[0];
            shuffleDeck(allcards);
            assert.strictEqual(allcards[0], firstCard);
        });

        it("contains all original cards", function() {
            const result = shuffleDeck(allcards);
            let allPresent = true;
            let i = 0;

            while (i < allcards.length && allPresent) {
                if (!result.includes(allcards[i])) {
                    allPresent = false;
                }
                i = i + 1;
            }

            assert.ok(allPresent);
        });

        it("produces randomized order", function() {
            let orderChanged = false;
            let attempts = 0;

            while (attempts < 10 && !orderChanged) {
                const result = shuffleDeck(allcards);
                if (result[0].id !== allcards[0].id) {
                    orderChanged = true;
                }
                attempts = attempts + 1;
            }

            assert.ok(orderChanged);
        });
    });

    describe("dealCards function", function() {

        it("deals 8 cards to player 1", function() {
            const result = dealCards(allcards);
            assert.strictEqual(result.player1Hand.length, 8);
        });

        it("deals 8 cards to player 2", function() {
            const result = dealCards(allcards);
            assert.strictEqual(result.player2Hand.length, 8);
        });

        it("deals 8 cards to field", function() {
            const result = dealCards(allcards);
            assert.strictEqual(result.fieldCards.length, 8);
        });

        it("leaves 24 cards in deck", function() {
            const result = dealCards(allcards);
            assert.strictEqual(result.remainingDeck.length, 24);
        });

        it("accounts for all 48 cards", function() {
            const result = dealCards(allcards);
            const total = result.player1Hand.length + 
                         result.player2Hand.length + 
                         result.fieldCards.length + 
                         result.remainingDeck.length;
            assert.strictEqual(total, 48);
        });
        
        it("deals unique cards to each player", function() {
            const result = dealCards(allcards);
            let noDuplicates = true;
            let i = 0;

            while (i < result.player1Hand.length && noDuplicates) {
                if (result.player2Hand.includes(result.player1Hand[i])) {
                    noDuplicates = false;
                }
                i = i + 1;
            }

            assert.ok(noDuplicates);
        });

        it("preserves original deck", function() {
            const originalLength = allcards.length;
            dealCards(allcards);
            assert.strictEqual(allcards.length, originalLength);
        });
    });
});