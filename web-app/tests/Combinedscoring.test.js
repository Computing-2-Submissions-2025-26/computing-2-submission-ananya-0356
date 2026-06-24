import {calculateScore, getCompletedYaku } from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

describe("Combined scoring", function () {

    it("Moon Viewing and Red Poetry Slips score 13 points together", function () {

        const redCards = allcards

            .filter((c) => c.tags && c.tags.includes("red poetry slips"))

            .slice(0, 3);

        const combined = [

            card("jan-1"), // crane

            card("aug-4"), // moon

            ...redCards

        ];

        assert.strictEqual(calculateScore(combined), 13);

    });

});
