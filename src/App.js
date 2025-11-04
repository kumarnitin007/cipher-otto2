import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Unlock, BookOpen, Trophy, Heart, Coffee, DollarSign, ChevronDown, ChevronUp, Info, Copy, Check, Sparkles, Star, History, BarChart3, Search, Share2, Bookmark, X, Zap, RotateCcw } from 'lucide-react';

// ============================================================================
// Animated Otter Component
// ============================================================================
/**
 * Animated Otter mascot component that waves every 3 seconds
 * Uses SVG to render a friendly otter character with animation
 */
const AnimatedOtter = () => {
  // State to control waving animation
  const [isWaving, setIsWaving] = useState(false);
  
  // Set up interval to trigger waving animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true);
      // Reset waving after 600ms
      setTimeout(() => setIsWaving(false), 600);
    }, 3000);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-24 h-24 mx-auto">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-blue-400/30 rounded-full animate-pulse" />
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="65" rx="22" ry="18" fill="#8B4513" />
        <ellipse cx="50" cy="68" rx="14" ry="12" fill="#D2691E" />
        <circle cx="50" cy="40" r="18" fill="#8B4513" />
        <circle cx="38" cy="32" r="5" fill="#654321" />
        <circle cx="62" cy="32" r="5" fill="#654321" />
        <ellipse cx="50" cy="45" rx="12" ry="10" fill="#D2691E" />
        <g className="animate-pulse">
          <circle cx="44" cy="38" r="3" fill="#000" />
          <circle cx="56" cy="38" r="3" fill="#000" />
          <circle cx="45" cy="37" r="1.5" fill="#fff" />
          <circle cx="57" cy="37" r="1.5" fill="#fff" />
        </g>
        <ellipse cx="50" cy="44" rx="3" ry="2" fill="#000" />
        <line x1="35" y1="42" x2="28" y2="41" stroke="#000" strokeWidth="0.5" />
        <line x1="35" y1="44" x2="28" y2="45" stroke="#000" strokeWidth="0.5" />
        <line x1="65" y1="42" x2="72" y2="41" stroke="#000" strokeWidth="0.5" />
        <line x1="65" y1="44" x2="72" y2="45" stroke="#000" strokeWidth="0.5" />
        <g style={{ animation: isWaving ? 'wave 0.6s ease-in-out' : 'none', transformOrigin: '30px 55px' }}>
          <ellipse cx="30" cy="58" rx="6" ry="10" fill="#8B4513" transform="rotate(-20 30 58)" />
          <circle cx="28" cy="65" r="4" fill="#D2691E" />
        </g>
        <ellipse cx="70" cy="58" rx="6" ry="10" fill="#8B4513" transform="rotate(20 70 58)" />
        <circle cx="72" cy="65" r="4" fill="#D2691E" />
        <ellipse cx="50" cy="80" rx="8" ry="4" fill="#654321" />
        {isWaving && (
          <path d="M 65 25 C 65 22 67 20 69 20 C 71 20 73 22 73 25 C 73 28 69 32 69 32 C 69 32 65 28 65 25 Z" fill="#ff69b4" className="animate-ping" opacity="0.8" />
        )}
      </svg>
      <style>{`@keyframes wave { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }`}</style>
    </div>
  );
};

// ============================================================================
// Cipher Algorithms
// ============================================================================
/**
 * Caesar Cipher - One of the oldest and simplest substitution ciphers
 * Works by shifting each letter in the alphabet by a fixed number of positions
 * Example: With shift=3, A becomes D, B becomes E, etc.
 */
const caesarCipher = {
  name: 'Caesar Cipher',
  description: 'Shift each letter by a fixed number',
  category: 'substitution',
  difficulty: 'beginner',
  info: 'Named after Julius Caesar, who used it with a shift of 3.',
  youtubeUrl: 'https://www.youtube.com/watch?v=sMOZf4GN3oc',
  funMessage: 'Julius Caesar used this cipher over 2000 years ago! Try shifting your name by 3!',
  relatedCiphers: [
    { name: 'ROT13', inApp: false, description: 'A special Caesar cipher with shift of 13, commonly used in online forums' },
    { name: 'Atbash Cipher', inApp: true, description: 'Reverses the alphabet - A becomes Z, B becomes Y' },
    { name: 'Aristocrat Cipher', inApp: true, description: 'Random letter substitution that preserves word spaces' },
    { name: 'Affine Cipher', inApp: true, description: 'Mathematical substitution using multiplication and addition' }
  ],
  /**
   * Encrypts text by shifting each letter forward by the shift amount
   * @param {string} text - Plaintext to encrypt
   * @param {number} shift - Number of positions to shift (0-25)
   * @returns {string} Encrypted text
   */
  encrypt: (text, shift = 3) => {
    shift = parseInt(shift) || 3;
    return text.split('').map(char => {
      // Only process letters, preserve other characters
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        // Determine base: 65 for uppercase (A), 97 for lowercase (a)
        const base = code >= 65 && code <= 90 ? 65 : 97;
        // Shift letter and wrap around using modulo 26
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    }).join('');
  },
  /**
   * Decrypts text by shifting backwards (equivalent to encrypting with 26-shift)
   * @param {string} text - Ciphertext to decrypt
   * @param {number} shift - Number of positions the text was shifted
   * @returns {string} Decrypted text
   */
  decrypt: (text, shift = 3) => {
    shift = parseInt(shift) || 3;
    // Decryption is encryption with the inverse shift (26 - shift)
    return caesarCipher.encrypt(text, 26 - shift);
  }
};

const atbashCipher = {
  name: 'Atbash Cipher',
  description: 'Reverse alphabet substitution',
  category: 'substitution',
  difficulty: 'beginner',
  info: 'One of the oldest known ciphers. A becomes Z, B becomes Y.',
  youtubeUrl: 'https://www.youtube.com/watch?v=17o9l4D2xyI',
  funMessage: 'The alphabet is doing a backflip! Try encrypting PIZZA!',
  relatedCiphers: [
    { name: 'Caesar Cipher', inApp: true, description: 'Shifts letters by a fixed amount' },
    { name: 'Aristocrat Cipher', inApp: true, description: 'Random letter substitution with preserved spaces' },
    { name: 'Simple Substitution', inApp: false, description: 'Each letter maps to another letter randomly' },
    { name: 'Pigpen Cipher', inApp: false, description: 'Substitutes letters with geometric symbols' }
  ],
  encrypt: (text) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpper = code >= 65 && code <= 90;
        const base = isUpper ? 65 : 97;
        return String.fromCharCode(base + (25 - (code - base)));
      }
      return char;
    }).join('');
  },
  decrypt: (text) => atbashCipher.encrypt(text)
};

const aristocratCipher = {
  name: 'Aristocrat Cipher',
  description: 'Monoalphabetic substitution with spaces',
  category: 'substitution',
  difficulty: 'intermediate',
  info: 'A substitution cipher that preserves word boundaries.',
  youtubeUrl: 'https://www.youtube.com/watch?v=tKSqkglfqJU',
  funMessage: 'Be a detective like Sherlock Holmes! Look for THE and AND!',
  key: 'ZEBRASCDFGHIJKLMNOPQTUVWXY',
  relatedCiphers: [
    { name: 'Patristocrat Cipher', inApp: true, description: 'Same as Aristocrat but removes all spaces between words' },
    { name: 'Caesar Cipher', inApp: true, description: 'Simple shift substitution cipher' },
    { name: 'Atbash Cipher', inApp: true, description: 'Reverses the alphabet completely' },
    { name: 'Affine Cipher', inApp: true, description: 'Mathematical substitution cipher' }
  ],
  encrypt: (text) => {
    const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = aristocratCipher.key;
    return text.toUpperCase().split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return key[plain.indexOf(char)];
      }
      return char;
    }).join('');
  },
  decrypt: (text) => {
    const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = aristocratCipher.key;
    return text.toUpperCase().split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return plain[key.indexOf(char)];
      }
      return char;
    }).join('');
  }
};

/**
 * Affine Cipher - Mathematical substitution cipher
 * Uses formula: E(x) = (ax + b) mod 26
 * 'a' must be coprime with 26 (gcd(a,26) = 1)
 * Valid values for 'a': 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25
 */
const affineCipher = {
  name: 'Affine Cipher',
  description: 'Mathematical cipher using formula',
  category: 'substitution',
  difficulty: 'advanced',
  info: 'Uses formula E(x) = (ax + b) mod 26.',
  youtubeUrl: 'https://www.youtube.com/watch?v=fEHRZhVSkwQ',
  funMessage: 'Math plus secret codes equals AWESOME!',
  relatedCiphers: [
    { name: 'Caesar Cipher', inApp: true, description: 'Special case of Affine where a=1' },
    { name: 'Atbash Cipher', inApp: true, description: 'Special case of Affine where a=-1, b=-1' },
    { name: 'Multiplicative Cipher', inApp: false, description: 'Affine cipher where b=0' }
  ],
  /**
   * Encrypts text using the affine formula: E(x) = (ax + b) mod 26
   * @param {string} text - Plaintext to encrypt
   * @param {number} a - Multiplier (must be coprime with 26)
   * @param {number} b - Shift amount (0-25)
   * @returns {string} Encrypted text
   */
  encrypt: (text, a = 5, b = 8) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        // Convert letter to number (0-25)
        const x = code - base;
        // Apply affine transformation: (a*x + b) mod 26
        return String.fromCharCode(((a * x + b) % 26) + base);
      }
      return char;
    }).join('');
  },
  /**
   * Decrypts text using the inverse affine formula: D(y) = a^-1(y - b) mod 26
   * @param {string} text - Ciphertext to decrypt
   * @param {number} a - Multiplier used in encryption
   * @param {number} b - Shift amount used in encryption
   * @returns {string} Decrypted text
   */
  decrypt: (text, a = 5, b = 8) => {
    /**
     * Find modular multiplicative inverse of 'a' modulo 'm'
     * Finds x such that (a * x) mod m = 1
     */
    const modInverse = (a, m) => {
      for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
      }
      return 1;
    };
    // Calculate modular inverse of 'a' for decryption
    const aInv = modInverse(a, 26);
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        // Convert encrypted letter to number
        const y = code - base;
        // Apply inverse transformation: a^-1(y - b) mod 26
        // Add 26 before mod to handle negative values
        return String.fromCharCode(((aInv * (y - b + 26)) % 26) + base);
      }
      return char;
    }).join('');
  }
};

const nihilistCipher = {
  name: 'Nihilist Cipher',
  description: 'Polybius square with numerical addition',
  category: 'polygraphic',
  difficulty: 'advanced',
  info: 'Used by Russian Nihilists in the 1880s. Combines Polybius square with numerical addition.',
  youtubeUrl: 'https://www.youtube.com/watch?v=FLmk983WHg8&t=366s',
  funMessage: 'Russian revolutionaries used this! Turns letters into numbers!',
  relatedCiphers: [
    { name: 'Straddling Checkerboard', inApp: true, description: 'Variable-length numerical encoding used by Soviet spies' },
    { name: 'Polybius Square', inApp: false, description: 'Converts letters to coordinates in a 5×5 grid' }
  ],
  encrypt: (text, keyword = 'CRYPTO', polybiusKey = 'CRYPTO') => {
    const createSquare = (key) => {
      const uniqueKey = [...new Set(key.toUpperCase().replace(/J/g, 'I').split(''))].join('');
      const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      let square = uniqueKey;
      for (let char of alphabet) {
        if (!square.includes(char)) square += char;
      }
      return square.slice(0, 25);
    };
    const square = createSquare(polybiusKey);
    const getCoords = (char) => {
      const idx = square.indexOf(char === 'J' ? 'I' : char);
      return idx === -1 ? null : [Math.floor(idx / 5) + 1, (idx % 5) + 1];
    };
    const keyCoords = keyword.toUpperCase().split('').map(c => getCoords(c));
    const textClean = text.toUpperCase().replace(/[^A-Z]/g, '');
    let result = [];
    let keyIndex = 0;
    for (let char of textClean) {
      const textCoord = getCoords(char);
      if (textCoord && keyCoords[keyIndex]) {
        const sum = (textCoord[0] * 10 + textCoord[1]) + (keyCoords[keyIndex][0] * 10 + keyCoords[keyIndex][1]);
        result.push(sum);
        keyIndex = (keyIndex + 1) % keyCoords.length;
      }
    }
    return result.join(' ');
  },
  decrypt: (text, keyword = 'CRYPTO', polybiusKey = 'CRYPTO') => {
    const createSquare = (key) => {
      const uniqueKey = [...new Set(key.toUpperCase().replace(/J/g, 'I').split(''))].join('');
      const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      let square = uniqueKey;
      for (let char of alphabet) {
        if (!square.includes(char)) square += char;
      }
      return square.slice(0, 25);
    };
    const square = createSquare(polybiusKey);
    const getChar = (row, col) => {
      if (row < 1 || row > 5 || col < 1 || col > 5) return '?';
      return square[(row - 1) * 5 + (col - 1)];
    };
    const getCoords = (char) => {
      const idx = square.indexOf(char === 'J' ? 'I' : char);
      return idx === -1 ? null : [Math.floor(idx / 5) + 1, (idx % 5) + 1];
    };
    const keyCoords = keyword.toUpperCase().split('').map(c => getCoords(c));
    const numbers = text.split(' ').map(n => parseInt(n)).filter(n => !isNaN(n));
    let result = '';
    let keyIndex = 0;
    for (let num of numbers) {
      if (keyCoords[keyIndex]) {
        const keyVal = keyCoords[keyIndex][0] * 10 + keyCoords[keyIndex][1];
        const diff = num - keyVal;
        result += getChar(Math.floor(diff / 10), diff % 10);
        keyIndex = (keyIndex + 1) % keyCoords.length;
      }
    }
    return result;
  }
};

