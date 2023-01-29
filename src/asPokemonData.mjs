import { toArray } from "./utils/array.mjs";

/**
 * The objective of this module is to convert a 2D array of data
 * into a 1D array of objects containing pokemon names and pokemon moves.
 *
 * The y index values correspond to pokemon data:
 * 0: Images
 * 1: Names
 * 2: Game Version
 * 3: Level
 * 4: Tera Type
 * 5: Ability
 * 6: Moves
 * 7: Item Drops
 *
 * The x index corresponds to individual pokemon, which are variable.
 */

/**
 * @param {HTMLElement} el
 * @returns {string}
 */
function asTextFromNode(el) {
  return el?.textContent ?? "";
}

/**
 * @description output may be empty string
 * @typedef {object} Input
 * @property {HTMLTableRowElement} Input.rowChunk
 * @property {number} Input.yIndex
 * @property {number} Input.xIndex
 * @param {Input} { rowChunk, yIndex, xIndex }
 * @returns {string}
 */
function parsePokemonName({ rowChunk, yIndex, xIndex }) {
  return rowChunk[yIndex]?.children[xIndex]?.textContent ?? "";
}

/**
 * @description output may contain empty strings
 * @typedef {object} Input
 * @property {HTMLTableRowElement} Input.rowChunk
 * @property {number} Input.yIndex
 * @property {number} Input.xIndex
 * @param {Input} { rowChunk, yIndex, xIndex }
 * @returns {string[]}
 */
function parsePokemonMoves({ rowChunk, yIndex, xIndex }) {
  const movesNode = rowChunk[yIndex].children?.[xIndex];
  const moves = toArray(movesNode.querySelectorAll("a"))
    .map(asTextFromNode)
    .filter(Boolean);
  return moves;
}

/**
 * @param {HTMLRowElement} _row
 * @param {number} xIndex
 * @returns {{ name: string; moves: string[] } | false}
 */
function asPokemonObj(_row, xIndex) {
  const name = parsePokemonName({ rowChunk, yIndex: 1, xIndex });

  if (!name) {
    return false;
  }

  const moves = parsePokemonMoves({ rowChunk, yIndex: 6, xIndex });
  return { name, moves };
}

/**
 * @param {HTMLTableRowElement[]} rowChunk collection of <tr> elements
 * @returns {{ name: string; moves: string[] }}
 */
export default function asPokemonData(rowChunk) {
  return rowChunk.map(asPokemonObj).filter(Boolean);
}
