import { calculateScore, getCompletedYaku } from "../hanafuda.js";
import { allcards } from "../cards.js";
import { strict as assert } from "assert";

describe("Scoring System", function () {
    describe("Chaff Yaku", function () {
        it("should score 1 point for 10 chaff cards", function () {
            const chaffCards = allcards
                .filter((c) => c.category === "chaff")
                .slice(0, 10);

            assert.strictEqual(calculateScore(chaffCards), 1);
        });

        it("should return Chaff yaku for 10 chaff cards", function () {
            const chaffCards = allcards
                .filter((c) => c.category === "chaff")
                .slice(0, 10);

            const yaku = getCompletedYaku(chaffCards);

            assert.strictEqual(yaku.length, 1);
            assert.strictEqual(yaku[0].name, "Chaff");
            assert.strictEqual(yaku[0].points, 1);
        });
    });
});