const checkerboardCipher = {
  name: 'Straddling Checkerboard',
  description: 'Variable-length numerical encoding',
  category: 'polygraphic',
  difficulty: 'advanced',
  info: 'Used by Soviet spies during the Cold War.',
  youtubeUrl: 'https://www.youtube.com/watch?v=1ggE6xkeQUw',
  funMessage: 'Cold War spies LOVED this cipher! Real spy techniques!',
  relatedCiphers: [
    { name: 'Nihilist Cipher', inApp: true, description: 'Russian cipher using Polybius square with addition' }
  ],
  encrypt: (text, key = 'CRYPTO', blankPositions = '2,6') => {
    const blanks = blankPositions.split(',').map(n => parseInt(n.trim()));
    const alphabet = [...new Set(key.toUpperCase() + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.replace(/J/g, 'I'))].join('').slice(0, 28);
    const board = {};
    let letterIndex = 0;
    for (let col = 0; col < 10; col++) {
      if (!blanks.includes(col)) {
        board[alphabet[letterIndex]] = col.toString();
        letterIndex++;
      }
    }
    for (let blank of blanks) {
      for (let col = 0; col < 10; col++) {
        if (letterIndex < alphabet.length) {
          board[alphabet[letterIndex]] = blank.toString() + col.toString();
          letterIndex++;
        }
      }
    }
    const cleanText = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    return cleanText.split('').map(c => board[c] || '').join('');
  },
  decrypt: () => 'Requires board reconstruction'
};

const columnarCipher = {
  name: 'Complete Columnar',
  description: 'Transposition using keyword order',
  category: 'transposition',
  difficulty: 'intermediate',
  info: 'Text is rearranged based on keyword order.',
  youtubeUrl: 'https://www.youtube.com/watch?v=sblLDrZEfDM',
  funMessage: 'Your message does a dance and switches places!',
  relatedCiphers: [
    { name: 'Rail Fence Cipher', inApp: false, description: 'Writes text in zigzag pattern across rails' },
    { name: 'Route Cipher', inApp: false, description: 'Writes message in grid and reads in different pattern' }
  ],
  encrypt: (text, keyword = 'CRYPTO') => {
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const keyLength = keyword.length;
    const keyOrder = keyword.toUpperCase().split('').map((char, idx) => ({ char, idx }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map((item, sortedIdx) => ({ ...item, order: sortedIdx }))
      .sort((a, b) => a.idx - b.idx)
      .map(item => item.order);
    const rows = Math.ceil(cleanText.length / keyLength);
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < keyLength; j++) {
        const charIndex = i * keyLength + j;
        grid[i][j] = charIndex < cleanText.length ? cleanText[charIndex] : 'X';
      }
    }
    let result = '';
    keyOrder.forEach((colIdx, order) => {
      const column = keyOrder.indexOf(order);
      for (let row = 0; row < rows; row++) {
        result += grid[row][column];
      }
    });
    return result;
  },
  decrypt: (text, keyword = 'CRYPTO') => {
    const keyLength = keyword.length;
    const rows = Math.ceil(text.length / keyLength);
    const keyOrder = keyword.toUpperCase().split('').map((char, idx) => ({ char, idx }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map((item, sortedIdx) => ({ ...item, order: sortedIdx }))
      .sort((a, b) => a.idx - b.idx)
      .map(item => item.order);
    const grid = Array(rows).fill().map(() => Array(keyLength).fill(''));
    let textIndex = 0;
    keyOrder.forEach((colIdx, order) => {
      const column = keyOrder.indexOf(order);
      for (let row = 0; row < rows; row++) {
        if (textIndex < text.length) {
          grid[row][column] = text[textIndex++];
        }
      }
    });
    let result = '';
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < keyLength; col++) {
        result += grid[row][col];
      }
    }
    return result.replace(/X+$/, '');
  }
};

const baconianCipher = {
  name: 'Baconian Cipher',
  description: 'Binary encoding with A and B',
  category: 'encoding',
  difficulty: 'beginner',
  info: 'Invented by Francis Bacon using As and Bs.',
  youtubeUrl: 'https://www.youtube.com/watch?v=T6lg0qC27I4',
  youtubeUrlAdvanced: 'https://www.youtube.com/watch?v=bQosctxFQFs',
  funMessage: 'This cipher uses only As and Bs! Like computer code from the 1600s!',
  relatedCiphers: [
    { name: 'Morse Code', inApp: false, description: 'Uses dots and dashes to encode letters' },
    { name: 'Binary Code', inApp: false, description: 'Modern digital encoding using 0s and 1s' }
  ],
  encrypt: (text) => {
    const bacon = {
      'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB', 'E': 'AABAA',
      'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB', 'I': 'ABAAA', 'J': 'ABAAA',
      'K': 'ABAAB', 'L': 'ABABA', 'M': 'ABABB', 'N': 'ABBAA', 'O': 'ABBAB',
      'P': 'ABBBA', 'Q': 'ABBBB', 'R': 'BAAAA', 'S': 'BAAAB', 'T': 'BAABA',
      'U': 'BAABB', 'V': 'BAABB', 'W': 'BABAA', 'X': 'BABAB', 'Y': 'BABBA',
      'Z': 'BABBB'
    };
    return text.toUpperCase().split('').map(c => bacon[c] || c).join(' ');
  },
  decrypt: (text) => {
    const bacon = {
      'AAAAA': 'A', 'AAAAB': 'B', 'AAABA': 'C', 'AAABB': 'D', 'AABAA': 'E',
      'AABAB': 'F', 'AABBA': 'G', 'AABBB': 'H', 'ABAAA': 'I', 'ABAAB': 'K',
      'ABABA': 'L', 'ABABB': 'M', 'ABBAA': 'N', 'ABBAB': 'O', 'ABBBA': 'P',
      'ABBBB': 'Q', 'BAAAA': 'R', 'BAAAB': 'S', 'BAABA': 'T', 'BAABB': 'U',
      'BABAA': 'W', 'BABAB': 'X', 'BABBA': 'Y', 'BABBB': 'Z'
    };
    return text.split(' ').map(code => bacon[code] || code).join('');
  }
};

const portaCipher = {
  name: 'Porta Cipher',
  description: 'Polyalphabetic substitution with keyword',
  category: 'polyalphabetic',
  difficulty: 'intermediate',
  info: 'Created by Giovanni Battista della Porta in 1563. Uses 13 alphabets.',
  youtubeUrl: 'https://www.youtube.com/watch?v=mXOcQ8QwlYI',
  funMessage: 'This Renaissance cipher uses 13 alphabets! It\'s self-reciprocal!',
  relatedCiphers: [
    { name: 'Vigenère Cipher', inApp: false, description: 'Classic polyalphabetic cipher using keyword' },
    { name: 'Beaufort Cipher', inApp: false, description: 'Similar to Vigenère but uses subtraction' },
    { name: 'Caesar Cipher', inApp: true, description: 'Simple shift cipher' }
  ],
  encrypt: (text, keyword = 'CRYPTO') => {
    const tableau = {
      'AB': 'NOPQRSTUVWXYZABCDEFGHIJKLM',
      'CD': 'OPQRSTUVWXYZNMABCDEFGHIJKL',
      'EF': 'PQRSTUVWXYZNOLMABCDEFGHIJK',
      'GH': 'QRSTUVWXYZNOPKLMABCDEFGHIJ',
      'IJ': 'RSTUVWXYZNOPQJKLMABCDEFGHI',
      'KL': 'STUVWXYZNOPQRIJKLMABCDEFGH',
      'MN': 'TUVWXYZNOPQRSHIJKLMABCDEFG',
      'OP': 'UVWXYZNOPQRSTGHIJKLMABCDEF',
      'QR': 'VWXYZNOPQRSTUFGHIJKLMABCDE',
      'ST': 'WXYZNOPQRSTUVEFGHIJKLMABCD',
      'UV': 'XYZNOPQRSTUVWDEFGHIJKLMABC',
      'WX': 'YZNOPQRSTUVWXCDEFGHIJKLMAB',
      'YZ': 'ZNOPQRSTUVWXYBCDEFGHIJKLMA'
    };
    
    const getAlphabet = (char) => {
      char = char.toUpperCase();
      for (let key in tableau) {
        if (key.includes(char)) return tableau[key];
      }
      return tableau['AB'];
    };
    
    const plainAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, '');
    
    let result = '';
    for (let i = 0; i < cleanText.length; i++) {
      const keyChar = cleanKey[i % cleanKey.length];
      const textChar = cleanText[i];
      const alphabet = getAlphabet(keyChar);
      const index = plainAlpha.indexOf(textChar);
      result += alphabet[index];
    }
    return result;
  },
  decrypt: (text, keyword = 'CRYPTO') => {
    // Porta cipher is self-reciprocal
    return portaCipher.encrypt(text, keyword);
  }
};

const patristocratCipher = {
  name: 'Patristocrat Cipher',
  description: 'Monoalphabetic substitution without spaces',
  category: 'substitution',
  difficulty: 'intermediate',
  info: 'Similar to Aristocrat but removes all spaces, making it harder to solve.',
  youtubeUrl: 'https://www.youtube.com/watch?v=WRhiaHFBZLw',
  funMessage: 'No spaces allowed! This makes word boundaries invisible!',
  key: 'ZEBRASCDFGHIJKLMNOPQTUVWXY',
  relatedCiphers: [
    { name: 'Aristocrat Cipher', inApp: true, description: 'Same cipher but preserves spaces' },
    { name: 'Caesar Cipher', inApp: true, description: 'Simple shift substitution' },
    { name: 'Atbash Cipher', inApp: true, description: 'Reverses the alphabet' }
  ],
  encrypt: (text) => {
    const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = patristocratCipher.key;
    return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return key[plain.indexOf(char)];
      }
      return '';
    }).join('');
  },
  decrypt: (text) => {
    const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = patristocratCipher.key;
    return text.toUpperCase().split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return plain[key.indexOf(char)];
      }
      return char;
    }).join('');
  }
};

