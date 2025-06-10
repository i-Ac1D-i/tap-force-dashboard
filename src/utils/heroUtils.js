// src/utils/heroUtils.js
import Papa from 'papaparse';

let heroMap = null;

/**
 * Fetches and parses the CSV only once,
 * then builds a lookup of { [id]: heroObject }.
 */
export async function loadHeroMap() {
  if (heroMap) return heroMap;

  // CRA-served public asset
  const url = `${process.env.PUBLIC_URL}/data/heroData.csv`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch heroData.csv: ${res.status}`);
  }

  const csvText = await res.text();
  const { data, errors } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });

  if (errors.length) {
    console.error('CSV parse errors:', errors);
    throw new Error('Error parsing hero CSV data.');
  }

  // Build the map
  heroMap = data.reduce((map, row) => {
    // Some rows at end can be empty—skip them
    if (!row.id) return map;

    const idKey = String(row.id).trim();
    map[idKey] = {
      id: idKey,
      name: row.Name,                         // capital-N
      type: row.TYPE,
      typeIndex: Number(row['TYPE INDEX']),
      class: row.CLASS,
      classIndex: Number(row['CLASS INDEX']),
      displayTiers: row['DISPLAY TIERS'],
      csId: row['CS ID'], 
      hp: Number(row.HP),
      attack: Number(row.ATTACK),
      armor: Number(row.ARMOR),
      speed: Number(row.SPEED),
      power: Number(row.POWER),
      rarity: row.RARITY,
      // …include any other columns you need
    };
    return map;
  }, {});

  // sanity check
  console.log('Loaded heroMap with', Object.keys(heroMap).length, 'entries');
  console.log('Example [0]:', heroMap['0']);

  return heroMap;
}

/**
 * Lookup by numeric or string ID.
 */
export async function getHeroById(id) {
  const map = await loadHeroMap();
  return map[String(id)] || null;
}

export async function getAvatarPathById(id) {
  const hero = await getHeroById(id);
  if (!hero || !hero.csId) return null;

  // csId is “hero_Sarah” → strip off “hero_”:
  const heroName = hero.csId.replace(/^hero_/, '');
  return `${process.env.PUBLIC_URL}/assets/avatars/${heroName}.png`;
}
