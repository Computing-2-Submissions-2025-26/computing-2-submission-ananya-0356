import {calculateScore, getCompletedYaku } from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

describe("Seeds scoring", function () {
    it("Seeds scores 5 points", function () {
        const seedCards = allcards.filter((c) => c.category === "seeds");
        assert(calculateScore(seedCards) >= 5);
    });

    it("Six seeds scores 6 points", function () {
        const seedCards = allcards
            .filter((c) => c.category === "seed" || c.category === "seeds")
            .slice(0, 6);

        assert.strictEqual(seedCards.length, 6);
        assert.strictEqual(calculateScore(seedCards), 6);
    });

});