const cryptarithmCipher = {
  name: 'Cryptarithm',
  description: 'Mathematical puzzle with letter substitution',
  category: 'puzzle',
  difficulty: 'advanced',
  info: 'A type of mathematical puzzle where digits are replaced by letters. Each letter represents a unique digit, and the equation must be mathematically correct.',
  youtubeUrl: 'https://puzzles-to-print.com/math-puzzles/cryptarithms.shtml',
  funMessage: 'Math meets cryptography! SEND + MORE = MONEY can you solve it?',
  relatedCiphers: [
    { name: 'Aristocrat Cipher', inApp: true, description: 'Letter substitution puzzle' },
    { name: 'Alphametics', inApp: false, description: 'Classic cryptarithm puzzles' }
  ],
  /**
   * Parses a cryptarithm equation into its component words and operator
   * Example: "SEND + MORE = MONEY" → { parts: [{word: 'SEND'}, {word: 'MORE'}, {word: 'MONEY'}], operator: '+' }
   * @param {string} equation - Equation string (e.g., "SEND + MORE = MONEY")
   * @returns {Object} Object with parts array and operator
   */
  parseEquation: (equation) => {
    const cleaned = equation.toUpperCase().replace(/\s+/g, ' ').trim();
    const operators = ['+', '-', '*', '/', '=', '×', '÷'];
    let parts = []; // Array of word objects
    let currentWord = ''; // Accumulating current word
    let operator = null; // Mathematical operator (+, -, *, /)
    
    // Parse equation character by character
    for (let char of cleaned) {
      if (operators.includes(char)) {
        // Found an operator, save current word if exists
        if (currentWord) {
          parts.push({ type: 'word', value: currentWord });
          currentWord = '';
        }
        // Track the operator (first non-= operator is the main operator)
        if (char === '=') {
          operator = '=';
        } else if (operator === null) {
          operator = char;
        }
      } else if (char.match(/[A-Z]/)) {
        // Accumulate letters into current word
        currentWord += char;
      } else if (char === ' ') {
        // Skip spaces
      }
    }
    // Save last word if exists
    if (currentWord) {
      parts.push({ type: 'word', value: currentWord });
    }
    
    return { parts, operator };
  },
  
  /**
   * Converts a word to a number using the letter-to-digit mapping
   * Example: wordToNumber("SEND", {S:'9', E:'5', N:'6', D:'7'}) → 9567
   * @param {string} word - Word to convert (e.g., "SEND")
   * @param {Object} mapping - Letter-to-digit mapping object
   * @returns {number|null} Number representation or null if mapping incomplete/invalid
   */
  wordToNumber: (word, mapping) => {
    let numStr = '';
    // Convert each letter to its mapped digit
    for (let char of word) {
      if (mapping[char] !== undefined) {
        numStr += mapping[char];
      } else {
        return null; // Mapping incomplete - letter not found
      }
    }
    // Check for leading zeros (invalid in cryptarithms - numbers can't start with 0)
    if (numStr.length > 1 && numStr[0] === '0') {
      return null;
    }
    return parseInt(numStr);
  },
  
  /**
   * Validates if a cryptarithm equation is mathematically correct
   * Checks: mapping completeness, unique digit assignment, mathematical correctness
   * @param {string} equation - Equation to validate (e.g., "SEND + MORE = MONEY")
   * @param {Object} mapping - Letter-to-digit mapping object
   * @returns {Object} Validation result with {valid: boolean, error?: string, result?: number, numbers?: Array}
   */
  validateEquation: (equation, mapping) => {
    // Step 1: Parse equation into components
    const parsed = cryptarithmCipher.parseEquation(equation);
    if (parsed.parts.length < 3 || !parsed.operator) {
      return { valid: false, error: 'Invalid equation format' };
    }
    
    // Step 2: Convert words to numbers
    const words = parsed.parts.map(p => p.value);
    const numbers = words.map(w => cryptarithmCipher.wordToNumber(w, mapping));
    
    // Step 3: Check if all mappings are complete
    if (numbers.some(n => n === null)) {
      return { valid: false, error: 'Incomplete letter mapping' };
    }
    
    // Step 4: Check for duplicate digits (each letter must map to unique digit)
    const digitValues = Object.values(mapping);
    if (new Set(digitValues).size !== digitValues.length) {
      return { valid: false, error: 'Each letter must map to a unique digit' };
    }
    
    // Step 5: Perform the mathematical calculation
    let result;
    if (parsed.operator === '+' || parsed.operator === undefined) {
      result = numbers[0] + numbers[1];
    } else if (parsed.operator === '-') {
      result = numbers[0] - numbers[1];
    } else if (parsed.operator === '*' || parsed.operator === '×') {
      result = numbers[0] * numbers[1];
    } else if (parsed.operator === '/' || parsed.operator === '÷') {
      if (numbers[1] === 0) return { valid: false, error: 'Division by zero' };
      result = numbers[0] / numbers[1];
    }
    
    // Step 6: Compare calculated result with expected result (third word)
    const expectedResult = numbers[2];
    if (result === expectedResult) {
      return { valid: true, result: result, numbers: numbers };
    } else {
      return { valid: false, error: `Equation doesn't balance: ${numbers[0]} ${parsed.operator} ${numbers[1]} = ${result}, but expected ${expectedResult}` };
    }
  },
  
  encrypt: (text, mapping = null) => {
    // If mapping is provided as string, parse it
    let digitMap = mapping;
    if (!mapping) {
      // Default mapping for SEND + MORE = MONEY
      digitMap = {
        'S': '9', 'E': '5', 'N': '6', 'D': '7',
        'M': '1', 'O': '0', 'R': '8', 'Y': '2'
      };
    } else if (typeof mapping === 'string') {
      // Parse string format like "S=9,E=5,N=6,D=7,M=1,O=0,R=8,Y=2"
      digitMap = {};
      mapping.split(',').forEach(pair => {
        const [letter, digit] = pair.split('=').map(s => s.trim());
        if (letter && digit) {
          digitMap[letter.toUpperCase()] = digit;
        }
      });
    }
    
    return text.toUpperCase().split('').map(char => {
      if (digitMap && digitMap[char]) {
        return digitMap[char];
      }
      return char;
    }).join('');
  },
  
  decrypt: (text, mapping = null) => {
    // Reverse mapping: digit to letter
    let letterMap = {};
    if (!mapping) {
      // Default reverse mapping
      letterMap = {
        '9': 'S', '5': 'E', '6': 'N', '7': 'D',
        '1': 'M', '0': 'O', '8': 'R', '2': 'Y'
      };
    } else if (typeof mapping === 'string') {
      // Parse and reverse
      mapping.split(',').forEach(pair => {
        const [letter, digit] = pair.split('=').map(s => s.trim());
        if (letter && digit) {
          letterMap[digit] = letter.toUpperCase();
        }
      });
    } else {
      // If mapping is object, reverse it
      for (let [letter, digit] of Object.entries(mapping)) {
        letterMap[digit] = letter.toUpperCase();
      }
    }
    
    return text.split('').map(char => {
      if (letterMap[char]) {
        return letterMap[char];
      }
      return char;
    }).join('');
  }
};

const fractionatedMorseCipher = {
  name: 'Fractionated Morse',
  description: 'Morse code with keyword substitution',
  category: 'polyalphabetic',
  difficulty: 'advanced',
  info: 'Converts text to Morse code, then groups into triplets and substitutes using a keyword-based table. Popular in cryptography competitions.',
  youtubeUrl: 'https://www.youtube.com/watch?v=lDWsHyyoW_A',
  funMessage: 'Morse code meets substitution! This is a favorite in crypto competitions!',
  relatedCiphers: [
    { name: 'Nihilist Cipher', inApp: true, description: 'Also uses keyword-based substitution with numbers' },
    { name: 'Morse Code', inApp: false, description: 'Basic encoding using dots and dashes' },
    { name: 'Porta Cipher', inApp: true, description: 'Another keyword-based polyalphabetic cipher' }
  ],
  encrypt: (text, keyword = 'CRYPTO') => {
    const morseCode = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.'
    };
    
    // Create substitution table from keyword
    const createTable = (key) => {
      const uniqueKey = [...new Set(key.toUpperCase().replace(/[^A-Z]/g, '').split(''))].join('');
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let table = uniqueKey;
      for (let char of alphabet) {
        if (!table.includes(char)) table += char;
      }
      return table.slice(0, 26);
    };
    
    const table = createTable(keyword);
    const cleanText = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Convert to Morse code
    let morse = '';
    for (let char of cleanText) {
      if (morseCode[char]) {
        morse += morseCode[char] + 'x'; // x is separator
      }
    }
    morse += 'xxx'; // Final separator
    
    // Group into triplets and substitute
    let result = '';
    for (let i = 0; i < morse.length; i += 3) {
      const triplet = morse.slice(i, i + 3).padEnd(3, 'x');
      const morseToTriplet = {
        '...': 0, '..-': 1, '..x': 2, '.-.': 3, '.--': 4, '.-x': 5,
        '.x.': 6, '.x-': 7, '.xx': 8, '-..': 9, '-.-': 10, '-.x': 11,
        '--.': 12, '---': 13, '--x': 14, '-x.': 15, '-x-': 16, '-xx': 17,
        'x..': 18, 'x.-': 19, 'x.x': 20, 'x-.': 21, 'x--': 22, 'x-x': 23,
        'xx.': 24, 'xx-': 25, 'xxx': 26
      };
      
      const index = morseToTriplet[triplet];
      if (index !== undefined && index < 26) {
        result += table[index];
      }
    }
    
    return result;
  },
  decrypt: (text, keyword = 'CRYPTO') => {
    const morseCode = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
      '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
      '---..': '8', '----.': '9'
    };
    
    const createTable = (key) => {
      const uniqueKey = [...new Set(key.toUpperCase().replace(/[^A-Z]/g, '').split(''))].join('');
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let table = uniqueKey;
      for (let char of alphabet) {
        if (!table.includes(char)) table += char;
      }
      return table.slice(0, 26);
    };
    
    const table = createTable(keyword);
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    // Convert letters back to triplets
    const tripletToMorse = {
      0: '...', 1: '..-', 2: '..x', 3: '.-.', 4: '.--', 5: '.-x',
      6: '.x.', 7: '.x-', 8: '.xx', 9: '-..', 10: '-.-', 11: '-.x',
      12: '--.', 13: '---', 14: '--x', 15: '-x.', 16: '-x-', 17: '-xx',
      18: 'x..', 19: 'x.-', 20: 'x.x', 21: 'x-.', 22: 'x--', 23: 'x-x',
      24: 'xx.', 25: 'xx-', 26: 'xxx'
    };
    
    let morse = '';
    for (let char of cleanText) {
      const index = table.indexOf(char);
      if (index !== -1 && index < 26) {
        morse += tripletToMorse[index] || '';
      }
    }
    
    // Convert Morse back to text
    let result = '';
    let currentMorse = '';
    let i = 0;
    while (i < morse.length) {
      const char = morse[i];
      if (char === 'x') {
        // 'x' is a separator, process accumulated morse
        if (currentMorse && morseCode[currentMorse]) {
          result += morseCode[currentMorse];
          currentMorse = '';
        }
        i++;
      } else {
        // Accumulate dots and dashes
        currentMorse += char;
        if (morseCode[currentMorse]) {
          result += morseCode[currentMorse];
          currentMorse = '';
        }
        i++;
      }
    }
    
    // Process any remaining morse
    if (currentMorse && morseCode[currentMorse]) {
      result += morseCode[currentMorse];
    }
    
    return result;
  }
};

const xenocryptCipher = {
  name: 'Xenocrypt',
  description: 'Spanish substitution cipher',
  category: 'substitution',
  difficulty: 'advanced',
  info: 'A monoalphabetic substitution cipher used on Spanish text. Uses the 27-letter Spanish alphabet including Ñ. Popular in cryptography competitions.',
  youtubeUrl: 'https://www.youtube.com/watch?v=aZ_94itKw28&t=39s',
  funMessage: '¡Hola! This cipher works with Spanish text! Try encrypting "HOLA MUNDO"!',
  relatedCiphers: [
    { name: 'Aristocrat Cipher', inApp: true, description: 'Similar monoalphabetic substitution cipher' },
    { name: 'Patristocrat Cipher', inApp: true, description: 'Same concept but removes spaces' },
    { name: 'Caesar Cipher', inApp: true, description: 'Simpler substitution cipher' }
  ],
  key: 'ZEBRASCDFGHIJKLMNOPQTUVWXYÑ',
  encrypt: (text, keyword = 'CRYPTO') => {
    // Create substitution key from keyword
    const createKey = (key) => {
      const uniqueKey = [...new Set(key.toUpperCase().replace(/[^A-ZÑ]/g, '').split(''))].join('');
      const spanishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
      let result = uniqueKey;
      for (let char of spanishAlphabet) {
        if (!result.includes(char)) result += char;
      }
      return result.slice(0, 27);
    };
    
    const substitutionKey = createKey(keyword);
    const plainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
    
    // Normalize Spanish text (convert accented to unaccented)
    const normalize = (str) => {
      return str.toUpperCase()
        .replace(/Á/g, 'A').replace(/É/g, 'E').replace(/Í/g, 'I')
        .replace(/Ó/g, 'O').replace(/Ú/g, 'U').replace(/Ü/g, 'U');
    };
    
    const normalizedText = normalize(text);
    
    return normalizedText.split('').map(char => {
      const index = plainAlphabet.indexOf(char);
      if (index !== -1) {
        return substitutionKey[index];
      }
      return char; // Keep spaces and punctuation
    }).join('');
  },
  decrypt: (text, keyword = 'CRYPTO') => {
    const createKey = (key) => {
      const uniqueKey = [...new Set(key.toUpperCase().replace(/[^A-ZÑ]/g, '').split(''))].join('');
      const spanishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
      let result = uniqueKey;
      for (let char of spanishAlphabet) {
        if (!result.includes(char)) result += char;
      }
      return result.slice(0, 27);
    };
    
    const substitutionKey = createKey(keyword);
    const plainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
    
    return text.toUpperCase().split('').map(char => {
      const index = substitutionKey.indexOf(char);
      if (index !== -1) {
        return plainAlphabet[index];
      }
      return char; // Keep spaces and punctuation
    }).join('');
  }
};

// ============================================================================
// Additional Cipher Implementations
// ============================================================================

/**
 * Rail Fence Cipher - Transposition cipher using zigzag pattern
 * 
 * Encryption: Writes text in a zigzag pattern across multiple rails (rows)
 * Example with 3 rails:
 *   H . . . O . . . R . . . 
 *   . E . L . W . L . D . .
 *   . . L . . . O . . . . .
 * 
 * Then reads horizontally: HOR + EWL D + L O = HOREWL DLO
 * 
 * Decryption: Reconstructs the zigzag pattern by calculating which characters
 * belong to which rail, then reads in the zigzag order
 */
const railfenceCipher = {
  name: 'Rail Fence',
  description: 'Zigzag transposition cipher',
  category: 'transposition',
  difficulty: 'intermediate',
  info: 'Writes the plaintext in a zigzag pattern across multiple rails, then reads off rows. The number of rails determines the encryption.',
  youtubeUrl: 'https://www.youtube.com/watch?v=U3h8gZ8h2YI',
  funMessage: 'Ride the rails! Text zigzags like a train track!',
  relatedCiphers: [
    { name: 'Columnar Transposition', inApp: true, description: 'Another transposition cipher' },
    { name: 'Scytale', inApp: false, description: 'Ancient Greek transposition cipher' }
  ],
  /**
   * Encrypts text by writing it in a zigzag pattern across rails
   * @param {string} text - Plaintext to encrypt
   * @param {number} rails - Number of rails (rows) to use (2-10)
   * @returns {string} Encrypted text (characters read horizontally from rails)
   */
  encrypt: (text, rails = 3) => {
    rails = parseInt(rails) || 3;
    if (rails < 2) rails = 2; // Minimum 2 rails required
    // Remove non-letters and convert to uppercase
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    // Create array of rails (each rail is an array of characters)
    const fence = Array(rails).fill(null).map(() => []);
    let row = 0; // Current rail (0-indexed)
    let direction = 1; // Direction of movement: 1 = down, -1 = up
    
    // Write characters in zigzag pattern
    for (let char of cleanText) {
      fence[row].push(char); // Add character to current rail
      row += direction; // Move to next rail
      // Reverse direction at top or bottom rail
      if (row === 0 || row === rails - 1) direction *= -1;
    }
    
    // Read characters horizontally from all rails
    return fence.map(row => row.join('')).join('');
  },
  /**
   * Decrypts text by reconstructing the zigzag pattern
   * @param {string} text - Ciphertext to decrypt
   * @param {number} rails - Number of rails used in encryption
   * @returns {string} Decrypted text
   */
  decrypt: (text, rails = 3) => {
    rails = parseInt(rails) || 3;
    if (rails < 2) rails = 2;
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const fence = Array(rails).fill(null).map(() => []);
    const lengths = []; // Track how many characters belong to each rail
    let row = 0;
    let direction = 1;
    
    // Step 1: Calculate how many characters belong to each rail
    // This simulates the zigzag writing pattern to determine rail lengths
    for (let i = 0; i < cleanText.length; i++) {
      lengths[row] = (lengths[row] || 0) + 1;
      row += direction;
      if (row === 0 || row === rails - 1) direction *= -1;
    }
    
    // Step 2: Distribute ciphertext characters into rails based on calculated lengths
    let index = 0;
    for (let r = 0; r < rails; r++) {
      // Take characters from ciphertext equal to this rail's length
      fence[r] = cleanText.slice(index, index + lengths[r]).split('');
      index += lengths[r];
    }
    
    // Step 3: Read characters in zigzag order to reconstruct plaintext
    let result = '';
    row = 0;
    direction = 1;
    const positions = Array(rails).fill(0); // Track position in each rail
    
    for (let i = 0; i < cleanText.length; i++) {
      // Read character from current rail at current position
      result += fence[row][positions[row]++];
      row += direction;
      // Reverse direction at edges
      if (row === 0 || row === rails - 1) direction *= -1;
    }
    
    return result;
  }
};

