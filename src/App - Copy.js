import React, { useState, useEffect } from 'react';
import { Lock, Unlock, BookOpen, Trophy, Heart, Coffee, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

// Animated Otter Logo Component
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
        
        <g style={{
          animation: isWaving ? 'wave 0.6s ease-in-out' : 'none',
          transformOrigin: '30px 55px'
        }}>
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
      
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
      `}</style>
    </div>
  );
};

// Cipher implementations organized by category
const cipherAlgorithms = {
  // SUBSTITUTION CIPHERS
  caesar: {
    name: 'Caesar Cipher',
    description: 'Shift each letter by a fixed number',
    category: 'substitution',
    difficulty: 'beginner',
    requiresKeys: true,
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
      return cipherAlgorithms.caesar.encrypt(text, 26 - shift);
    }
  },
  atbash: {
    name: 'Atbash Cipher',
    description: 'Reverse alphabet substitution (A↔Z, B↔Y)',
    category: 'substitution',
    difficulty: 'beginner',
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
    decrypt: (text) => {
      return cipherAlgorithms.atbash.encrypt(text);
    }
  },
  aristocrat: {
    name: 'Aristocrat Cipher',
    description: 'Monoalphabetic substitution preserving spaces',
    category: 'substitution',
    difficulty: 'intermediate',
    key: 'ZEBRASCDFGHIJKLMNOPQTUVWXY',
    encrypt: (text) => {
      const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const key = cipherAlgorithms.aristocrat.key;
      return text.toUpperCase().split('').map(char => {
        if (char.match(/[A-Z]/)) {
          const index = plain.indexOf(char);
          return key[index];
        }
        return char;
      }).join('');
    },
    decrypt: (text) => {
      const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const key = cipherAlgorithms.aristocrat.key;
      return text.toUpperCase().split('').map(char => {
        if (char.match(/[A-Z]/)) {
          const index = key.indexOf(char);
          return plain[index];
        }
        return char;
      }).join('');
    }
  },
  patristocrat: {
    name: 'Patristocrat Cipher',
    description: 'Aristocrat without word spaces',
    category: 'substitution',
    difficulty: 'intermediate',
    key: 'ZEBRASCDFGHIJKLMNOPQTUVWXY',
    encrypt: (text) => {
      const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const key = cipherAlgorithms.patristocrat.key;
      return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(char => {
        const index = plain.indexOf(char);
        return key[index];
      }).join('');
    },
    decrypt: (text) => {
      const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const key = cipherAlgorithms.patristocrat.key;
      return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(char => {
        const index = key.indexOf(char);
        return plain[index];
      }).join('');
    }
  },
  affine: {
    name: 'Affine Cipher',
    description: 'Mathematical formula: E(x) = (ax + b) mod 26',
    category: 'substitution',
    difficulty: 'advanced',
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
    decrypt: (text) => {
      return 'Use decryption formula with modular inverse';
    }
  },
  
  // POLYALPHABETIC CIPHERS
  porta: {
    name: 'Porta Cipher',
    description: 'Polyalphabetic cipher with reciprocal alphabet',
    category: 'polyalphabetic',
    difficulty: 'intermediate',
    requiresKeys: true,
    encrypt: (text, keyword = 'CRYPTO') => {
      const portaTable = {
        'AB': 'NOPQRSTUVWXYZABCDEFGHIJKLM',
        'CD': 'OPQRSTUVWXYZABCDEFGHIJKLMN',
        'EF': 'PQRSTUVWXYZABCDEFGHIJKLMNO',
        'GH': 'QRSTUVWXYZABCDEFGHIJKLMNOP',
        'IJ': 'RSTUVWXYZABCDEFGHIJKLMNOPQ',
        'KL': 'STUVWXYZABCDEFGHIJKLMNOPQR',
        'MN': 'TUVWXYZABCDEFGHIJKLMNOPQRS',
        'OP': 'UVWXYZABCDEFGHIJKLMNOPQRST',
        'QR': 'VWXYZABCDEFGHIJKLMNOPQRSTU',
        'ST': 'WXYZABCDEFGHIJKLMNOPQRSTUV',
        'UV': 'XYZABCDEFGHIJKLMNOPQRSTUVW',
        'WX': 'YZABCDEFGHIJKLMNOPQRSTUVWX',
        'YZ': 'ZABCDEFGHIJKLMNOPQRSTUVWXY'
      };
      
      const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
      const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, '');
      let result = '';
      
      for (let i = 0; i < cleanText.length; i++) {
        const textChar = cleanText[i];
        const keyChar = cleanKey[i % cleanKey.length];
        
        let keyRow = null;
        for (let pair in portaTable) {
          if (pair.includes(keyChar)) {
            keyRow = portaTable[pair];
            break;
          }
        }
        
        if (keyRow) {
          const textIndex = plain.indexOf(textChar);
          result += keyRow[textIndex];
        }
      }
      return result;
    },
    decrypt: (text, keyword = 'CRYPTO') => {
      return cipherAlgorithms.porta.encrypt(text, keyword);
    }
  },
  
  // POLYGRAPHIC CIPHERS
  nihilist: {
    name: 'Nihilist Cipher',
    description: 'Polybius square with numerical key addition',
    category: 'polygraphic',
    difficulty: 'advanced',
    requiresKeys: true,
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
  },
  checkerboard: {
    name: 'Straddling Checkerboard',
    description: 'Variable-length numerical encoding',
    category: 'polygraphic',
    difficulty: 'advanced',
    requiresKeys: true,
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
    decrypt: (text) => {
      return 'Decryption requires board reconstruction';
    }
  },
  
  // TRANSPOSITION CIPHERS
  columnar: {
    name: 'Complete Columnar',
    description: 'Transposition using keyword column order',
    category: 'transposition',
    difficulty: 'intermediate',
    requiresKeys: true,
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
  },
  
  // ENCODING CIPHERS
  baconian: {
    name: 'Baconian Cipher',
    description: 'Binary encoding with A and B',
    category: 'encoding',
    difficulty: 'beginner',
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
  }
};

const CipherOtto = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCipher, setSelectedCipher] = useState('caesar');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encrypt');
  
  // Cipher-specific parameters
  const [caesarShift, setCaesarShift] = useState(3);
  const [nihilistKeyword, setNihilistKeyword] = useState('CRYPTO');
  const [nihilistPolybiusKey, setNihilistPolybiusKey] = useState('CRYPTO');
  const [portaKeyword, setPortaKeyword] = useState('CRYPTO');
  const [columnarKeyword, setColumnarKeyword] = useState('CRYPTO');
  const [checkerboardKey, setCheckerboardKey] = useState('CRYPTO');
  const [checkerboardBlanks, setCheckerboardBlanks] = useState('2,6');
  
  const [practiceChallenge, setPracticeChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showFrequencyTable, setShowFrequencyTable] = useState(false);

  const VENMO_LINK = 'https://venmo.com/YOUR-USERNAME';
  const PAYPAL_LINK = 'https://paypal.me/YOUR-USERNAME';

  const categories = {
    all: { name: 'All Ciphers', icon: '🔐' },
    substitution: { name: 'Substitution', icon: '🔤' },
    polyalphabetic: { name: 'Polyalphabetic', icon: '🔡' },
    polygraphic: { name: 'Polygraphic', icon: '🔢' },
    transposition: { name: 'Transposition', icon: '↔️' },
    encoding: { name: 'Encoding', icon: '💾' }
  };

  const getFilteredCiphers = () => {
    if (selectedCategory === 'all') {
      return Object.keys(cipherAlgorithms);
    }
    return Object.keys(cipherAlgorithms).filter(
      key => cipherAlgorithms[key].category === selectedCategory
    );
  };

  const generateChallenge = () => {
    const messages = ['HELLO WORLD', 'CRYPTOGRAPHY IS FUN', 'BREAK THE CODE', 'SECRET MESSAGE', 'LEARN TO ENCRYPT'];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const cipher = cipherAlgorithms[selectedCipher];
    
    let encrypted, challengeKeyword, challengePolybiusKey, challengeShift, frequencyTable;
    
    if (selectedCipher === 'nihilist') {
      challengeKeyword = 'SECRET';
      challengePolybiusKey = 'CRYPTO';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword, challengePolybiusKey);
    } else if (selectedCipher === 'caesar') {
      challengeShift = Math.floor(Math.random() * 25) + 1;
      encrypted = cipher.encrypt(randomMsg, challengeShift);
    } else if (selectedCipher === 'porta' || selectedCipher === 'columnar') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword);
    } else if (selectedCipher === 'checkerboard') {
      challengeKeyword = 'SECRET';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword, '2,6');
    } else {
      encrypted = cipher.encrypt(randomMsg);
      
      if (selectedCipher === 'aristocrat' || selectedCipher === 'patristocrat') {
        const letterCounts = {};
        encrypted.replace(/[^A-Z]/g, '').split('').forEach(char => {
          letterCounts[char] = (letterCounts[char] || 0) + 1;
        });
        frequencyTable = Object.entries(letterCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([letter, count]) => ({ letter, count }));
      }
    }
    
    setPracticeChallenge({
      original: randomMsg,
      encrypted: encrypted,
      cipher: selectedCipher,
      keyword: challengeKeyword,
      polybiusKey: challengePolybiusKey,
      shift: challengeShift,
      frequencyTable: frequencyTable
    });
    setUserAnswer('');
    setShowFrequencyTable(false);
  };

  const checkAnswer = () => {
    if (userAnswer.toUpperCase().replace(/\s/g, '') === practiceChallenge.original.replace(/\s/g, '')) {
      const cipher = cipherAlgorithms[practiceChallenge.cipher];
      const points = cipher.difficulty === 'beginner' ? 5 : cipher.difficulty === 'intermediate' ? 10 : 15;
      setScore(score + points);
      alert(`🎉 Correct! Otto is so proud! +${points} points`);
      generateChallenge();
    } else {
      alert('🦦 Not quite right. Otto believes in you - try again!');
    }
  };

  const processCipher = () => {
    const cipher = cipherAlgorithms[selectedCipher];
    if (cipher) {
      let result;
      
      if (selectedCipher === 'nihilist') {
        result = mode === 'encrypt' 
          ? cipher.encrypt(inputText, nihilistKeyword, nihilistPolybiusKey)
          : cipher.decrypt(inputText, nihilistKeyword, nihilistPolybiusKey);
      } else if (selectedCipher === 'caesar') {
        result = mode === 'encrypt' 
          ? cipher.encrypt(inputText, caesarShift)
          : cipher.decrypt(inputText, caesarShift);
      } else if (selectedCipher === 'porta') {
        result = mode === 'encrypt' 
          ? cipher.encrypt(inputText, portaKeyword)
          : cipher.decrypt(inputText, portaKeyword);
      } else if (selectedCipher === 'columnar') {
        result = mode === 'encrypt' 
          ? cipher.encrypt(inputText, columnarKeyword)
          : cipher.decrypt(inputText, columnarKeyword);
      } else if (selectedCipher === 'checkerboard') {
        result = mode === 'encrypt' 
          ? cipher.encrypt(inputText, checkerboardKey, checkerboardBlanks)
          : cipher.decrypt(inputText);
      } else {
        result = mode === 'encrypt' ? cipher.encrypt(inputText) : cipher.decrypt(inputText);
      }
      
      setOutputText(result);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <AnimatedOtter />
          <h1 className="text-4xl font-bold mb-2 mt-4">Cipher Otto</h1>
          <p className="text-purple-200">Master the Art of Cryptography with Otto! 🦦</p>
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <div className="bg-white/10 rounded-full px-4 py-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{score} points</span>
            </div>
            <button
              onClick={() => setShowDonateModal(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full px-4 py-2 flex items-center gap-2 font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Support Otto
            </button>
          </div>
        </div>

        {showDonateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowDonateModal(false)}>
            <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-white/20" onClick={e => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="mb-4"><AnimatedOtter /></div>
                <h2 className="text-3xl font-bold mb-2">Support Cipher Otto! 🦦</h2>
                <p className="text-purple-200">Help keep Otto swimming and teaching cryptography!</p>
              </div>
              <div className="space-y-3 mb-6">
                <a href={VENMO_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl">
                  <Coffee className="w-6 h-6 inline mr-2" />Donate via Venmo
                </a>
                <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl">
                  <DollarSign className="w-6 h-6 inline mr-2" />Donate via PayPal
                </a>
              </div>
              <p className="text-sm text-purple-200 text-center mb-4">💙 Every contribution helps!</p>
              <button onClick={() => setShowDonateModal(false)} className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-semibold transition-all">Close</button>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6 bg-white/10 rounded-lg p-1">
          <button onClick={() => setActiveTab('learn')} className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeTab === 'learn' ? 'bg-white text-purple-900' : 'text-white hover:bg-white/20'}`}>
            <BookOpen className="w-5 h-5 inline mr-2" />Learn
          </button>
          <button onClick={() => setActiveTab('practice')} className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeTab === 'practice' ? 'bg-white text-purple-900' : 'text-white hover:bg-white/20'}`}>
            <Trophy className="w-5 h-5 inline mr-2" />Practice
          </button>
        </div>

        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Cipher Categories</h2>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(categories).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Select Cipher</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getFilteredCiphers().map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedCipher(key)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedCipher === key
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold">{cipherAlgorithms[key].name}</div>
                      <span className={getDifficultyColor(cipherAlgorithms[key].difficulty)}>
                        {getDifficultyBadge(cipherAlgorithms[key].difficulty)}
                      </span>
                    </div>
                    <div className="text-sm opacity-90">{cipherAlgorithms[key].description}</div>
                    <div className="text-xs mt-2 opacity-75">
                      {categories[cipherAlgorithms[key].category]?.icon} {categories[cipherAlgorithms[key].category]?.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex gap-2 mb-4">
                <button onClick={() => setMode('encrypt')} className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${mode === 'encrypt' ? 'bg-green-500 text-white' : 'bg-white/20'}`}>
                  <Lock className="w-5 h-5" />Encrypt
                </button>
                <button onClick={() => setMode('decrypt')} className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${mode === 'decrypt' ? 'bg-blue-500 text-white' : 'bg-white/20'}`}>
                  <Unlock className="w-5 h-5" />Decrypt
                </button>
              </div>

              {selectedCipher === 'caesar' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">🔑 Shift Value (0-25):</label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={caesarShift}
                    onChange={(e) => setCaesarShift(parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white"
                  />
                </div>
              )}

              {selectedCipher === 'nihilist' && (
                <div className="mb-4 space-y-3 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <div className="text-sm font-bold text-purple-200 mb-2">🔑 Nihilist Cipher Keys:</div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Encryption Keyword:</label>
                    <input
                      type="text"
                      value={nihilistKeyword}
                      onChange={(e) => setNihilistKeyword(e.target.value.toUpperCase())}
                      placeholder="SECRET"
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Polybius Key:</label>
                    <input
                      type="text"
                      value={nihilistPolybiusKey}
                      onChange={(e) => setNihilistPolybiusKey(e.target.value.toUpperCase())}
                      placeholder="CRYPTO"
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 font-mono"
                    />
                    <div className="text-xs text-purple-300 mt-1">💡 Build your 5×5 Polybius square from this key</div>
                  </div>
                </div>
              )}

              {selectedCipher === 'porta' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">🔑 Keyword:</label>
                  <input
                    type="text"
                    value={portaKeyword}
                    onChange={(e) => setPortaKeyword(e.target.value.toUpperCase())}
                    placeholder="CRYPTO"
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50"
                  />
                </div>
              )}

              {selectedCipher === 'columnar' && (
                <div className="mb-4 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <label className="text-sm font-bold text-purple-200 block mb-2">🔑 Keyword:</label>
                  <input
                    type="text"
                    value={columnarKeyword}
                    onChange={(e) => setColumnarKeyword(e.target.value.toUpperCase())}
                    placeholder="CRYPTO"
                    className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50"
                  />
                  <div className="text-xs text-purple-300 mt-1">💡 Columns are arranged by alphabetical order of keyword letters</div>
                </div>
              )}

              {selectedCipher === 'checkerboard' && (
                <div className="mb-4 space-y-3 p-4 bg-purple-900/30 rounded-lg border-2 border-purple-500/30">
                  <div className="text-sm font-bold text-purple-200 mb-2">🔑 Checkerboard Settings:</div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Key:</label>
                    <input
                      type="text"
                      value={checkerboardKey}
                      onChange={(e) => setCheckerboardKey(e.target.value.toUpperCase())}
                      placeholder="CRYPTO"
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-purple-200 block mb-1">Blank Positions (e.g., 2,6):</label>
                    <input
                      type="text"
                      value={checkerboardBlanks}
                      onChange={(e) => setCheckerboardBlanks(e.target.value)}
                      placeholder="2,6"
                      className="w-full p-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 font-mono"
                    />
                  </div>
                </div>
              )}

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your message..."
                className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 mb-4"
              />
              <button
                onClick={processCipher}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                {mode === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message'}
              </button>

              {outputText && (
                <div className="mt-4 p-4 bg-white/20 rounded-lg">
                  <div className="text-sm text-purple-200 mb-2">Result:</div>
                  <div className="font-mono text-lg break-all">{outputText}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Practice Mode</h2>
              
              {!practiceChallenge ? (
                <div className="text-center py-8">
                  <div className="mb-4 animate-bounce"><AnimatedOtter /></div>
                  <p className="mb-2 text-xl font-bold">Otto wants to practice!</p>
                  <p className="mb-4 text-purple-200">Ready to test your cipher-cracking skills?</p>
                  
                  <div className="mb-6">
                    <label className="text-sm font-bold text-purple-200 block mb-3">
                      Choose a cipher to practice (higher difficulty = more points!):
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto">
                      {Object.keys(cipherAlgorithms).map(key => (
                        <button
                          key={key}
                          onClick={() => setSelectedCipher(key)}
                          className={`p-3 rounded-lg text-sm transition-all ${
                            selectedCipher === key
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold'
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs truncate">{cipherAlgorithms[key].name}</span>
                            <span className="text-xs ml-1">
                              {getDifficultyBadge(cipherAlgorithms[key].difficulty)}
                            </span>
                          </div>
                          <div className={`text-xs ${selectedCipher === key ? 'text-gray-700' : 'text-purple-300'}`}>
                            {cipherAlgorithms[key].difficulty === 'beginner' && '+5 pts'}
                            {cipherAlgorithms[key].difficulty === 'intermediate' && '+10 pts'}
                            {cipherAlgorithms[key].difficulty === 'advanced' && '+15 pts'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={generateChallenge}
                    className="bg-gradient-to-r from-green-500 to-teal-500 px-8 py-4 rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition-all"
                  >
                    Start Challenge
                  </button>
                </div>
              ) : (
                <div>
                  <div className="bg-purple-900/50 p-4 rounded-lg mb-4">
                    <div className="text-sm text-purple-200 mb-2">
                      Cipher: {cipherAlgorithms[practiceChallenge.cipher].name} {getDifficultyBadge(cipherAlgorithms[practiceChallenge.cipher].difficulty)}
                    </div>
                    <div className="font-mono text-xl mb-3 break-all">{practiceChallenge.encrypted}</div>
                    
                    {(practiceChallenge.cipher === 'aristocrat' || practiceChallenge.cipher === 'patristocrat') && practiceChallenge.frequencyTable && (
                      <div className="mt-3">
                        <button
                          onClick={() => setShowFrequencyTable(!showFrequencyTable)}
                          className="w-full bg-purple-700/50 hover:bg-purple-700/70 p-3 rounded-lg transition-all flex items-center justify-between font-semibold"
                        >
                          <span>📊 Letter Frequency Analysis</span>
                          {showFrequencyTable ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        
                        {showFrequencyTable && (
                          <div className="mt-3 p-4 bg-purple-800/50 rounded-lg border border-purple-500/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs text-purple-300 mb-2">Ciphertext Letters:</div>
                                <div className="space-y-1">
                                  {practiceChallenge.frequencyTable.map(({ letter, count }) => (
                                    <div key={letter} className="flex items-center gap-2">
                                      <span className="font-mono text-yellow-300 font-bold w-6">{letter}</span>
                                      <div className="flex-1 bg-purple-900/50 rounded-full h-5 overflow-hidden">
                                        <div
                                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full flex items-center justify-end pr-2"
                                          style={{ width: `${(count / Math.max(...practiceChallenge.frequencyTable.map(f => f.count))) * 100}%` }}
                                        >
                                          <span className="text-xs font-bold text-gray-900">{count}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-purple-300 mb-2">Common English:</div>
                                <div className="text-xs space-y-1 text-purple-100">
                                  <div><span className="font-bold text-green-300">Most common:</span> E, T, A, O, I, N</div>
                                  <div><span className="font-bold text-yellow-300">Common:</span> S, H, R, D, L, U</div>
                                  <div><span className="font-bold text-blue-300">Less common:</span> C, M, F, W, Y, P</div>
                                  <div className="mt-2 pt-2 border-t border-purple-600">
                                    <span className="font-bold text-pink-300">Tip:</span> Match high-frequency letters
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {practiceChallenge.cipher === 'nihilist' && (
                      <div className="mt-3 p-3 bg-purple-800/50 rounded-lg border border-purple-500/30">
                        <div className="text-sm font-bold text-purple-200 mb-2">🔑 Decryption Keys:</div>
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="text-purple-300">Keyword:</span>{' '}
                            <span className="font-mono text-yellow-300">{practiceChallenge.keyword}</span>
                          </div>
                          <div>
                            <span className="text-purple-300">Polybius Key:</span>{' '}
                            <span className="font-mono text-yellow-300">{practiceChallenge.polybiusKey}</span>
                          </div>
                          <div className="text-xs text-purple-300 mt-2">
                            💡 Build your Polybius square using this key!
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {practiceChallenge.cipher === 'caesar' && practiceChallenge.shift && (
                      <div className="mt-3 p-3 bg-purple-800/50 rounded-lg border border-purple-500/30">
                        <div className="text-sm font-bold text-purple-200 mb-2">🔑 Hint:</div>
                        <div className="text-sm">
                          <span className="text-purple-300">Shift Value:</span>{' '}
                          <span className="font-mono text-yellow-300">{practiceChallenge.shift}</span>
                        </div>
                      </div>
                    )}
                    
                    {(practiceChallenge.cipher === 'porta' || practiceChallenge.cipher === 'columnar' || practiceChallenge.cipher === 'checkerboard') && practiceChallenge.keyword && (
                      <div className="mt-3 p-3 bg-purple-800/50 rounded-lg border border-purple-500/30">
                        <div className="text-sm font-bold text-purple-200 mb-2">🔑 Keyword:</div>
                        <div className="text-sm">
                          <span className="font-mono text-yellow-300">{practiceChallenge.keyword}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your decrypted answer..."
                    className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 mb-4"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={checkAnswer}
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 py-3 rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition-all"
                    >
                      Check Answer
                    </button>
                    <button
                      onClick={generateChallenge}
                      className="bg-white/20 px-6 py-3 rounded-lg font-bold hover:bg-white/30 transition-all"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CipherOtto;
