import { JSDOM } from "jsdom";

function parseText(response) {
  return response.text();
}

/**
 * @description We'd scrape pages using traditional DOM traversal.
 * We need a document object to do that.
 * @param {string} url
 * @returns {Promise<Document|null>}
 */
export default async function getDocumentFromURL(url) {
  try {
    const htmlString = await fetch(url).then(parseText);
    const document = new JSDOM(htmlString).window.document;
    return document;
  } catch (error) {
    console.error("Unable to retrieve document!");
    return null;
  }
}