const polluxCipher = {
  name: 'Pollux',
  description: 'Morse code digit substitution cipher',
  category: 'substitution',
  difficulty: 'advanced',
  info: 'Converts text to Morse code, then substitutes dots and dashes with digits. Each dot/dash combination maps to a unique digit.',
  youtubeUrl: 'https://www.youtube.com/watch?v=U3h8gZ8h2YI',
  funMessage: 'Pollux transforms Morse code into numbers!',
  relatedCiphers: [
    { name: 'Morbit', inApp: true, description: 'Similar Morse code digit cipher' },
    { name: 'Fractionated Morse', inApp: true, description: 'Another Morse-based cipher' }
  ],
  encrypt: (text, mapping = null) => {
    const morseCode = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.'
    };
    
    // Default mapping: . = 5, - = 8
    const defaultMapping = mapping || { '.': '5', '-': '8' };
    
    const cleanText = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let morse = '';
    
    for (let char of cleanText) {
      if (morseCode[char]) {
        morse += morseCode[char] + 'x'; // x is separator
      }
    }
    morse += 'xxx'; // Final separator
    
    return morse.split('').map(symbol => {
      if (symbol === 'x') return ' ';
      return defaultMapping[symbol] || symbol;
    }).join('');
  },
  decrypt: (text, mapping = null) => {
    const morseToChar = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
      '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
      '---..': '8', '----.': '9'
    };
    
    const defaultMapping = mapping || { '.': '5', '-': '8' };
    const reverseMapping = {};
    for (let [key, value] of Object.entries(defaultMapping)) {
      reverseMapping[value] = key;
    }
    
    const digits = text.replace(/[^0-9\s]/g, '').split(' ');
    let morse = '';
    
    for (let digitGroup of digits) {
      for (let digit of digitGroup) {
        if (reverseMapping[digit]) {
          morse += reverseMapping[digit];
        }
      }
      morse += 'x';
    }
    
    let result = '';
    let currentMorse = '';
    for (let symbol of morse) {
      if (symbol === 'x') {
        if (morseToChar[currentMorse]) {
          result += morseToChar[currentMorse];
          currentMorse = '';
        }
      } else {
        currentMorse += symbol;
        if (morseToChar[currentMorse]) {
          result += morseToChar[currentMorse];
          currentMorse = '';
        }
      }
    }
    
    return result;
  }
};

const morbitCipher = {
  name: 'Morbit',
  description: 'Morse code digit substitution with pairs',
  category: 'substitution',
  difficulty: 'advanced',
  info: 'Similar to Pollux but uses pairs of digits. Converts text to Morse, then groups symbols and substitutes with digit pairs.',
  youtubeUrl: 'https://www.youtube.com/watch?v=U3h8gZ8h2YI',
  funMessage: 'Morbit pairs digits for extra complexity!',
  relatedCiphers: [
    { name: 'Pollux', inApp: true, description: 'Similar Morse code digit cipher' },
    { name: 'Fractionated Morse', inApp: true, description: 'Another Morse-based cipher' }
  ],
  encrypt: (text, mapping = null) => {
    const morseCode = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..'
    };
    
    // Default mapping: . = 1, - = 2, x = 3
    const defaultMapping = mapping || { '.': '1', '-': '2', 'x': '3' };
    
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    let morse = '';
    
    for (let char of cleanText) {
      if (morseCode[char]) {
        morse += morseCode[char] + 'x';
      }
    }
    morse += 'xxx';
    
    // Convert to digit pairs
    let result = '';
    for (let symbol of morse) {
      if (symbol === 'x') {
        result += defaultMapping['x'] || '3';
      } else {
        result += defaultMapping[symbol] || symbol;
      }
    }
    
    // Group into pairs
    return result.match(/.{1,2}/g)?.join(' ') || '';
  },
  decrypt: (text, mapping = null) => {
    const morseToChar = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z'
    };
    
    const defaultMapping = mapping || { '.': '1', '-': '2', 'x': '3' };
    const reverseMapping = {};
    for (let [key, value] of Object.entries(defaultMapping)) {
      reverseMapping[value] = key;
    }
    
    const digits = text.replace(/[^0-9\s]/g, '').replace(/\s/g, '');
    let morse = '';
    
    for (let digit of digits) {
      if (reverseMapping[digit]) {
        morse += reverseMapping[digit];
      }
    }
    
    let result = '';
    let currentMorse = '';
    for (let symbol of morse) {
      if (symbol === 'x') {
        if (morseToChar[currentMorse]) {
          result += morseToChar[currentMorse];
          currentMorse = '';
        }
      } else {
        currentMorse += symbol;
        if (morseToChar[currentMorse]) {
          result += morseToChar[currentMorse];
          currentMorse = '';
        }
      }
    }
    
    return result;
  }
};

/**
 * Vigenère Cipher - Polyalphabetic substitution cipher
 * 
 * Uses multiple Caesar ciphers based on a keyword
 * Each letter of the keyword determines the shift for the corresponding plaintext letter
 * The keyword repeats to cover the entire message
 * 
 * Example with keyword "KEY":
 *   Plaintext:  HELLO
 *   Keyword:    KEYKE  (repeated)
 *   Shifts:     K=10, E=4, Y=24, K=10, E=4
 *   Encrypted: ROVVS
 * 
 * Much stronger than Caesar cipher because the same letter encrypts differently
 * based on its position in the message
 */
const vigenereCipher = {
  name: 'Vigenère',
  description: 'Polyalphabetic substitution cipher',
  category: 'polyalphabetic',
  difficulty: 'intermediate',
  info: 'Uses a keyword to create multiple Caesar ciphers. Each letter of the keyword determines the shift for the corresponding plaintext letter.',
  youtubeUrl: 'https://www.youtube.com/watch?v=SkJcmCaHqS0',
  funMessage: 'Vigenère adds keyword-based shifts! Much stronger than Caesar!',
  relatedCiphers: [
    { name: 'Caesar Cipher', inApp: true, description: 'Single shift substitution' },
    { name: 'Porta Cipher', inApp: true, description: 'Another keyword-based cipher' },
    { name: 'Beaufort Cipher', inApp: false, description: 'Variant of Vigenère' }
  ],
  /**
   * Encrypts text using Vigenère cipher with keyword
   * @param {string} text - Plaintext to encrypt
   * @param {string} keyword - Keyword for encryption (repeated to match text length)
   * @returns {string} Encrypted text
   */
  encrypt: (text, keyword = 'KEY') => {
    // Clean keyword: remove non-letters, convert to uppercase
    const cleanKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'KEY';
    const cleanText = text.toUpperCase();
    let result = '';
    let keyIndex = 0; // Position in keyword (wraps around)
    
    for (let char of cleanText) {
      if (char.match(/[A-Z]/)) {
        // Get shift value from current keyword letter (0-25)
        const shift = cleanKeyword[keyIndex % cleanKeyword.length].charCodeAt(0) - 65;
        const code = char.charCodeAt(0);
        // Apply Caesar shift based on keyword letter
        const encrypted = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        result += encrypted;
        keyIndex++; // Move to next keyword letter
      } else {
        // Preserve non-letter characters
        result += char;
      }
    }
    
    return result;
  },
  /**
   * Decrypts text using Vigenère cipher with keyword
   * @param {string} text - Ciphertext to decrypt
   * @param {string} keyword - Keyword used for encryption
   * @returns {string} Decrypted text
   */
  decrypt: (text, keyword = 'KEY') => {
    const cleanKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'KEY';
    const cleanText = text.toUpperCase();
    let result = '';
    let keyIndex = 0;
    
    for (let char of cleanText) {
      if (char.match(/[A-Z]/)) {
        // Get shift value from current keyword letter
        const shift = cleanKeyword[keyIndex % cleanKeyword.length].charCodeAt(0) - 65;
        const code = char.charCodeAt(0);
        // Reverse the shift (subtract instead of add, add 26 to handle negatives)
        const decrypted = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        result += decrypted;
        keyIndex++;
      } else {
        result += char;
      }
    }
    
    return result;
  }
};

/**
 * RSA Cipher - Simplified asymmetric encryption for educational purposes
 * 
 * NOTE: This is a SIMPLIFIED version using small primes for demonstration only.
 * Real RSA uses much larger primes (hundreds of digits) for security.
 * 
 * How it works:
 * 1. Choose two primes: p and q (here: p=3, q=11)
 * 2. Calculate n = p * q (n = 33)
 * 3. Choose public exponent e (here: e=3)
 * 4. Calculate private exponent d (here: d=7)
 * 
 * Encryption: c = m^e mod n (where m is the message as a number)
 * Decryption: m = c^d mod n (where c is the ciphertext)
 * 
 * Public key: (n, e) - used for encryption
 * Private key: (n, d) - used for decryption
 */
const rsaCipher = {
  name: 'RSA',
  description: 'Asymmetric encryption (simplified)',
  category: 'substitution',
  difficulty: 'advanced',
  info: 'RSA is a public-key cryptosystem. This simplified version demonstrates the concept using small prime numbers for educational purposes.',
  youtubeUrl: 'https://www.youtube.com/watch?v=wXB-V_Keiu8',
  funMessage: 'RSA uses prime numbers for security! This is a simplified educational version.',
  relatedCiphers: [
    { name: 'Affine Cipher', inApp: true, description: 'Mathematical substitution cipher' },
    { name: 'Hill Cipher', inApp: true, description: 'Matrix-based cipher' }
  ],
  /**
   * Encrypts text using RSA public key
   * @param {string} text - Plaintext to encrypt
   * @param {Object} publicKey - Public key object {n: number, e: number}
   * @returns {string} Encrypted text as space-separated numbers
   */
  encrypt: (text, publicKey = null) => {
    // Simplified RSA for educational purposes
    // Using small primes: p=3, q=11, n=33, e=3, d=7
    const defaultKey = publicKey || { n: 33, e: 3 };
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    return cleanText.split('').map(char => {
      // Convert letter to number: A=1, B=2, ..., Z=26
      const m = char.charCodeAt(0) - 64;
      if (m < 1 || m > 26) return char;
      // RSA encryption: c = m^e mod n (modular exponentiation)
      // Note: For real RSA, this would use efficient modular exponentiation
      const c = Math.pow(m, defaultKey.e) % defaultKey.n;
      // Pad with zeros to ensure 2-digit format
      return c.toString().padStart(2, '0');
    }).join(' ');
  },
  /**
   * Decrypts text using RSA private key
   * @param {string} text - Ciphertext as space-separated numbers
   * @param {Object} privateKey - Private key object {n: number, d: number}
   * @returns {string} Decrypted text
   */
  decrypt: (text, privateKey = null) => {
    const defaultKey = privateKey || { n: 33, d: 7 };
    // Extract numbers from ciphertext
    const numbers = text.trim().split(/\s+/).filter(n => n.match(/^\d+$/));
    
    return numbers.map(num => {
      const c = parseInt(num);
      // RSA decryption: m = c^d mod n (modular exponentiation)
      const m = Math.pow(c, defaultKey.d) % defaultKey.n;
      // Convert number back to letter (1-26 maps to A-Z)
      if (m >= 1 && m <= 26) {
        return String.fromCharCode(m + 64);
      }
      return '?'; // Invalid decryption result
    }).join('');
  }
};

