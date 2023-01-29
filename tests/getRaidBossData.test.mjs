import assert from "node:assert";
import { test } from "node:test";
import getRaidBossData from "../src/integrations/getRaidBossData.mjs";

function areAllStrings(arr = [], keyname) {
  return arr.every((entry) => typeof entry[keyname] === "string");
}

function areAllArrays(arr = [], keyname) {
  return arr.every((entry) => Array.isArray(entry[keyname]));
}

test("scrapes 1-star tera raid bosses", async () => {
  const data = await getRaidBossData([1]);
  const results = data["1StarRaidBosses"];

  assert.ok(results);
  assert.ok(Array.isArray(results));
  assert.ok(areAllStrings(results, "name"));
  assert.ok(areAllArrays(results, "moves"));
});
