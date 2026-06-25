import {calculateScore, getCompletedYaku } from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

const card = (id) => allcards.find((c) => c.id === id);

describe("Poetry Slips System", function () {
    it("Red Poetry Slips scores 3 points", function () {
        const redCards = allcards
        .filter((c) => c.tags && c.tags.includes("red poetry slips"))
        .slice(0, 3);

    assert.strictEqual(calculateScore(redCards), 3);
})

it("Blue Poetry Slips scores 3 points", function () {
    const blueCards = allcards
        .filter((c) => c.tags && c.tags.includes("blue poetry slips"))
        .slice(0, 3);

    assert.strictEqual(calculateScore(blueCards), 3);
});

});