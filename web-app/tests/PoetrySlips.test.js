import {calculateScore, getCompletedYaku } from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

const card = (id) => allcards.find((c) => c.id === id);

describe("Scoring System", function () {
    it("Red Poetry Slips scores 3 points", function () {
        const redCards = allcards
        .filter((c) => c.tags && c.tags.includes("red poetry slips"))
        .slice(0, 3);

    assert.strictEqual(calculateScore(redCards), 3);
})

});