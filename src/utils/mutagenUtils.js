// File: src/utils/mutagenUtils.js
const ratingMap = {
    1:  'D-',  2:  'D',  3:  'D+',
    4:  'C-',  5:  'C',  6:  'C+',
    7:  'B-',  8:  'B',  9:  'B+',
    10: 'A-', 11: 'A', 12: 'A+',
    13: 'S-', 14: 'S', 15: 'S+'
  };
  
  /**
   * Parses a 6-digit mutagen code into priorities and rating.
   * @param {number|string} code
   * @returns {{ priorities: number[], rating: string }}
   */
  export function parseMutagen(code) {
    const s = String(code).padStart(6, '0');
    const priorities = s
      .slice(0, 4)
      .split('')
      .map(d => Number(d));
    const ratingCode = Number(s.slice(4, 6));
    return {
      priorities,
      rating: ratingMap[ratingCode] || 'Unknown'
    };
  }