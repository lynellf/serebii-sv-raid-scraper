import { first, rest } from "../utils/array.mjs";
import asPokemonData from "../asPokemonData.mjs";
import getPokemonTableRows from "./getPokemonTableRows.mjs";

/**
 *
 * @param {number[]} raidStarRatings
 * @param {Record<string, {name: string; moves: string[]}[]} output
 * @returns {Promise<Record<string, {name: string; moves: string[]}[]>}
 */
export default async function getRaidBossData(
  raidStarRatings = [],
  output = {}
) {
  if (!raidStarRatings.length) {
    return output;
  }

  const starRating = first(raidStarRatings);
  const tableRows = await getPokemonTableRows(starRating);
  const raidBosses = tableRows.flatMap(asPokemonData);

  return await getRaidBossData(rest(raidStarRatings), {
    ...output,
    [`${starRating}StarRaidBosses`]: raidBosses
  });
}
