import getDocumentFromURL from "./getDocumentFromURL.mjs";
import { first, rest, chunkArr } from "../utils/array.mjs";
function getRaidPageURL(raidStarRating) {
  return `https://serebii.net/scarletviolet/teraraidbattles/${raidStarRating}star.shtml`;
}

/**
 * @param {number} starRating
 * @returns {Promise<HTMLCollection[][]>}
 */
export default async function getPokemonTableRows(starRating) {
  const document = await getDocumentFromURL(getRaidPageURL(starRating));

  if (!document) {
    return [];
  }

  // for whatever reason, the table containing raid bosses has the class name of trainer
  // selecting by classname is extremely flaky, but this site is super old-school
  const teraRaidTable = document.querySelector(".trainer");

  const teraRaidTableBody = first(teraRaidTable.children);
  // converting to array so we can chunk the rows into managable data without using math
  const teraRaidTableRows = teraRaidTableBody.children;

  // we don't want the first item, as it's the table header/title
  return chunkArr(rest(teraRaidTableRows), 8);
}
