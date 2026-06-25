import {calculateScore} from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

const card = (id) => allcards.find((c) => c.id === id);

    describe("Brights scoring", function () {
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

    });