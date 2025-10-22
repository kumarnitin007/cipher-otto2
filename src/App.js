import React, { useState, useEffect } from 'react';
import { Lock, Unlock, BookOpen, Users, Trophy, Plus, Heart, Coffee, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

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

// Cipher implementations
const cipherAlgorithms = {
  aristocrat: {
    name: 'Aristocrat Cipher',
    description: 'Monoalphabetic substitution preserving word spaces',
    key: 'ZEBRASCDFGHIJKLMNOPQTUVWXY',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1',
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
  nihilist: {
    name: 'Nihilist Cipher',
    description: 'Uses Polybius square with numerical key addition',
    requiresKeys: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_4',
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
  affine: {
    name: 'Affine Cipher',
    description: 'Uses mathematical formula: E(x) = (ax + b) mod 26',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_2',
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
  baconian: {
    name: 'Baconian Cipher',
    description: 'Encodes letters as sequences of A and B',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_3',
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
  const [selectedCipher, setSelectedCipher] = useState('aristocrat');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [nihilistKeyword, setNihilistKeyword] = useState('CRYPTO');
  const [nihilistPolybiusKey, setNihilistPolybiusKey] = useState('CRYPTO');
  const [practiceChallenge, setPracticeChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showFrequencyTable, setShowFrequencyTable] = useState(false);

  const VENMO_LINK = 'https://venmo.com/u/Nitin-Kumar-22';
  const PAYPAL_LINK = 'https://paypal.me/kumarnitin007';

  const generateChallenge = () => {
    const messages = ['HELLO WORLD', 'CRYPTOGRAPHY IS FUN', 'BREAK THE CODE', 'SECRET MESSAGE', 'LEARN TO ENCRYPT'];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const cipher = cipherAlgorithms[selectedCipher];
    
    let encrypted, challengeKeyword, challengePolybiusKey, frequencyTable;
    if (selectedCipher === 'nihilist') {
      challengeKeyword = 'SECRET';
      challengePolybiusKey = 'CRYPTO';
      encrypted = cipher.encrypt(randomMsg, challengeKeyword, challengePolybiusKey);
    } else {
      encrypted = cipher.encrypt(randomMsg);
      
      if (selectedCipher === 'aristocrat') {
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
      frequencyTable: frequencyTable
    });
    setUserAnswer('');
    setShowFrequencyTable(false);
  };

  const checkAnswer = () => {
    if (userAnswer.toUpperCase().replace(/\s/g, '') === practiceChallenge.original.replace(/\s/g, '')) {
      setScore(score + 10);
      alert('🎉 Correct! Otto is so proud! +10 points');
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
      } else {
        result = mode === 'encrypt' ? cipher.encrypt(inputText) : cipher.decrypt(inputText);
      }
      setOutputText(result);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
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
              <h2 className="text-xl font-bold mb-4">Select Cipher</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(cipherAlgorithms).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedCipher(key)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedCipher === key
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-bold">{cipherAlgorithms[key].name}</div>
                    <div className="text-sm mt-1 opacity-90">{cipherAlgorithms[key].description}</div>
                  </button>
                ))}
              </div>

              {cipherAlgorithms[selectedCipher].youtubeUrl && (
                <div className="mt-6 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-12 h-12 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">📺 Video Tutorial Available!</h3>
                      <p className="text-sm text-purple-200 mb-3">Watch Otto explain {cipherAlgorithms[selectedCipher].name}!</p>
                      <a href={cipherAlgorithms[selectedCipher].youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold transition-all">
                        🎬 Watch Tutorial
                      </a>
                    </div>
                  </div>
                </div>
              )}
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
                  <p className="mb-6 text-purple-200">Ready to test your cipher-cracking skills?</p>
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
                      Cipher: {cipherAlgorithms[practiceChallenge.cipher].name}
                    </div>
                    <div className="font-mono text-xl mb-3">{practiceChallenge.encrypted}</div>
                    
                    {practiceChallenge.cipher === 'aristocrat' && practiceChallenge.frequencyTable && (
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
                            <div className="grid grid-cols-2 gap-4">
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