import React, { useState, useEffect } from 'react';
import { Lock, Unlock, BookOpen, Trophy, Heart, Coffee, DollarSign, ChevronDown, ChevronUp, Info, Copy, Check, Sparkles, Star } from 'lucide-react';

// ============================================================================
// Animated Otter Component
// ============================================================================
const AnimatedOtter = () => {
  const [isWaving, setIsWaving] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 600);
    }, 3000);
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
  encrypt: (text, shift = 3) => {
    shift = parseInt(shift) || 3;
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    }).join('');
  },
  decrypt: (text, shift = 3) => {
    shift = parseInt(shift) || 3;
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
  encrypt: (text, a = 5, b = 8) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        const x = code - base;
        return String.fromCharCode(((a * x + b) % 26) + base);
      }
      return char;
    }).join('');
  },
  decrypt: (text, a = 5, b = 8) => {
    const modInverse = (a, m) => {
      for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
      }
      return 1;
    };
    const aInv = modInverse(a, 26);
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        const y = code - base;
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
  info: 'A type of mathematical puzzle where digits are replaced by letters.',
  youtubeUrl: 'https://puzzles-to-print.com/math-puzzles/cryptarithms.shtml',
  funMessage: 'Math meets cryptography! SEND + MORE = MONEY can you solve it?',
  relatedCiphers: [
    { name: 'Aristocrat Cipher', inApp: true, description: 'Letter substitution puzzle' },
    { name: 'Alphametics', inApp: false, description: 'Classic cryptarithm puzzles' }
  ],
  encrypt: (text) => {
    // For demonstration, we'll create a simple letter-to-digit mapping
    const digitMap = {
      'O': '0', 'I': '1', 'T': '2', 'E': '3', 'F': '4',
      'S': '5', 'X': '6', 'V': '7', 'N': '8', 'U': '9'
    };
    
    return text.toUpperCase().split('').map(char => {
      if (digitMap[char]) return digitMap[char];
      return char;
    }).join('');
  },
  decrypt: (text) => {
    const letterMap = {
      '0': 'O', '1': 'I', '2': 'T', '3': 'E', '4': 'F',
      '5': 'S', '6': 'X', '7': 'V', '8': 'N', '9': 'U'
    };
    
    return text.split('').map(char => {
      if (letterMap[char]) return letterMap[char];
      return char;
    }).join('');
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
  cryptarithm: cryptarithmCipher
};

// ============================================================================
// Helper Functions
// ============================================================================
const categories = {
  substitution: { name: 'Substitution', icon: '🔤' },
  polygraphic: { name: 'Polygraphic', icon: '🔢' },
  transposition: { name: 'Transposition', icon: '↔️' },
  encoding: { name: 'Encoding', icon: '💾' },
  polyalphabetic: { name: 'Polyalphabetic', icon: '🔄' },
  puzzle: { name: 'Puzzle', icon: '🧩' }
};

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'beginner': return 'text-green-300';
    case 'intermediate': return 'text-yellow-300';
    case 'advanced': return 'text-red-300';
    default: return 'text-gray-300';
  }
};

const getDifficultyBadge = (difficulty) => {
  switch(difficulty) {
    case 'beginner': return '⭐';
    case 'intermediate': return '⭐⭐';
    case 'advanced': return '⭐⭐⭐';
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

const CipherSelector = ({ selectedCipher, onSelect }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-yellow-400" />
        Select Cipher
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.keys(cipherAlgorithms).map(key => (
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
const CipherOtto = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [selectedCipher, setSelectedCipher] = useState('caesar');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [copied, setCopied] = useState(false);
  
  const [caesarShift, setCaesarShift] = useState(3);
  const [columnarKeyword, setColumnarKeyword] = useState('CRYPTO');
  const [affineA, setAffineA] = useState(5);
  const [affineB, setAffineB] = useState(8);
  const [checkerboardKey, setCheckerboardKey] = useState('CRYPTO');
  const [checkerboardBlanks, setCheckerboardBlanks] = useState('2,6');
  const [nihilistKeyword, setNihilistKeyword] = useState('CRYPTO');
  const [nihilistPolybiusKey, setNihilistPolybiusKey] = useState('CRYPTO');
  const [portaKeyword, setPortaKeyword] = useState('CRYPTO');
  
  const [practiceChallenge, setPracticeChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showCipherInfo, setShowCipherInfo] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const processCipher = () => {
    const cipher = cipherAlgorithms[selectedCipher];
    if (!cipher) return;
    
    let result;
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
    } else {
      result = mode === 'encrypt' ? cipher.encrypt(inputText) : cipher.decrypt(inputText);
    }
    setOutputText(result);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const generateChallenge = () => {
    const messages = [
      'HELLO WORLD', 'CRYPTOGRAPHY IS FUN', 'BREAK THE CODE', 'SECRET MESSAGE',
      'OTTO THE OTTER', 'CIPHER CHALLENGE', 'LEARN TO ENCRYPT', 'HIDDEN TREASURE',
      'SPY ACADEMY', 'CODE BREAKER', 'MATH IS COOL', 'SECURITY FIRST',
      'PUZZLE MASTER', 'CRYPTO WIZARD', 'SECRET AGENT', 'DECODE THIS NOW'
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const cipher = cipherAlgorithms[selectedCipher];
    
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
      
      setPracticeChallenge({
        original: puzzle.answer,
        encrypted: puzzle.hint,
        cipher: selectedCipher,
        equation: puzzle.equation,
        fullAnswer: puzzle.fullAnswer,
        mapping: puzzle.mapping || cryptarithmCipher.letterMap
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
  
  const checkAnswer = () => {
    if (selectedCipher === 'cryptarithm') {
      // For cryptarithm, check if the word matches OR if the number matches
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
            <CipherSelector selectedCipher={selectedCipher} onSelect={setSelectedCipher} />

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

              {selectedCipher === 'cryptarithm' && (
                <div className="mb-4 p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg border-2 border-purple-500/30">
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-yellow-300 mb-2">🧩 SEND + MORE = MONEY</div>
                    <div className="text-sm text-purple-200 mb-2">Letter-to-Digit Mapping:</div>
                    <div className="grid grid-cols-4 gap-2 text-xs bg-black/20 p-3 rounded-lg">
                      <div className="bg-purple-600/30 p-2 rounded"><span className="font-bold">S</span> = 9</div>
                      <div className="bg-purple-600/30 p-2 rounded"><span className="font-bold">E</span> = 5</div>
                      <div className="bg-purple-600/30 p-2 rounded"><span className="font-bold">N</span> = 6</div>
                      <div className="bg-purple-600/30 p-2 rounded"><span className="font-bold">D</span> = 7</div>
                      <div className="bg-pink-600/30 p-2 rounded"><span className="font-bold">M</span> = 1</div>
                      <div className="bg-pink-600/30 p-2 rounded"><span className="font-bold">O</span> = 0</div>
                      <div className="bg-pink-600/30 p-2 rounded"><span className="font-bold">R</span> = 8</div>
                      <div className="bg-pink-600/30 p-2 rounded"><span className="font-bold">Y</span> = 2</div>
                    </div>
                    <div className="mt-3 text-sm text-purple-200">
                      Try: "SEND + MORE" or "9567 + 1085"
                    </div>
                  </div>
                </div>
              )}

              <textarea 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder="Enter your message..." 
                rows={4} 
                className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 mb-4 resize-none focus:outline-none focus:border-purple-400"
              ></textarea>

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
                    {Object.keys(cipherAlgorithms).map(key => (
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
                    ))}
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