import {calculateScore, getCompletedYaku } from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

const card = (id) => allcards.find((c) => c.id === id);

    describe("Yaku scoring", function () {
        it("Moon Viewing scores 10 points", function () {
            const cards = [card("jan-1"), card("aug-4")];
            assert.strictEqual(calculateScore(cards), 10);
        });

        it("Three Lights scores 12 points", function () {
            const cards = [card("aug-4"), card("mar-4"), card("dec-4")];
            assert.strictEqual(calculateScore(cards), 12);
        });

        it("Four Brights scores 15 points", function () {
            const cards = [card("aug-4"), card("mar-4"), card("dec-4"),
                card("nov-4")];
            assert.strictEqual(calculateScore(cards), 15);
        });

        it("All Five Brights scores 20 points", function () {
            const cards = [card("jan-1"), card("aug-4"), card("mar-4"),
                card("dec-4"), card("nov-4")];
            assert.strictEqual(calculateScore(cards), 20);
        });

        it("Seeds score at least 5 points", function () {
            const seedCards = allcards.filter((c) => c.category === "seeds");
            assert(calculateScore(seedCards) >= 5);
        });

        it("Red Poetry Slips scores 3 points", function () {
            const redCards = allcards
            .filter((c) => c.tags && c.tags.includes("red poetry slips"))
            .slice(0, 3);

        assert.strictEqual(calculateScore(redCards), 3);
    })
    });