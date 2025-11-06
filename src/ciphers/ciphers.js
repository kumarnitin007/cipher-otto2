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

/**
 * Atbash Cipher - Reverse alphabet substitution cipher
 * 
 * One of the oldest known ciphers, dating back to ancient Hebrew. It reverses the alphabet:
 * A becomes Z, B becomes Y, C becomes X, etc.
 * 
 * Algorithm:
 * - Maps each letter to its reverse position in the alphabet
 * - Formula: reverse(x) = (25 - (x - base)) + base
 * - Where x is the character code and base is 65 (A) or 97 (a)
 * 
 * This cipher is self-reciprocal (encryption and decryption are the same operation).
 * 
 * Example:
 * - "HELLO" encrypts to "SVOOL"
 * - "CRYPTO" encrypts to "XIBKGL"
 * 
 * @type {Object}
 */
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
  /**
   * Encrypts text using Atbash cipher (reverses alphabet)
   * @param {string} text - Plaintext to encrypt
   * @returns {string} Encrypted text
   */
  encrypt: (text) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpper = code >= 65 && code <= 90;
        const base = isUpper ? 65 : 97;
        // Reverse alphabet: A(0) -> Z(25), B(1) -> Y(24), etc.
        return String.fromCharCode(base + (25 - (code - base)));
      }
      return char;
    }).join('');
  },
  /**
   * Decrypts text using Atbash cipher (same as encryption since it's self-reciprocal)
   * @param {string} text - Ciphertext to decrypt
   * @returns {string} Decrypted text
   */
  decrypt: (text) => atbashCipher.encrypt(text)
};

