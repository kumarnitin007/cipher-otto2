/**
 * Cipher category definitions with icons
 * Used for displaying cipher information and categorization
 */
export const categories = {
  substitution: { name: 'Substitution', icon: '🔤' },
  polygraphic: { name: 'Polygraphic', icon: '🔢' },
  transposition: { name: 'Transposition', icon: '↔️' },
  encoding: { name: 'Encoding', icon: '💾' },
  polyalphabetic: { name: 'Polyalphabetic', icon: '🔄' },
  puzzle: { name: 'Puzzle', icon: '🧩' }
};

/**
 * Returns Tailwind CSS color class based on difficulty level
 * @param {string} difficulty - Difficulty level ('beginner', 'intermediate', 'advanced')
 * @returns {string} Tailwind CSS color class
 */
export const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'beginner': return 'text-green-300';      // Green for easy
    case 'intermediate': return 'text-yellow-300'; // Yellow for medium
    case 'advanced': return 'text-red-300';        // Red for hard
    default: return 'text-gray-300';
  }
};

/**
 * Returns star emoji badge based on difficulty level
 * @param {string} difficulty - Difficulty level
 * @returns {string} Star emoji string (⭐, ⭐⭐, or ⭐⭐⭐)
 */
export const getDifficultyBadge = (difficulty) => {
  switch(difficulty) {
    case 'beginner': return '⭐';      // 1 star
    case 'intermediate': return '⭐⭐'; // 2 stars
    case 'advanced': return '⭐⭐⭐';    // 3 stars
    default: return '';
  }
};