const aristocratMisspelledCipher = {
  name: 'Aristocrat Misspelled',
  description: 'Substitution cipher with intentional misspellings',
  category: 'substitution',
  difficulty: 'intermediate',
  info: 'Similar to Aristocrat cipher but includes common misspellings to make frequency analysis more challenging.',
  youtubeUrl: 'https://www.youtube.com/watch?v=U3h8gZ8h2YI',
  funMessage: 'Misspellings make this harder to crack!',
  relatedCiphers: [
    { name: 'Aristocrat Cipher', inApp: true, description: 'Standard substitution cipher' },
    { name: 'Patristocrat Cipher', inApp: true, description: 'Substitution without spaces' }
  ],
  encrypt: (text, key = null) => {
    // Use aristocrat cipher logic but with misspellings
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const defaultKey = key || 'ZEBRASCDFGHIJKLMNOPQTUVWXY';
    const substitutionKey = defaultKey.toUpperCase().padEnd(26, alphabet).slice(0, 26);
    
    const misspellings = {
      'THE': 'TEH', 'AND': 'NAD', 'YOU': 'YUO', 'THAT': 'THTA',
      'WITH': 'WIT', 'FOR': 'FORR', 'ARE': 'ARE', 'WAS': 'WAS'
    };
    
    let cleanText = text.toUpperCase();
    
    // Apply common misspellings
    for (let [correct, misspelled] of Object.entries(misspellings)) {
      cleanText = cleanText.replace(new RegExp(correct, 'g'), misspelled);
    }
    
    return cleanText.split('').map(char => {
      const index = alphabet.indexOf(char);
      if (index !== -1) {
        return substitutionKey[index];
      }
      return char;
    }).join('');
  },
  decrypt: (text, key = null) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const defaultKey = key || 'ZEBRASCDFGHIJKLMNOPQTUVWXY';
    const substitutionKey = defaultKey.toUpperCase().padEnd(26, alphabet).slice(0, 26);
    
    const reverseMisspellings = {
      'TEH': 'THE', 'NAD': 'AND', 'YUO': 'YOU', 'THTA': 'THAT',
      'WIT': 'WITH', 'FORR': 'FOR'
    };
    
    let result = text.toUpperCase().split('').map(char => {
      const index = substitutionKey.indexOf(char);
      if (index !== -1) {
        return alphabet[index];
      }
      return char;
    }).join('');
    
    // Fix misspellings
    for (let [misspelled, correct] of Object.entries(reverseMisspellings)) {
      result = result.replace(new RegExp(misspelled, 'g'), correct);
    }
    
    return result;
  }
};

const dancingMenCipher = {
  name: 'Dancing Men',
  description: 'Substitution cipher from Sherlock Holmes',
  category: 'encoding',
  difficulty: 'beginner',
  info: 'A substitution cipher where each letter is represented by a stick figure in different poses. Popularized in "The Adventure of the Dancing Men" by Arthur Conan Doyle.',
  youtubeUrl: 'https://www.youtube.com/watch?v=U3h8gZ8h2YI',
  funMessage: 'Sherlock Holmes would be proud! These dancing men hide secrets!',
  relatedCiphers: [
    { name: 'Baconian Cipher', inApp: true, description: 'Another encoding-based cipher' },
    { name: 'Aristocrat Cipher', inApp: true, description: 'Substitution cipher' }
  ],
  encrypt: (text, mapping = null) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const defaultMapping = mapping || {
      'A': '🕺', 'B': '💃', 'C': '👯', 'D': '🕴', 'E': '🧍',
      'F': '🧎', 'G': '🏃', 'H': '🚶', 'I': '🤸', 'J': '🤾',
      'K': '🤽', 'L': '🏊', 'M': '🧗', 'N': '🤹', 'O': '🚴',
      'P': '🏇', 'Q': '🏂', 'R': '⛷️', 'S': '🏄', 'T': '🏋️',
      'U': '🤼', 'V': '🤺', 'W': '🤸', 'X': '🧘', 'Y': '🤳', 'Z': '🧏'
    };
    
    return text.toUpperCase().split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return defaultMapping[char] || char;
      }
      return char;
    }).join('');
  },
  decrypt: (text, mapping = null) => {
    const defaultMapping = mapping || {
      '🕺': 'A', '💃': 'B', '👯': 'C', '🕴': 'D', '🧍': 'E',
      '🧎': 'F', '🏃': 'G', '🚶': 'H', '🤸': 'I', '🤾': 'J',
      '🤽': 'K', '🏊': 'L', '🧗': 'M', '🤹': 'N', '🚴': 'O',
      '🏇': 'P', '🏂': 'Q', '⛷️': 'R', '🏄': 'S', '🏋️': 'T',
      '🤼': 'U', '🤺': 'V', '🧘': 'X', '🤳': 'Y', '🧏': 'Z'
    };
    
    return text.split('').map(char => {
      if (defaultMapping[char]) {
        return defaultMapping[char];
      }
      return char;
    }).join('');
  }
};

/**
 * Hill 2x2 Cipher - Matrix-based polygraphic substitution cipher
 * 
 * Encrypts pairs of letters using a 2x2 matrix
 * Each letter pair [a, b] is multiplied by the matrix modulo 26
 * 
 * Encryption: [c1, c2] = Matrix * [a, b] mod 26
 * Decryption: [a, b] = InverseMatrix * [c1, c2] mod 26
 * 
 * The matrix must be invertible modulo 26 (determinant must be coprime with 26)
 * 
 * Example with matrix [[3, 3], [2, 5]]:
 *   Plaintext pair: [H, E] = [7, 4]
 *   Encrypted: [[3, 3], [2, 5]] * [7, 4] = [33, 34] mod 26 = [7, 8] = [H, I]
 */
const hill2x2Cipher = {
  name: 'Hill 2x2',
  description: 'Matrix-based cipher using 2x2 matrix',
  category: 'polygraphic',
  difficulty: 'advanced',
  info: 'Encrypts pairs of letters using a 2x2 matrix. Each pair is multiplied by the matrix modulo 26.',
  youtubeUrl: 'https://www.youtube.com/watch?v=U3h8gZ8h2YI',
  funMessage: 'Hill cipher uses matrix multiplication! Math meets cryptography!',
  relatedCiphers: [
    { name: 'Hill 3x3', inApp: true, description: 'Larger matrix version' },
    { name: 'Affine Cipher', inApp: true, description: 'Mathematical substitution' }
  ],
  /**
   * Encrypts text using Hill 2x2 cipher
   * @param {string} text - Plaintext to encrypt
   * @param {Array<Array<number>>} matrix - 2x2 encryption matrix (default: [[3,3],[2,5]])
   * @returns {string} Encrypted text
   */
  encrypt: (text, matrix = null) => {
    // Default matrix: [[3, 3], [2, 5]]
    const defaultMatrix = matrix || [[3, 3], [2, 5]];
    // Clean text and pad with 'X' if odd length (Hill cipher works on pairs)
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '').padEnd(Math.ceil(text.replace(/[^A-Z]/g, '').length / 2) * 2, 'X');
    let result = '';
    
    // Process text in pairs
    for (let i = 0; i < cleanText.length; i += 2) {
      const char1 = cleanText[i] || 'X';
      const char2 = cleanText[i + 1] || 'X';
      // Convert letters to numbers (0-25)
      const num1 = char1.charCodeAt(0) - 65;
      const num2 = char2.charCodeAt(0) - 65;
      
      // Matrix multiplication: [enc1, enc2] = Matrix * [num1, num2] mod 26
      const enc1 = (defaultMatrix[0][0] * num1 + defaultMatrix[0][1] * num2) % 26;
      const enc2 = (defaultMatrix[1][0] * num1 + defaultMatrix[1][1] * num2) % 26;
      
      // Convert numbers back to letters
      result += String.fromCharCode(enc1 + 65) + String.fromCharCode(enc2 + 65);
    }
    
    return result;
  },
  /**
   * Decrypts text using Hill 2x2 cipher
   * @param {string} text - Ciphertext to decrypt
   * @param {Array<Array<number>>} matrix - 2x2 encryption matrix used
   * @returns {string} Decrypted text
   */
  decrypt: (text, matrix = null) => {
    const defaultMatrix = matrix || [[3, 3], [2, 5]];
    
    // Step 1: Calculate determinant of the matrix mod 26
    // det = ad - bc (for 2x2 matrix [[a,b],[c,d]])
    const det = (defaultMatrix[0][0] * defaultMatrix[1][1] - defaultMatrix[0][1] * defaultMatrix[1][0] + 26) % 26;
    
    // Step 2: Find modular multiplicative inverse of determinant
    // Need detInv such that (det * detInv) mod 26 = 1
    let detInv = 0;
    for (let i = 0; i < 26; i++) {
      if ((det * i) % 26 === 1) {
        detInv = i;
        break;
      }
    }
    
    // Step 3: Calculate inverse matrix mod 26
    // For 2x2 matrix [[a,b],[c,d]], inverse = (1/det) * [[d,-b],[-c,a]]
    const invMatrix = [
      [(defaultMatrix[1][1] * detInv) % 26, (-defaultMatrix[0][1] * detInv + 26) % 26],
      [(-defaultMatrix[1][0] * detInv + 26) % 26, (defaultMatrix[0][0] * detInv) % 26]
    ];
    
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    let result = '';
    
    // Process ciphertext in pairs
    for (let i = 0; i < cleanText.length; i += 2) {
      const char1 = cleanText[i] || 'X';
      const char2 = cleanText[i + 1] || 'X';
      const num1 = char1.charCodeAt(0) - 65;
      const num2 = char2.charCodeAt(0) - 65;
      
      // Matrix multiplication with inverse: [dec1, dec2] = InvMatrix * [num1, num2] mod 26
      const dec1 = (invMatrix[0][0] * num1 + invMatrix[0][1] * num2) % 26;
      const dec2 = (invMatrix[1][0] * num1 + invMatrix[1][1] * num2) % 26;
      
      result += String.fromCharCode(dec1 + 65) + String.fromCharCode(dec2 + 65);
    }
    
    return result;
  }
};

const hill3x3Cipher = {
  name: 'Hill 3x3',
  description: 'Matrix-based cipher using 3x3 matrix',
  category: 'polygraphic',
  difficulty: 'advanced',
  info: 'Encrypts triplets of letters using a 3x3 matrix. More secure than 2x2 but computationally more complex.',
  youtubeUrl: 'https://www.youtube.com/watch?v=U3h8gZ8h2YI',
  funMessage: 'Hill 3x3 uses bigger matrices for triple the security!',
  relatedCiphers: [
    { name: 'Hill 2x2', inApp: true, description: 'Smaller matrix version' },
    { name: 'Affine Cipher', inApp: true, description: 'Mathematical substitution' }
  ],
  encrypt: (text, matrix = null) => {
    // Default matrix: [[1, 2, 0], [0, 3, 1], [1, 0, 1]]
    const defaultMatrix = matrix || [[1, 2, 0], [0, 3, 1], [1, 0, 1]];
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '').padEnd(Math.ceil(text.replace(/[^A-Z]/g, '').length / 3) * 3, 'X');
    let result = '';
    
    for (let i = 0; i < cleanText.length; i += 3) {
      const char1 = cleanText[i] || 'X';
      const char2 = cleanText[i + 1] || 'X';
      const char3 = cleanText[i + 2] || 'X';
      const num1 = char1.charCodeAt(0) - 65;
      const num2 = char2.charCodeAt(0) - 65;
      const num3 = char3.charCodeAt(0) - 65;
      
      const enc1 = (defaultMatrix[0][0] * num1 + defaultMatrix[0][1] * num2 + defaultMatrix[0][2] * num3) % 26;
      const enc2 = (defaultMatrix[1][0] * num1 + defaultMatrix[1][1] * num2 + defaultMatrix[1][2] * num3) % 26;
      const enc3 = (defaultMatrix[2][0] * num1 + defaultMatrix[2][1] * num2 + defaultMatrix[2][2] * num3) % 26;
      
      result += String.fromCharCode(enc1 + 65) + String.fromCharCode(enc2 + 65) + String.fromCharCode(enc3 + 65);
    }
    
    return result;
  },
  decrypt: (text, matrix = null) => {
    // For 3x3, we need a valid invertible matrix
    // Using a simple example matrix
    const defaultMatrix = matrix || [[1, 2, 0], [0, 3, 1], [1, 0, 1]];
    
    // Calculate determinant
    const det = (
      defaultMatrix[0][0] * (defaultMatrix[1][1] * defaultMatrix[2][2] - defaultMatrix[1][2] * defaultMatrix[2][1]) -
      defaultMatrix[0][1] * (defaultMatrix[1][0] * defaultMatrix[2][2] - defaultMatrix[1][2] * defaultMatrix[2][0]) +
      defaultMatrix[0][2] * (defaultMatrix[1][0] * defaultMatrix[2][1] - defaultMatrix[1][1] * defaultMatrix[2][0])
    ) % 26;
    
    // Find modular inverse
    let detInv = 0;
    for (let i = 0; i < 26; i++) {
      if ((det * i) % 26 === 1 || (det * i) % 26 === 25) {
        detInv = i;
        break;
      }
    }
    
    // Calculate adjugate matrix
    const adj = [
      [
        (defaultMatrix[1][1] * defaultMatrix[2][2] - defaultMatrix[1][2] * defaultMatrix[2][1]) % 26,
        -(defaultMatrix[0][1] * defaultMatrix[2][2] - defaultMatrix[0][2] * defaultMatrix[2][1]) % 26,
        (defaultMatrix[0][1] * defaultMatrix[1][2] - defaultMatrix[0][2] * defaultMatrix[1][1]) % 26
      ],
      [
        -(defaultMatrix[1][0] * defaultMatrix[2][2] - defaultMatrix[1][2] * defaultMatrix[2][0]) % 26,
        (defaultMatrix[0][0] * defaultMatrix[2][2] - defaultMatrix[0][2] * defaultMatrix[2][0]) % 26,
        -(defaultMatrix[0][0] * defaultMatrix[1][2] - defaultMatrix[0][2] * defaultMatrix[1][0]) % 26
      ],
      [
        (defaultMatrix[1][0] * defaultMatrix[2][1] - defaultMatrix[1][1] * defaultMatrix[2][0]) % 26,
        -(defaultMatrix[0][0] * defaultMatrix[2][1] - defaultMatrix[0][1] * defaultMatrix[2][0]) % 26,
        (defaultMatrix[0][0] * defaultMatrix[1][1] - defaultMatrix[0][1] * defaultMatrix[1][0]) % 26
      ]
    ];
    
    // Inverse matrix = adjugate * detInv mod 26
    const invMatrix = adj.map(row => 
      row.map(val => ((val % 26 + 26) % 26 * detInv) % 26)
    );
    
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    let result = '';
    
    for (let i = 0; i < cleanText.length; i += 3) {
      const char1 = cleanText[i] || 'X';
      const char2 = cleanText[i + 1] || 'X';
      const char3 = cleanText[i + 2] || 'X';
      const num1 = char1.charCodeAt(0) - 65;
      const num2 = char2.charCodeAt(0) - 65;
      const num3 = char3.charCodeAt(0) - 65;
      
      const dec1 = (invMatrix[0][0] * num1 + invMatrix[0][1] * num2 + invMatrix[0][2] * num3) % 26;
      const dec2 = (invMatrix[1][0] * num1 + invMatrix[1][1] * num2 + invMatrix[1][2] * num3) % 26;
      const dec3 = (invMatrix[2][0] * num1 + invMatrix[2][1] * num2 + invMatrix[2][2] * num3) % 26;
      
      result += String.fromCharCode(dec1 + 65) + String.fromCharCode(dec2 + 65) + String.fromCharCode(dec3 + 65);
    }
    
    return result;
  }
};

