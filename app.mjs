import { writeFileSync } from "node:fs";
import getRaidBossData from "./src/integrations/getRaidBossData.mjs";

async function app() {
  const raidStarRatings = [1, 2, 3, 4, 5, 6];
  const output = await getRaidBossData(raidStarRatings);
  writeFileSync("results.json", JSON.stringify(output));
}

app();
