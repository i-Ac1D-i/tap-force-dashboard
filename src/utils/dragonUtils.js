import Papa from 'papaparse';

let dragonMap = null;

/**
 * Load and parse dragonData.csv from public/data/
 * CSV columns: ID, RARITY, RAR INDEX, Name, Prefix, Stat 1, Stat 1 Value, Stat 2, Stat 2 Value, Stat 3, Stat 3 Value, Stat 4, Stat 4 Value
 */
export async function loadDragonMap() {
  if (dragonMap) return dragonMap;
  const url = `${process.env.PUBLIC_URL}/data/dragonData.csv`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch dragonData.csv: ${res.status}`);
  const csvText = await res.text();
  const { data, errors } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  if (errors.length) throw new Error('Error parsing dragon CSV: ' + errors[0].message);

  dragonMap = data.reduce((map, row) => {
    const idKey = String(row.ID).trim();
    if (!idKey) return map;
    map[idKey] = {
      id: idKey,
      rarity: row.RARITY,
      rarityIndex: Number(row['RAR INDEX']),
      name: row.Name,
      prefix: row.Prefix,
      stats: [
        row['Stat 1'] && { stat: row['Stat 1'], value: row['Stat 1 Value'] },
        row['Stat 2'] && { stat: row['Stat 2'], value: row['Stat 2 Value'] },
        row['Stat 3'] && { stat: row['Stat 3'], value: row['Stat 3 Value'] },
        row['Stat 4'] && { stat: row['Stat 4'], value: row['Stat 4 Value'] }
      ].filter(Boolean)
    };
    return map;
  }, {});

  console.log('Loaded dragonMap with', Object.keys(dragonMap).length, 'entries');
  return dragonMap;
}

/**
 * Given a dragon ID, returns the dragon object or null.
 */
export async function getDragonById(id) {
  const map = await loadDragonMap();
  return map[String(id)] || null;
}
