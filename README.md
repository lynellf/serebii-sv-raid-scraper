# serebii-sv-raid-scraper
 Scrapes Pokemon Raid Boss Data from serebii.net

## Output
Generates a file, `results.json` within the project directory containing:

```typescript
type TOutput = Record<string, { name: string; moves: string[] }[]>
```

### Why?

The current Pokemon Raid App is vauge. It'll make suggestions based on the offensive typing and defensive resistances. 

However, the raid boss pokemon may use super-effective moves against predictable counters. E.G.. 7-star raid boss Charizard using Focus Blast against Rock type Pokemon.

Serebii has likely datamined the games and we now know what moves raid bosses can use. Knowing the raid boss' moves will allow our main application to be that much more precise with its suggestions.

### How

We can iterate through each page of Serebii.net to see the list of raid bosses.

`https://serebii.net/scarletviolet/teraraidbattles/<number>star.shtml`

The `number` value represents a range between `1` and `6`.

Seven star raid bosses are not available.

The raid boss list page contains a list of pokemon and various metadata, but we only care about a few items.

- Name
- Moves

Each row in the table corresponds to a set of data:

|Index| Content|
|---|---|
|0| Table description: E.G.. Tera Raid Battles - 6 Star|
|1|Pokemon Images|
|2|Pokemon Names|
|3|Game Version|
|4|Level|
|5|Tera Type|
|6|Ability|
|7|Moves|
|8|Item Drops|
|9|New Row of Pokemon Images|
|10|New Row of Pokemon Names|