/**
 * Aristocrat Cipher - Monoalphabetic substitution cipher with preserved word spaces
 * 
 * A substitution cipher where each letter is replaced by another letter according to
 * a fixed substitution key. Unlike Patristocrat, this cipher preserves word boundaries
 * (spaces between words), making it easier to solve using frequency analysis and
 * common word patterns.
 * 
 * Algorithm:
 * - Uses a fixed substitution key mapping plain alphabet to cipher alphabet
 * - Key: 'ZEBRASCDFGHIJKLMNOPQTUVWXY' maps A->Z, B->E, C->B, etc.
 * - Preserves spaces and punctuation, making word boundaries visible
 * - Only processes uppercase letters
 * 
 * Example:
 * - Plain: "HELLO WORLD"
 * - Key mapping: H->S, E->E, L->B, O->R, W->O, R->C, D->F
 * - Cipher: "SEBBR OCBDF"
 * 
 * Difficulty: Intermediate - Word boundaries make frequency analysis easier
 * 
 * @type {Object}
 */
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
  /**
   * Encrypts text using monoalphabetic substitution while preserving spaces
   * @param {string} text - Plaintext to encrypt
   * @returns {string} Encrypted text with spaces preserved
   */
  encrypt: (text) => {
    const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = aristocratCipher.key;
    return text.toUpperCase().split('').map(char => {
      if (char.match(/[A-Z]/)) {
        // Map plain letter to cipher letter using substitution key
        return key[plain.indexOf(char)];
      }
      // Preserve spaces and punctuation
      return char;
    }).join('');
  },
  /**
   * Decrypts text by reversing the substitution mapping
   * @param {string} text - Ciphertext to decrypt
   * @returns {string} Decrypted text
   */
  decrypt: (text) => {
    const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = aristocratCipher.key;
    return text.toUpperCase().split('').map(char => {
      if (char.match(/[A-Z]/)) {
        // Find cipher letter in key, map back to plain letter
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

/**
 * Nihilist Cipher - Polybius square with numerical addition
 * 
 * Used by Russian Nihilists in the 1880s. This cipher combines a Polybius square
 * (5x5 grid mapping letters to coordinates) with a keyword-based addition system.
 * 
 * Algorithm:
 * 1. Create a 5x5 Polybius square from a keyword (J and I share the same cell)
 * 2. Convert each letter of the plaintext to its row/column coordinates (1-5)
 * 3. Convert each letter of a repeating keyword to its coordinates
 * 4. Add the plaintext coordinates to the keyword coordinates
 * 5. Output the sum as a two-digit number
 * 
 * Example with keyword "CRYPTO" and polybius key "CRYPTO":
 * - Plaintext: "HELLO"
 * - H -> (2,5) = 25, E -> (1,5) = 15, L -> (3,4) = 34, etc.
 * - Keyword "CRYPTO" -> (1,3)=13, (4,4)=44, (5,2)=52, etc.
 * - Add: 25+13=38, 15+44=59, 34+52=86, etc.
 * - Output: "38 59 86 ..."
 * 
 * Decryption reverses this process by subtracting keyword coordinates.
 * 
 * @type {Object}
 */
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

/**
 * Straddling Checkerboard Cipher - Variable-length numerical encoding
 * 
 * Used by Soviet spies during the Cold War. This cipher creates a variable-length
 * numerical encoding where some letters map to single digits and others map to
 * two-digit numbers based on blank positions in the checkerboard.
 * 
 * Algorithm:
 * 1. Creates a checkerboard with blank positions (default: columns 2 and 6)
 * 2. Letters in non-blank columns map to single digits (0-9)
 * 3. Letters in blank columns map to two-digit numbers (blank position + digit)
 * 4. Creates variable-length encoding (some letters = 1 digit, others = 2 digits)
 * 
 * This creates a compact numerical representation where common letters (in non-blank
 * columns) use fewer digits, making the ciphertext shorter.
 * 
 * Example:
 * - With blanks at positions 2,6: A=0, B=1, C=2, D=3, E=4, etc.
 * - Letters in blank columns: use 20, 21, 22, ... or 60, 61, 62, ...
 * 
 * @type {Object}
 */
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
    { name: 'VigenÃ¨re Cipher', inApp: false, description: 'Classic polyalphabetic cipher using keyword' },
    { name: 'Beaufort Cipher', inApp: false, description: 'Similar to VigenÃ¨re but uses subtraction' },
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
   * Example: "SEND + MORE = MONEY" â†’ { parts: [{word: 'SEND'}, {word: 'MORE'}, {word: 'MONEY'}], operator: '+' }
   * @param {string} equation - Equation string (e.g., "SEND + MORE = MONEY")
   * @returns {Object} Object with parts array and operator
   */
  parseEquation: (equation) => {
    const cleaned = equation.toUpperCase().replace(/\s+/g, ' ').trim();
    const operators = ['+', '-', '*', '/', '=', 'Ã—', 'Ã·'];
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
   * Example: wordToNumber("SEND", {S:'9', E:'5', N:'6', D:'7'}) â†’ 9567
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
    } else if (parsed.operator === '*' || parsed.operator === 'Ã—') {
      result = numbers[0] * numbers[1];
    } else if (parsed.operator === '/' || parsed.operator === 'Ã·') {
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
  info: 'A monoalphabetic substitution cipher used on Spanish text. Uses the 27-letter Spanish alphabet including Ã‘. Popular in cryptography competitions.',
  youtubeUrl: 'https://www.youtube.com/watch?v=aZ_94itKw28&t=39s',
  funMessage: 'Â¡Hola! This cipher works with Spanish text! Try encrypting "HOLA MUNDO"!',
  relatedCiphers: [
    { name: 'Aristocrat Cipher', inApp: true, description: 'Similar monoalphabetic substitution cipher' },
    { name: 'Patristocrat Cipher', inApp: true, description: 'Same concept but removes spaces' },
    { name: 'Caesar Cipher', inApp: true, description: 'Simpler substitution cipher' }
  ],
  key: 'ZEBRASCDFGHIJKLMNOPQTUVWXYÃ‘',
  encrypt: (text, keyword = 'CRYPTO') => {
    // Create substitution key from keyword
    const createKey = (key) => {
      const uniqueKey = [...new Set(key.toUpperCase().replace(/[^A-ZÃ‘]/g, '').split(''))].join('');
      const spanishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÃ‘';
      let result = uniqueKey;
      for (let char of spanishAlphabet) {
        if (!result.includes(char)) result += char;
      }
      return result.slice(0, 27);
    };
    
    const substitutionKey = createKey(keyword);
    const plainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÃ‘';
    
    // Normalize Spanish text (convert accented to unaccented)
    const normalize = (str) => {
      return str.toUpperCase()
        .replace(/Ã/g, 'A').replace(/Ã‰/g, 'E').replace(/Ã/g, 'I')
        .replace(/Ã“/g, 'O').replace(/Ãš/g, 'U').replace(/Ãœ/g, 'U');
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
      const uniqueKey = [...new Set(key.toUpperCase().replace(/[^A-ZÃ‘]/g, '').split(''))].join('');
      const spanishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÃ‘';
      let result = uniqueKey;
      for (let char of spanishAlphabet) {
        if (!result.includes(char)) result += char;
      }
      return result.slice(0, 27);
    };
    
    const substitutionKey = createKey(keyword);
    const plainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÃ‘';
    
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
 * VigenÃ¨re Cipher - Polyalphabetic substitution cipher
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
  name: 'VigenÃ¨re',
  description: 'Polyalphabetic substitution cipher',
  category: 'polyalphabetic',
  difficulty: 'intermediate',
  info: 'Uses a keyword to create multiple Caesar ciphers. Each letter of the keyword determines the shift for the corresponding plaintext letter.',
  youtubeUrl: 'https://www.youtube.com/watch?v=SkJcmCaHqS0',
  funMessage: 'VigenÃ¨re adds keyword-based shifts! Much stronger than Caesar!',
  relatedCiphers: [
    { name: 'Caesar Cipher', inApp: true, description: 'Single shift substitution' },
    { name: 'Porta Cipher', inApp: true, description: 'Another keyword-based cipher' },
    { name: 'Beaufort Cipher', inApp: false, description: 'Variant of VigenÃ¨re' }
  ],
  /**
   * Encrypts text using VigenÃ¨re cipher with keyword
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
   * Decrypts text using VigenÃ¨re cipher with keyword
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
      'A': 'ðŸ•º', 'B': 'ðŸ’ƒ', 'C': 'ðŸ‘¯', 'D': 'ðŸ•´', 'E': 'ðŸ§',
      'F': 'ðŸ§Ž', 'G': 'ðŸƒ', 'H': 'ðŸš¶', 'I': 'ðŸ¤¸', 'J': 'ðŸ¤¾',
      'K': 'ðŸ¤½', 'L': 'ðŸŠ', 'M': 'ðŸ§—', 'N': 'ðŸ¤¹', 'O': 'ðŸš´',
      'P': 'ðŸ‡', 'Q': 'ðŸ‚', 'R': 'â›·ï¸', 'S': 'ðŸ„', 'T': 'ðŸ‹ï¸',
      'U': 'ðŸ¤¼', 'V': 'ðŸ¤º', 'W': 'ðŸ¤¸', 'X': 'ðŸ§˜', 'Y': 'ðŸ¤³', 'Z': 'ðŸ§'
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
      'ðŸ•º': 'A', 'ðŸ’ƒ': 'B', 'ðŸ‘¯': 'C', 'ðŸ•´': 'D', 'ðŸ§': 'E',
      'ðŸ§Ž': 'F', 'ðŸƒ': 'G', 'ðŸš¶': 'H', 'ðŸ¤¸': 'I', 'ðŸ¤¾': 'J',
      'ðŸ¤½': 'K', 'ðŸŠ': 'L', 'ðŸ§—': 'M', 'ðŸ¤¹': 'N', 'ðŸš´': 'O',
      'ðŸ‡': 'P', 'ðŸ‚': 'Q', 'â›·ï¸': 'R', 'ðŸ„': 'S', 'ðŸ‹ï¸': 'T',
      'ðŸ¤¼': 'U', 'ðŸ¤º': 'V', 'ðŸ§˜': 'X', 'ðŸ¤³': 'Y', 'ðŸ§': 'Z'
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

// ============================================================================
// Export Cipher Algorithms
// ============================================================================
/**
 * Collection of all cipher algorithms
 * Each cipher is an object with:
 * - name: Display name
 * - description: Short description
 * - category: Type of cipher (substitution, transposition, etc.)
 * - difficulty: Beginner, intermediate, or advanced
 * - encrypt: Function to encrypt text
 * - decrypt: Function to decrypt text
 * - info: Additional information about the cipher
 * - relatedCiphers: Array of related cipher references
 */
export const cipherAlgorithms = {
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