const cipherAlgorithms = {
  caesar: caesarCipher,
  atbash: atbashCipher,
  aristocrat: aristocratCipher,
  affine: affineCipher,
  nihilist: nihilistCipher,
  checkerboard: checkerboardCipher,
  columnar: columnarCipher,
  baconian: baconianCipher,
  porta: portaCipher,
  patristocrat: patristocratCipher,
  cryptarithm: cryptarithmCipher,
  fractionatedMorse: fractionatedMorseCipher,
  xenocrypt: xenocryptCipher,
  railfence: railfenceCipher,
  pollux: polluxCipher,
  morbit: morbitCipher,
  vigenere: vigenereCipher,
  rsa: rsaCipher,
  aristocratMisspelled: aristocratMisspelledCipher,
  dancingMen: dancingMenCipher,
  hill2x2: hill2x2Cipher,
  hill3x3: hill3x3Cipher
};

// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Cipher category definitions with icons
 * Used for displaying cipher information and categorization
 */
const categories = {
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
const getDifficultyColor = (difficulty) => {
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
const getDifficultyBadge = (difficulty) => {
  switch(difficulty) {
    case 'beginner': return '⭐';      // 1 star
    case 'intermediate': return '⭐⭐'; // 2 stars
    case 'advanced': return '⭐⭐⭐';    // 3 stars
    default: return '';
  }
};

// ============================================================================
// Components
// ============================================================================
const DonateModal = ({ show, onClose }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-white/20" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="mb-4"><AnimatedOtter /></div>
          <h2 className="text-3xl font-bold mb-2">Support Otto! 💙</h2>
          <p className="text-purple-200">Help keep this app free and ad-free!</p>
        </div>
        <div className="space-y-3 mb-6">
          <a href="https://venmo.com/Nitin-Kumar-22" target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-4 rounded-xl font-bold text-center transition-all">
            <Coffee className="w-6 h-6 inline mr-2" />
            Donate via Venmo
          </a>
          <a href="https://paypal.me/kumarnitin007" target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 py-4 rounded-xl font-bold text-center transition-all">
            <DollarSign className="w-6 h-6 inline mr-2" />
            Donate via PayPal
          </a>
        </div>
        <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-semibold transition-all">Close</button>
      </div>
    </div>
  );
};

/**
 * CipherSelector Component - Displays all available ciphers for selection
 * @param {string} selectedCipher - Currently selected cipher key
 * @param {Function} onSelect - Callback when cipher is selected
 * @param {boolean} showDivisionC - Whether to show Division C ciphers
 */
const CipherSelector = ({ selectedCipher, onSelect, showDivisionC = false }) => {
  // Division C related ciphers (last 9 ciphers added)
  const divisionCCiphers = ['railfence', 'pollux', 'morbit', 'vigenere', 'rsa', 'aristocratMisspelled', 'dancingMen', 'hill2x2', 'hill3x3'];
  
  // Filter ciphers based on Division C toggle
  const availableCiphers = Object.keys(cipherAlgorithms).filter(key => {
    // If Division C is not shown, exclude Division C ciphers
    if (!showDivisionC && divisionCCiphers.includes(key)) {
      return false;
    }
    return true;
  });
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-yellow-400" />
        Select Cipher
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {availableCiphers.map(key => (
          <button key={key} onClick={() => onSelect(key)} className={`p-4 rounded-xl text-sm transition-all transform hover:scale-105 ${selectedCipher === key ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold shadow-lg scale-105' : 'bg-white/10 hover:bg-white/20'}`}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-center">{cipherAlgorithms[key].name}</span>
              <span className={`${selectedCipher === key ? 'text-gray-900' : getDifficultyColor(cipherAlgorithms[key].difficulty)}`}>
                {getDifficultyBadge(cipherAlgorithms[key].difficulty)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// Main App Component
// ============================================================================
/**
 * Main Cipher Otto Application Component
 * 
 * Manages all application state and UI logic:
 * - Tab navigation (Learn vs Practice)
 * - Cipher selection and processing
 * - Cipher-specific parameters (keywords, shifts, etc.)
 * - Practice mode challenges and scoring
 * - UI state (modals, info panels, etc.)
 */
const CipherOtto = () => {
  // ========================================================================
  // Core Application State
  // ========================================================================
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' or 'practice'
  const [selectedCipher, setSelectedCipher] = useState('caesar'); // Currently selected cipher key
  const [inputText, setInputText] = useState(''); // User input text
  const [outputText, setOutputText] = useState(''); // Encrypted/decrypted result
  const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
  const [copied, setCopied] = useState(false); // Clipboard copy feedback state
  
  // ========================================================================
  // Cipher-Specific Parameters State
  // ========================================================================
  // Caesar Cipher
  const [caesarShift, setCaesarShift] = useState(3); // Shift amount (0-25)
  
  // Affine Cipher
  const [affineA, setAffineA] = useState(5); // Multiplier (must be coprime with 26)
  const [affineB, setAffineB] = useState(8); // Shift amount (0-25)
  
  // Keyword-based ciphers
  const [columnarKeyword, setColumnarKeyword] = useState('CRYPTO');
  const [checkerboardKey, setCheckerboardKey] = useState('CRYPTO');
  const [checkerboardBlanks, setCheckerboardBlanks] = useState('2,6'); // Blank positions
  const [nihilistKeyword, setNihilistKeyword] = useState('CRYPTO');
  const [nihilistPolybiusKey, setNihilistPolybiusKey] = useState('CRYPTO');
  const [portaKeyword, setPortaKeyword] = useState('CRYPTO');
  const [fractionatedMorseKeyword, setFractionatedMorseKeyword] = useState('CRYPTO');
  const [xenocryptKeyword, setXenocryptKeyword] = useState('CRYPTO');
  const [vigenereKeyword, setVigenereKeyword] = useState('KEY');
  
  // Cryptarithm Cipher
  const [cryptarithmEquation, setCryptarithmEquation] = useState('SEND + MORE = MONEY');
  const [cryptarithmMapping, setCryptarithmMapping] = useState('S=9,E=5,N=6,D=7,M=1,O=0,R=8,Y=2');
  const [cryptarithmValidation, setCryptarithmValidation] = useState(null); // Validation result object
  
  // Rail Fence Cipher
  const [railfenceRails, setRailfenceRails] = useState(3); // Number of rails (2-10)
  
  // RSA Cipher (simplified)
  const [rsaPublicKey, setRsaPublicKey] = useState({ n: 33, e: 3 }); // Public key (n, e)
  const [rsaPrivateKey, setRsaPrivateKey] = useState({ n: 33, d: 7 }); // Private key (n, d)
  
  // ========================================================================
  // Practice Mode State
  // ========================================================================
  const [practiceChallenge, setPracticeChallenge] = useState(null); // Current challenge object
  const [userAnswer, setUserAnswer] = useState(''); // User's answer input
  const [score, setScore] = useState(0); // Total points earned
  
  // ========================================================================
  // UI State
  // ========================================================================
  const [showDonateModal, setShowDonateModal] = useState(false); // Donate modal visibility
  const [showCipherInfo, setShowCipherInfo] = useState(false); // Cipher info panel expanded state
  const [showTutorial, setShowTutorial] = useState(false); // Tutorial panel expanded state
  const [showDivisionC, setShowDivisionC] = useState(false); // Show Division C related ciphers toggle
  
  // Division C related ciphers (last 9 ciphers added)
  const divisionCCiphers = ['railfence', 'pollux', 'morbit', 'vigenere', 'rsa', 'aristocratMisspelled', 'dancingMen', 'hill2x2', 'hill3x3'];
  
  // If selected cipher is a Division C cipher and toggle is off, reset to default
  useEffect(() => {
    if (!showDivisionC && divisionCCiphers.includes(selectedCipher)) {
      setSelectedCipher('caesar');
    }
  }, [showDivisionC, selectedCipher]);
  
  /**
   * Main cipher processing function
   * Handles encryption/decryption based on selected cipher and mode
   * Routes to appropriate cipher implementation with required parameters
   */
  const processCipher = () => {
    const cipher = cipherAlgorithms[selectedCipher];
    if (!cipher) return; // Safety check: cipher must exist
    
    let result;
    // Route to appropriate cipher handler based on selected cipher
    // Each cipher may require different parameters (shift, keyword, matrix, etc.)
    if (selectedCipher === 'caesar') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, caesarShift) : cipher.decrypt(inputText, caesarShift);
    } else if (selectedCipher === 'affine') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, affineA, affineB) : cipher.decrypt(inputText, affineA, affineB);
    } else if (selectedCipher === 'nihilist') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, nihilistKeyword, nihilistPolybiusKey) : cipher.decrypt(inputText, nihilistKeyword, nihilistPolybiusKey);
    } else if (selectedCipher === 'columnar') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, columnarKeyword) : cipher.decrypt(inputText, columnarKeyword);
    } else if (selectedCipher === 'checkerboard') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, checkerboardKey, checkerboardBlanks) : cipher.decrypt(inputText);
    } else if (selectedCipher === 'porta') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, portaKeyword) : cipher.decrypt(inputText, portaKeyword);
    } else if (selectedCipher === 'fractionatedMorse') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, fractionatedMorseKeyword) : cipher.decrypt(inputText, fractionatedMorseKeyword);
    } else if (selectedCipher === 'xenocrypt') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, xenocryptKeyword) : cipher.decrypt(inputText, xenocryptKeyword);
    } else if (selectedCipher === 'railfence') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, railfenceRails) : cipher.decrypt(inputText, railfenceRails);
    } else if (selectedCipher === 'vigenere') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, vigenereKeyword) : cipher.decrypt(inputText, vigenereKeyword);
    } else if (selectedCipher === 'rsa') {
      result = mode === 'encrypt' ? cipher.encrypt(inputText, rsaPublicKey) : cipher.decrypt(inputText, rsaPrivateKey);
    } else if (selectedCipher === 'cryptarithm') {
      // Parse mapping string to object
      const mappingObj = {};
      cryptarithmMapping.split(',').forEach(pair => {
        const [letter, digit] = pair.split('=').map(s => s.trim());
        if (letter && digit) {
          mappingObj[letter.toUpperCase()] = digit;
        }
      });
      
      if (mode === 'encrypt') {
        // Use inputText if provided, otherwise use the equation
        const textToConvert = inputText.trim() || cryptarithmEquation;
        result = cipher.encrypt(textToConvert, mappingObj);
        
        // If it's an equation format, validate it
        if (textToConvert.includes('+') || textToConvert.includes('-') || textToConvert.includes('*') || textToConvert.includes('/') || textToConvert.includes('=')) {
          const validation = cipher.validateEquation(textToConvert, mappingObj);
          setCryptarithmValidation(validation);
        } else {
          setCryptarithmValidation(null);
        }
      } else {
        // Convert digits back to letters
        result = cipher.decrypt(inputText, mappingObj);
        setCryptarithmValidation(null);
      }
    } else {
      result = mode === 'encrypt' ? cipher.encrypt(inputText) : cipher.decrypt(inputText);
    }
    setOutputText(result);
  };
  
  /**
   * Copies the output text to clipboard
   * Shows a temporary "Copied!" feedback message
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  
  /**
   * Generates a practice challenge for the selected cipher
   * Creates an encrypted message with hints (keyword, shift, etc.)
   * User must decrypt the message to earn points
   */
  const generateChallenge = () => {
    // Predefined messages for practice challenges
    const messages = [
      'HELLO WORLD', 'CRYPTOGRAPHY IS FUN', 'BREAK THE CODE', 'SECRET MESSAGE',
      'OTTO THE OTTER', 'CIPHER CHALLENGE', 'LEARN TO ENCRYPT', 'HIDDEN TREASURE',
      'SPY ACADEMY', 'CODE BREAKER', 'MATH IS COOL', 'SECURITY FIRST',
      'PUZZLE MASTER', 'CRYPTO WIZARD', 'SECRET AGENT', 'DECODE THIS NOW'
    ];
    // Select a random message from the pool
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const cipher = cipherAlgorithms[selectedCipher];
    
    // Variables to store challenge parameters (hints for the user)
    let encrypted, challengeKeyword, challengeShift, challengePolybiusKey;
    
    // Special handling for Cryptarithm
    if (selectedCipher === 'cryptarithm') {
      // For cryptarithm, show the equation with numbers and ask user to provide words
      const cryptarithmPuzzles = [
        { equation: 'SEND + MORE = MONEY', hint: '9567 + 1085 = ?', answer: 'MONEY', fullAnswer: '10652' },
        { equation: 'SEND + MORE = MONEY', hint: '???? + 1085 = 10652', answer: 'SEND', fullAnswer: '9567' },
        { equation: 'SEND + MORE = MONEY', hint: '9567 + ???? = 10652', answer: 'MORE', fullAnswer: '1085' },
        { equation: 'BASE + BALL = GAMES', hint: '7483 + 7455 = ?', answer: 'GAMES', fullAnswer: '14938', 
          mapping: { 'B':'7', 'A':'4', 'S':'8', 'E':'3', 'L':'5', 'G':'1', 'M':'9' } },
        { equation: 'CROSS + ROADS = DANGER', hint: '96255 + 62375 = ?', answer: 'DANGER', fullAnswer: '158630',
          mapping: { 'C':'9', 'R':'6', 'O':'2', 'S':'5', 'A':'7', 'D':'1', 'N':'8', 'G':'3', 'E':'0' } },
      ];
      
      const puzzle = cryptarithmPuzzles[Math.floor(Math.random() * cryptarithmPuzzles.length)];
      
      // Default mapping for SEND + MORE = MONEY if puzzle doesn't have one
      const defaultMapping = { 'S': '9', 'E': '5', 'N': '6', 'D': '7', 'M': '1', 'O': '0', 'R': '8', 'Y': '2' };
      
      setPracticeChallenge({
        original: puzzle.answer,
        encrypted: puzzle.hint,
        cipher: selectedCipher,
        equation: puzzle.equation,
        fullAnswer: puzzle.fullAnswer,
        mapping: puzzle.mapping || defaultMapping
      });
      setUserAnswer('');
      return;
    }
    
    if (selectedCipher === 'caesar') {
      challengeShift = Math.floor(Math.random() * 25) + 1;
      encrypted = cipher.encrypt(randomMsg, challengeShift);
    } else if (selectedCipher === 'affine') {
      const validA = [5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
      const challengeA = validA[Math.floor(Math.random() * validA.length)];
      const challengeB = Math.floor(Math.random() * 26);
      encrypted = cipher.encrypt(randomMsg, challengeA, challengeB);
      challengeKeyword = `a=${challengeA}, b=${challengeB}`;
    } else if (selectedCipher === 'columnar') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword);
    } else if (selectedCipher === 'porta') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword);
    } else if (selectedCipher === 'nihilist') {
      challengeKeyword = 'SECRET';
      challengePolybiusKey = 'CRYPTO';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword, challengePolybiusKey);
    } else if (selectedCipher === 'checkerboard') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword, '2,6');
    } else if (selectedCipher === 'fractionatedMorse') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword);
    } else if (selectedCipher === 'xenocrypt') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword);
    } else if (selectedCipher === 'railfence') {
      const challengeRails = Math.floor(Math.random() * 5) + 2; // 2-6 rails
      encrypted = cipher.encrypt(randomMsg, challengeRails);
      challengeKeyword = `Rails: ${challengeRails}`;
    } else if (selectedCipher === 'vigenere') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword);
    } else if (selectedCipher === 'rsa') {
      encrypted = cipher.encrypt(randomMsg, rsaPublicKey);
      challengeKeyword = `RSA (n=${rsaPublicKey.n}, e=${rsaPublicKey.e})`;
    } else {
      encrypted = cipher.encrypt(randomMsg);
    }
    
    setPracticeChallenge({
      original: randomMsg,
      encrypted: encrypted,
      cipher: selectedCipher,
      keyword: challengeKeyword,
      polybiusKey: challengePolybiusKey,
      shift: challengeShift
    });
    setUserAnswer('');
  };
  
  /**
   * Validates user's answer in practice mode
   * Compares user input with correct answer and awards points
   * Special handling for cryptarithm puzzles (accepts both word and number)
   */
  const checkAnswer = () => {
    if (selectedCipher === 'cryptarithm') {
      // Cryptarithm accepts either the word (e.g., "MONEY") or the number (e.g., "10652")
      const userAnswerClean = userAnswer.toUpperCase().replace(/\s/g, '');
      const correctAnswer = practiceChallenge.original.toUpperCase().replace(/\s/g, '');
      const correctNumber = practiceChallenge.fullAnswer;
      
      if (userAnswerClean === correctAnswer || userAnswerClean === correctNumber) {
        const cipher = cipherAlgorithms[practiceChallenge.cipher];
        const points = cipher.difficulty === 'beginner' ? 5 : cipher.difficulty === 'intermediate' ? 10 : 15;
        setScore(score + points);
        alert(`🎉 Correct! The answer is ${practiceChallenge.original} = ${practiceChallenge.fullAnswer}. +${points} points`);
        generateChallenge();
      } else {
        alert('❌ Not quite right. Try again!');
      }
    } else {
      if (userAnswer.toUpperCase().replace(/\s/g, '') === practiceChallenge.original.replace(/\s/g, '')) {
        const cipher = cipherAlgorithms[practiceChallenge.cipher];
        const points = cipher.difficulty === 'beginner' ? 5 : cipher.difficulty === 'intermediate' ? 10 : 15;
        setScore(score + points);
        alert(`🎉 Correct! +${points} points`);
        generateChallenge();
      } else {
        alert('❌ Not quite right. Try again!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <AnimatedOtter />
          <h1 className="text-5xl font-bold mb-2 mt-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cipher Otto
          </h1>
          <p className="text-purple-200 text-lg">Master Cryptography with Otto!</p>
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 flex items-center gap-2 border border-white/20 shadow-lg">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-lg">{score}</span>
              <span className="text-sm text-purple-200">points</span>
            </div>
            <button 
              onClick={() => setShowDonateModal(true)} 
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full px-5 py-2 flex items-center gap-2 font-semibold transition-all shadow-lg transform hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              Support Otto
            </button>
          </div>
        </div>

        <DonateModal show={showDonateModal} onClose={() => setShowDonateModal(false)} />

        {/* Division C Ciphers Toggle */}
        <div className="mb-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏆</div>
              <div>
                <div className="font-bold text-lg text-blue-100">Show Division C Related Ciphers</div>
                <div className="text-xs text-blue-200/80 mt-1">Enable to show advanced ciphers: Rail Fence, Pollux, Morbit, Vigenère, RSA, Aristocrat Misspelled, Dancing Men, Hill 2x2, Hill 3x3</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showDivisionC}
                onChange={(e) => setShowDivisionC(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
            </label>
          </div>
        </div>

        <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/10">
          <button 
            onClick={() => setActiveTab('learn')} 
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeTab === 'learn' ? 'bg-white text-purple-900 shadow-lg' : 'text-white hover:bg-white/20'}`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Learn
          </button>
          <button 
            onClick={() => setActiveTab('practice')} 
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeTab === 'practice' ? 'bg-white text-purple-900 shadow-lg' : 'text-white hover:bg-white/20'}`}
          >
            <Trophy className="w-5 h-5 inline mr-2" />
            Practice
          </button>
        </div>

        {activeTab === 'learn' && (
          <div className="space-y-6">
            <CipherSelector selectedCipher={selectedCipher} onSelect={setSelectedCipher} showDivisionC={showDivisionC} />

            <div className="bg-blue-900/30 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-blue-500/30">
              <button 
                onClick={() => setShowCipherInfo(!showCipherInfo)} 
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-300" />
                  <h3 className="text-lg font-bold">About {cipherAlgorithms[selectedCipher].name}</h3>
                </div>
                {showCipherInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showCipherInfo && (
                <div className="mt-4">
                  <div className="mb-4 pb-4 border-b border-blue-500/30">
                    <div className="text-sm mb-3 text-blue-100">{cipherAlgorithms[selectedCipher].description}</div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{categories[cipherAlgorithms[selectedCipher].category]?.icon}</span>
                      <span className="font-bold text-blue-200">Category:</span>
                      <span className="text-blue-100">{categories[cipherAlgorithms[selectedCipher].category]?.name}</span>
                    </div>
                  </div>
                  <p className="text-blue-100 mb-4">{cipherAlgorithms[selectedCipher].info}</p>
                  
                  {cipherAlgorithms[selectedCipher].relatedCiphers && (
                    <div className="mt-4 pt-4 border-t border-blue-500/30">
                      <h4 className="text-sm font-bold text-blue-200 mb-3">Related Ciphers:</h4>
                      <div className="space-y-2">
                        {cipherAlgorithms[selectedCipher].relatedCiphers.map((related, idx) => (
                          <div key={idx} className="bg-blue-900/20 rounded-lg p-3 border border-blue-500/20">
                            <div className="flex items-start gap-2">
                              <span className="text-blue-300 font-semibold text-sm flex-shrink-0">
                                {related.inApp ? '✓' : '○'}
                              </span>
                              <div className="flex-1">
                                {related.inApp ? (
                                  <button
                                    onClick={() => {
                                      const cipherKey = Object.keys(cipherAlgorithms).find(
                                        key => cipherAlgorithms[key].name === related.name
                                      );
                                      if (cipherKey) setSelectedCipher(cipherKey);
                                    }}
                                    className="font-semibold text-blue-200 hover:text-blue-100 underline text-sm text-left"
                                  >
                                    {related.name}
                                  </button>
                                ) : (
                                  <span className="font-semibold text-blue-200 text-sm">{related.name}</span>
                                )}
                                <p className="text-xs text-blue-100/80 mt-1">{related.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-orange-500/30">
              <button 
                onClick={() => setShowTutorial(!showTutorial)} 
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🦦</div>
                  <h3 className="text-lg font-bold text-orange-100">Tutorial by Otto</h3>
                </div>
                {showTutorial ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showTutorial && (
                <div className="mt-4">
                  <div className="bg-yellow-500/20 border-2 border-yellow-400/40 rounded-lg p-4 mb-4">
                    <p className="text-yellow-50 font-medium">{cipherAlgorithms[selectedCipher].funMessage}</p>
                  </div>
                  {cipherAlgorithms[selectedCipher].youtubeUrl && (
                    <div>
                      {selectedCipher === 'cryptarithm' ? (
                        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                          <p className="text-purple-100 mb-3">📚 Learn more about cryptarithm puzzles:</p>
                          <a 
                            href={cipherAlgorithms[selectedCipher].youtubeUrl}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-lg font-semibold transition-all"
                          >
                            Visit Cryptarithm Puzzles →
                          </a>
                        </div>
                      ) : (
                        <>
                          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-xl mb-3">
                            <iframe 
                              width="100%" 
                              height="100%" 
                              src={cipherAlgorithms[selectedCipher].youtubeUrl.replace('watch?v=', 'embed/').split('&')[0].split('?')[0]} 
                              title={`${cipherAlgorithms[selectedCipher].name} Tutorial`} 
                              frameBorder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            ></iframe>
                          </div>
                          <div className="text-xs text-orange-200/80 mb-3">
                            <a 
                              href={cipherAlgorithms[selectedCipher].youtubeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="hover:text-orange-300 underline"
                            >
                              Watch on YouTube
                            </a>
                          </div>
                          {cipherAlgorithms[selectedCipher].youtubeUrlAdvanced && (
                            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                              <p className="text-blue-100 mb-3">🎓 Advanced Tutorial:</p>
                              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-xl mb-2">
                                <iframe 
                                  width="100%" 
                                  height="100%" 
                                  src={cipherAlgorithms[selectedCipher].youtubeUrlAdvanced.replace('watch?v=', 'embed/').split('&')[0].split('?')[0]} 
                                  title={`${cipherAlgorithms[selectedCipher].name} Advanced Tutorial`} 
                                  frameBorder="0" 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <div className="text-xs text-blue-200/80">
                                <a 
                                  href={cipherAlgorithms[selectedCipher].youtubeUrlAdvanced} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="hover:text-blue-300 underline"
                                >
                                  Watch Advanced Tutorial on YouTube
                                </a>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10">
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setMode('encrypt')} 
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${mode === 'encrypt' ? 'bg-green-500 text-white shadow-lg' : 'bg-white/20 hover:bg-white/30'}`}
                >
                  <Lock className="w-5 h-5" />
                  Encrypt
                </button>
                <button 
                  onClick={() => setMode('decrypt')} 
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${mode === 'decrypt' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/20 hover:bg-white/30'}`}
                >
                  <Unlock className="w-5 h-5" />
                  Decrypt
                </button>
              </div>

              {selectedCipher === 'caesar' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">Shift (0-25):</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="25" 
                    value={caesarShift} 
                    onChange={(e) => setCaesarShift(parseInt(e.target.value) || 0)} 
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                  />
                </div>
              )}

              {selectedCipher === 'affine' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30 space-y-3">
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Value a (must be coprime with 26):</label>
                    <input 
                      type="number" 
                      value={affineA} 
                      onChange={(e) => setAffineA(parseInt(e.target.value) || 5)} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Value b (0-25):</label>
                    <input 
                      type="number" 
                      value={affineB} 
                      onChange={(e) => setAffineB(parseInt(e.target.value) || 8)} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    />
                  </div>
                </div>
              )}

              {selectedCipher === 'nihilist' && (
                <div className="mb-4 space-y-3 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Keyword:</label>
                    <input 
                      type="text" 
                      value={nihilistKeyword} 
                      onChange={(e) => setNihilistKeyword(e.target.value.toUpperCase())} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Polybius Key:</label>
                    <input 
                      type="text" 
                      value={nihilistPolybiusKey} 
                      onChange={(e) => setNihilistPolybiusKey(e.target.value.toUpperCase())} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    />
                  </div>
                </div>
              )}

              {selectedCipher === 'columnar' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">Keyword:</label>
                  <input 
                    type="text" 
                    value={columnarKeyword} 
                    onChange={(e) => setColumnarKeyword(e.target.value.toUpperCase())} 
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                  />
                </div>
              )}

              {selectedCipher === 'checkerboard' && (
                <div className="mb-4 space-y-3 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Key:</label>
                    <input 
                      type="text" 
                      value={checkerboardKey} 
                      onChange={(e) => setCheckerboardKey(e.target.value.toUpperCase())} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Blank positions (comma-separated):</label>
                    <input 
                      type="text" 
                      value={checkerboardBlanks} 
                      onChange={(e) => setCheckerboardBlanks(e.target.value)} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    />
                  </div>
                </div>
              )}

              {selectedCipher === 'porta' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">Keyword:</label>
                  <input 
                    type="text" 
                    value={portaKeyword} 
                    onChange={(e) => setPortaKeyword(e.target.value.toUpperCase())} 
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                  />
                </div>
              )}

              {selectedCipher === 'fractionatedMorse' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">Keyword:</label>
                  <input 
                    type="text" 
                    value={fractionatedMorseKeyword} 
                    onChange={(e) => setFractionatedMorseKeyword(e.target.value.toUpperCase())} 
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    placeholder="CRYPTO"
                  />
                  <div className="text-xs text-purple-300 mt-2">💡 Creates substitution table from keyword for Morse triplet encoding</div>
                </div>
              )}

              {selectedCipher === 'xenocrypt' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">Keyword:</label>
                  <input 
                    type="text" 
                    value={xenocryptKeyword} 
                    onChange={(e) => setXenocryptKeyword(e.target.value.toUpperCase())} 
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    placeholder="CRYPTO"
                  />
                  <div className="text-xs text-purple-300 mt-2">💡 Works with Spanish alphabet (A-Z + Ñ). Accented letters are normalized.</div>
                </div>
              )}

              {selectedCipher === 'railfence' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">Number of Rails (2-10):</label>
                  <input 
                    type="number" 
                    min="2" 
                    max="10" 
                    value={railfenceRails} 
                    onChange={(e) => setRailfenceRails(parseInt(e.target.value) || 3)} 
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                  />
                  <div className="text-xs text-purple-300 mt-2">💡 Text zigzags across the specified number of rails</div>
                </div>
              )}

              {selectedCipher === 'vigenere' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">Keyword:</label>
                  <input 
                    type="text" 
                    value={vigenereKeyword} 
                    onChange={(e) => setVigenereKeyword(e.target.value.toUpperCase())} 
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                    placeholder="KEY"
                  />
                  <div className="text-xs text-purple-300 mt-2">💡 Each letter of the keyword determines the shift for the corresponding plaintext letter</div>
                </div>
              )}

              {selectedCipher === 'rsa' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30 space-y-3">
                  <div className="text-xs text-purple-200 mb-2">💡 Simplified RSA for educational purposes. Uses small primes (p=3, q=11, n=33).</div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Public Key (n, e):</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        value={rsaPublicKey.n} 
                        onChange={(e) => setRsaPublicKey({...rsaPublicKey, n: parseInt(e.target.value) || 33})} 
                        placeholder="n"
                        className="flex-1 p-2 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400 text-sm" 
                      />
                      <input 
                        type="number" 
                        value={rsaPublicKey.e} 
                        onChange={(e) => setRsaPublicKey({...rsaPublicKey, e: parseInt(e.target.value) || 3})} 
                        placeholder="e"
                        className="flex-1 p-2 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400 text-sm" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Private Key (n, d):</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        value={rsaPrivateKey.n} 
                        onChange={(e) => setRsaPrivateKey({...rsaPrivateKey, n: parseInt(e.target.value) || 33})} 
                        placeholder="n"
                        className="flex-1 p-2 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400 text-sm" 
                      />
                      <input 
                        type="number" 
                        value={rsaPrivateKey.d} 
                        onChange={(e) => setRsaPrivateKey({...rsaPrivateKey, d: parseInt(e.target.value) || 7})} 
                        placeholder="d"
                        className="flex-1 p-2 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400 text-sm" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedCipher === 'cryptarithm' && (
                <div className="mb-4 space-y-4 p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg border-2 border-purple-500/30">
                  <div>
                    <label className="text-sm font-bold text-purple-200 block mb-2">🧩 Equation (e.g., SEND + MORE = MONEY):</label>
                    <input 
                      type="text" 
                      value={cryptarithmEquation} 
                      onChange={(e) => setCryptarithmEquation(e.target.value.toUpperCase())} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400" 
                      placeholder="SEND + MORE = MONEY"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-purple-200 block mb-2">Letter-to-Digit Mapping (e.g., S=9,E=5,N=6,D=7,M=1,O=0,R=8,Y=2):</label>
                    <input 
                      type="text" 
                      value={cryptarithmMapping} 
                      onChange={(e) => setCryptarithmMapping(e.target.value.toUpperCase())} 
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-purple-400 font-mono text-sm" 
                      placeholder="S=9,E=5,N=6,D=7,M=1,O=0,R=8,Y=2"
                    />
                    <div className="text-xs text-purple-300 mt-2">💡 Format: LETTER=DIGIT, separated by commas. Each letter must map to a unique digit (0-9).</div>
                  </div>
                  
                  <button
                    onClick={() => {
                      const mappingObj = {};
                      cryptarithmMapping.split(',').forEach(pair => {
                        const [letter, digit] = pair.split('=').map(s => s.trim());
                        if (letter && digit) mappingObj[letter.toUpperCase()] = digit;
                      });
                      const equationToValidate = inputText.trim() || cryptarithmEquation;
                      const validation = cryptarithmCipher.validateEquation(equationToValidate, mappingObj);
                      setCryptarithmValidation(validation);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 rounded-lg font-semibold transition-all shadow-lg mb-3"
                  >
                    ✓ Validate Equation
                  </button>
                  
                  {cryptarithmValidation && (
                    <div className={`p-3 rounded-lg border-2 ${cryptarithmValidation.valid ? 'bg-green-900/30 border-green-500/50' : 'bg-red-900/30 border-red-500/50'}`}>
                      {cryptarithmValidation.valid ? (
                        <div>
                          <div className="text-green-300 font-bold mb-2">✅ Valid Equation!</div>
                          <div className="text-sm text-green-200">
                            {(() => {
                              const equationToShow = inputText.trim() || cryptarithmEquation;
                              const parsed = cryptarithmCipher.parseEquation(equationToShow);
                              const mappingObj = {};
                              cryptarithmMapping.split(',').forEach(pair => {
                                const [letter, digit] = pair.split('=').map(s => s.trim());
                                if (letter && digit) mappingObj[letter.toUpperCase()] = digit;
                              });
                              const words = parsed.parts.map(p => p.value);
                              const numbers = words.map(w => cryptarithmCipher.wordToNumber(w, mappingObj));
                              if (numbers.every(n => n !== null)) {
                                return `${words[0]} (${numbers[0]}) ${parsed.operator || '+'} ${words[1]} (${numbers[1]}) = ${words[2]} (${numbers[2]})`;
                              }
                              return 'Equation is valid!';
                            })()}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-red-300 font-bold mb-1">❌ Invalid Equation</div>
                          <div className="text-sm text-red-200">{cryptarithmValidation.error}</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="bg-black/20 p-3 rounded-lg">
                    <div className="text-xs text-purple-200 mb-2">📋 Current Mapping:</div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {(() => {
                        const mappingObj = {};
                        cryptarithmMapping.split(',').forEach(pair => {
                          const [letter, digit] = pair.split('=').map(s => s.trim());
                          if (letter && digit) mappingObj[letter.toUpperCase()] = digit;
                        });
                        return Object.entries(mappingObj).map(([letter, digit]) => (
                          <div key={letter} className="bg-purple-600/30 p-2 rounded text-center">
                            <span className="font-bold">{letter}</span> = {digit}
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              )}

              <textarea 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder={selectedCipher === 'cryptarithm' ? mode === 'encrypt' ? "Enter equation or text to convert using mapping..." : "Enter numbers to convert back to letters..." : "Enter your message..."} 
                rows={4} 
                className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 mb-4 resize-none focus:outline-none focus:border-purple-400"
              ></textarea>
              
              {selectedCipher === 'cryptarithm' && mode === 'encrypt' && !inputText && (
                <div className="mb-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <div className="text-xs text-purple-200">
                    💡 <strong>Tip:</strong> For cryptarithm, you can either:
                    <ul className="list-disc list-inside mt-2 space-y-1 text-purple-300">
                      <li>Enter the equation text (e.g., "SEND + MORE = MONEY") to see it converted to numbers</li>
                      <li>Enter any text to convert letters to digits based on your mapping</li>
                    </ul>
                  </div>
                </div>
              )}

              <button 
                onClick={processCipher} 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg transform hover:scale-105"
              >
                {mode === 'encrypt' ? '🔒 Encrypt Message' : '🔓 Decrypt Message'}
              </button>

              {outputText && (
                <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-purple-200 font-semibold">Result:</div>
                    <button 
                      onClick={copyToClipboard} 
                      className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
                    >
                      {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
                    </button>
                  </div>
                  <div className="font-mono text-lg break-all bg-black/20 p-3 rounded">{outputText}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Practice Mode
            </h2>
            {!practiceChallenge ? (
              <div className="text-center py-8">
                <div className="mb-4 animate-bounce"><AnimatedOtter /></div>
                <p className="mb-2 text-xl font-bold">Otto wants to practice!</p>
                <p className="mb-6 text-purple-200">Select a cipher and start your challenge</p>
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-3xl mx-auto mb-4">
                    {(() => {
                      // Division C related ciphers (last 9 ciphers added)
                      const divisionCCiphers = ['railfence', 'pollux', 'morbit', 'vigenere', 'rsa', 'aristocratMisspelled', 'dancingMen', 'hill2x2', 'hill3x3'];
                      
                      // Filter ciphers based on Division C toggle
                      const availableCiphers = Object.keys(cipherAlgorithms).filter(key => {
                        // If Division C is not shown, exclude Division C ciphers
                        if (!showDivisionC && divisionCCiphers.includes(key)) {
                          return false;
                        }
                        return true;
                      });
                      
                      return availableCiphers.map(key => (
                        <button 
                          key={key} 
                          onClick={() => setSelectedCipher(key)} 
                          className={`p-3 rounded-lg text-sm transition-all transform hover:scale-105 ${selectedCipher === key ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span>{cipherAlgorithms[key].name}</span>
                            <span>{getDifficultyBadge(cipherAlgorithms[key].difficulty)}</span>
                          </div>
                        </button>
                      ));
                    })()}
                  </div>
                </div>
                <button 
                  onClick={generateChallenge} 
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-8 py-4 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all"
                >
                  <Star className="w-5 h-5 inline mr-2" />
                  Start Challenge
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-purple-900/50 p-4 rounded-lg mb-4 border border-purple-500/30">
                  <div className="text-sm text-purple-200 mb-2">
                    Cipher: <span className="font-bold text-yellow-300">{cipherAlgorithms[practiceChallenge.cipher].name}</span> {getDifficultyBadge(cipherAlgorithms[practiceChallenge.cipher].difficulty)}
                  </div>
                  
                  {practiceChallenge.cipher === 'cryptarithm' ? (
                    <div>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-yellow-300 mb-3">🧩 {practiceChallenge.equation}</div>
                        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-4 rounded-lg border-2 border-blue-400/30">
                          <div className="text-lg font-mono mb-2 text-blue-100">Given:</div>
                          <div className="text-3xl font-bold font-mono text-white mb-3">{practiceChallenge.encrypted}</div>
                          <div className="text-sm text-purple-200">What is the missing word or number?</div>
                        </div>
                      </div>
                      
                      {practiceChallenge.mapping && (
                        <div className="bg-black/20 p-3 rounded-lg mb-3">
                          <div className="text-xs text-purple-200 mb-2">💡 Letter-to-Digit Mapping:</div>
                          <div className="grid grid-cols-4 gap-1 text-xs">
                            {Object.entries(practiceChallenge.mapping).map(([letter, digit]) => (
                              <div key={letter} className="bg-purple-600/30 p-1 rounded text-center">
                                <span className="font-bold">{letter}</span> = {digit}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="font-mono text-xl mb-3 break-all bg-black/30 p-3 rounded">{practiceChallenge.encrypted}</div>
                      {practiceChallenge.shift && <div className="text-sm text-purple-200">💡 Hint: Shift = {practiceChallenge.shift}</div>}
                      {practiceChallenge.keyword && <div className="text-sm text-purple-200">💡 Keyword: {practiceChallenge.keyword}</div>}
                      {practiceChallenge.polybiusKey && <div className="text-sm text-purple-200">💡 Polybius Key: {practiceChallenge.polybiusKey}</div>}
                    </div>
                  )}
                </div>
                <input 
                  type="text" 
                  value={userAnswer} 
                  onChange={(e) => setUserAnswer(e.target.value)} 
                  placeholder={practiceChallenge.cipher === 'cryptarithm' ? "Enter the missing word or number..." : "Enter your answer..."} 
                  className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 mb-4 focus:outline-none focus:border-purple-400" 
                />
                <div className="flex gap-2">
                  <button 
                    onClick={checkAnswer} 
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 py-3 rounded-lg font-bold transition-all shadow-lg"
                  >
                    ✓ Check Answer
                  </button>
                  <button 
                    onClick={generateChallenge} 
                    className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-bold transition-all"
                  >
                    Skip →
                  </button>
                  <button 
                    onClick={() => setPracticeChallenge(null)} 
                    className="bg-purple-500/50 hover:bg-purple-500/70 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Change Cipher
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center text-purple-200 text-sm pb-8">
          <p>Made with 💜 by Otto the Otter</p>
          <p className="mt-2">Learn cryptography the fun way!</p>
        </div>
      </div>
    </div>
  );
};

export default CipherOtto