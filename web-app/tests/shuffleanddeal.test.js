import { shuffleDeck, dealCards } from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

describe("Hanafuda Game Logic", function () {

    describe("shuffleDeck", function () {

        it("returns 48 cards", function () {
            const shuffled = shuffleDeck(allcards);
            assert.strictEqual(shuffled.length, 48);
        });

    });

    describe("dealCards", function () {

        it("gives player 1 eight cards", function () {
            const shuffled = shuffleDeck(allcards);
            const dealt = dealCards(shuffled);
            assert.strictEqual(dealt.player1Hand.length, 8);
        });

        it("gives player 2 eight cards", function () {
            const shuffled = shuffleDeck(allcards);
            const dealt = dealCards(shuffled);
            assert.strictEqual(dealt.player2Hand.length, 8);
        });

        it("places eight cards on the field", function () {
            const shuffled = shuffleDeck(allcards);
            const dealt = dealCards(shuffled);
            assert.strictEqual(dealt.fieldCards.length, 8);
        });

        it("leaves 24 cards in the remaining deck", function () {
            const shuffled = shuffleDeck(allcards);
            const dealt = dealCards(shuffled);
            assert.strictEqual(dealt.remainingDeck.length, 24);
        });

    });

});