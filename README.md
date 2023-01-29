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

### Problem
The data is listed as one giant table, and every row contains details for various pokemon.

**Question:  If all raid bosses exist in a single table with no way to differentiate them, how do we know which pokemon is which?**

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

**Question: How do we parse pokemon names?**
Pokemon names are located at index 2. Each cell contains pokemon names contained within a link tag.

**Question: How do we parse move data?**
Move data is located at index 7. Each cell contans moves separated by a line break. Each move is contained within a link tag.

#### Assumptions:
- The number of cells within each row determines how many pokemon are in that row.
- The first row is the title and can be ignored
- A *row* of pokemon data has a length/size of 8 items of data
- We can gather the rows we need mathematically
	- Add 8 to the initial row index until reaching the end
- Pokemon with the same name will need to have an index appended to it. I.E.. Tauros
- We can parse pokemon names and moves by performing a query on the cell for link tags and extracting its text
- ~~We can iterate through each *Row* of pokemon by obtaining the table body's child node list minus the header, divided by 8 ~~
	- ~~Round up to be safe we don't exclude any pokemon data~~
- We can chunk the table rows and iterate through the chunks
	- After removing the first row (it's always the title of the table)

### Chunking Algo
```js
const chunkArr = (arr = [], size, currChunks = []) => {
	if (!arr.length) {
	  return currChunks
	}

  const chunk = arr.slice(0, size)
  const rest = arr.slice(size)
  
  return chunkArr(rest, size, [...currChunks, chunk])
}
```


### Implementation

```
pokemon_table = query(".table").children[0]
row_count = pokemon_table.length - 1

for(i = 0; i < row_count; i++) {
  name_row = pokemon
}
```