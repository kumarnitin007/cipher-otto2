import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Unlock, BookOpen, Trophy, Heart, Coffee, DollarSign, ChevronDown, ChevronUp, Info, Copy, Check, Sparkles, Star, History, BarChart3, Search, Share2, Bookmark, X, Zap, RotateCcw } from 'lucide-react';

// Import modular components and utilities
import AnimatedOtter from './components/AnimatedOtter';
import DonateModal from './components/DonateModal';
import CipherSelector from './components/CipherSelector';
import { cipherAlgorithms } from './ciphers';
import { categories, getDifficultyColor, getDifficultyBadge } from './utils/helpers';

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
  const [showNotes, setShowNotes] = useState(false); // Expert & Otto's Notes panel expanded state
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

            <div className="bg-gradient-to-br from-green-900/40 to-teal-900/40 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-green-500/30">
              <button 
                onClick={() => setShowNotes(!showNotes)} 
                className="w-full flex items-center justify-between text-left"
              >
                  <div className="flex items-center gap-2">
                  <div className="text-2xl">👩‍🎓🦦</div>
                  <h3 className="text-lg font-bold text-green-100">Learn {cipherAlgorithms[selectedCipher].name} with Expert's & Otto's Notes</h3>
                </div>
                {showNotes ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showNotes && (
                <div className="mt-4">
                  <div className="bg-green-500/20 border-2 border-green-400/40 rounded-lg p-6 mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">🦦</div>
                      <div className="flex-1">
                        <p className="text-green-50 font-medium text-base leading-relaxed">
                          {(() => {
                            const placeholderMessages = {
                              caesar: "🎭 Hey there, future code-breaker! Our expert cryptographers and Otto are busy crafting super cool notes about Caesar Cipher! They're making sure you'll learn how Julius Caesar protected his messages 2000 years ago - and how you can do it too! Check back soon! 🚀",
                              atbash: "🔄 Whoa! The alphabet is doing backflips! Our experts and Otto are preparing amazing notes that will show you how to flip letters from A→Z and B→Y. It's like a secret code mirror! Stay tuned for some awesome learning! ✨",
                              aristocrat: "🕵️ Detective mode activated! Our experts and Otto are writing super helpful notes about the Aristocrat Cipher. They'll teach you how to be a code detective just like Sherlock Holmes! Look for patterns, find THE and AND - it's going to be epic! 🎯",
                              affine: "🧮 Math + Secret Codes = AWESOME! Our experts and Otto are creating mind-blowing notes about the Affine Cipher. They're breaking down the formula so it's easy-peasy to understand. Get ready to see how math can create super secure codes! 📊",
                              nihilist: "🔢 Russian spies used this! Our experts and Otto are preparing exciting notes about the Nihilist Cipher. They'll show you how numbers can hide messages using a special grid system. It's like a secret spy code! 🕵️‍♂️",
                              checkerboard: "🌐 Cold War secrets incoming! Our experts and Otto are crafting fascinating notes about the Straddling Checkerboard. They'll explain how real spies used this during the Cold War! Get ready to learn some serious spy techniques! 🎖️",
                              columnar: "📋 Time to shuffle! Our experts and Otto are writing great notes about Columnar Transposition. They'll show you how to rearrange letters using a keyword - like solving a word puzzle! It's going to be fun! 🎨",
                              baconian: "🥓 Baconian Cipher - it's not about food! Our experts and Otto are preparing awesome notes that will show you how Francis Bacon used only A's and B's to create secret codes. It's like binary code from the 1600s! Cool, right? 🤖",
                              porta: "🎭 Renaissance secrets! Our experts and Otto are crafting amazing notes about the Porta Cipher. They'll teach you how Giovanni Battista della Porta created this self-reciprocal cipher using 13 alphabets! It's magical! ✨",
                              patristocrat: "🔤 No spaces allowed! Our experts and Otto are writing helpful notes about the Patristocrat Cipher. They'll show you how removing spaces makes codes harder to crack - like a word puzzle without breaks! Challenge accepted! 💪",
                              cryptarithm: "🧩 Math puzzles are the best! Our experts and Otto are creating super fun notes about Cryptarithms. They'll teach you how to solve SEND + MORE = MONEY and other cool math puzzles! Get your thinking cap ready! 🎓",
                              fractionatedMorse: "📡 Morse code meets substitution! Our experts and Otto are preparing exciting notes about Fractionated Morse. They'll show you how to combine Morse code with keyword substitution - it's a favorite in crypto competitions! 🏆",
                              xenocrypt: "🇪🇸 ¡Hola! Our experts and Otto are writing awesome notes about Xenocrypt - the Spanish cipher! They'll teach you how to encrypt Spanish text using the special 27-letter alphabet (including Ñ!). It's going to be muy divertido! 🌟",
                              railfence: "🚂 Choo choo! Time to ride the rails! Our experts and Otto are crafting fun notes about the Rail Fence Cipher. They'll show you how text zigzags like a train track across multiple rails! All aboard the cipher train! 🎢",
                              pollux: "🔢 Numbers everywhere! Our experts and Otto are preparing cool notes about Pollux. They'll teach you how Morse code transforms into digits - like a secret number language! Get ready to decode the numbers! 🔐",
                              morbit: "🔢 Double the numbers, double the fun! Our experts and Otto are writing great notes about Morbit. They'll show you how Morse code becomes digit pairs - it's like Pollux but with extra complexity! You've got this! 💪",
                              vigenere: "🔑 Keyword power! Our experts and Otto are crafting amazing notes about the Vigenère Cipher. They'll explain how using a keyword makes codes much stronger than Caesar! Multiple shifts = super security! 🛡️",
                              rsa: "🔐 Prime number magic! Our experts and Otto are preparing fascinating notes about RSA. They'll break down how prime numbers create super secure codes (this is simplified for learning - real RSA uses HUGE primes!). Math is awesome! 🧮",
                              aristocratMisspelled: "🔤 Misspellings make it tricky! Our experts and Otto are writing helpful notes about the Aristocrat Misspelled Cipher. They'll show you how intentional misspellings make frequency analysis harder - it's like a code with extra challenges! 🎯",
                              dancingMen: "💃 Sherlock Holmes would be proud! Our experts and Otto are crafting fun notes about the Dancing Men Cipher. They'll teach you how stick figures in different poses can hide secret messages! It's like emoji code from the 1800s! 🕺",
                              hill2x2: "🔢 Matrix multiplication magic! Our experts and Otto are preparing awesome notes about Hill 2x2 Cipher. They'll break down how math matrices can encrypt pairs of letters - it's like math meets cryptography! 📐",
                              hill3x3: "🔢 Bigger matrices, bigger security! Our experts and Otto are writing exciting notes about Hill 3x3 Cipher. They'll explain how triple the matrix size means triple the security! It's like Hill 2x2 but on steroids! 🚀"
                            };
                            return placeholderMessages[selectedCipher] || "🎉 Our experts and Otto are working hard to create amazing notes that will help you learn this cipher faster! They're making sure everything is fun, easy to understand, and super helpful. Check back soon for awesome learning tips! 🦦✨";
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Expert's Notes Section */}
                  <div className="mb-4 bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-lg p-5 shadow-lg border border-pink-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">👩‍🎓</div>
                      <h4 className="text-lg font-bold text-pink-100">Expert's Notes</h4>
                    </div>
                    <div className="bg-pink-900/20 rounded-lg p-4 border border-pink-500/20">
                      <textarea 
                        className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 resize-none focus:outline-none focus:border-pink-400 min-h-[150px]"
                        placeholder="Add expert notes here... (Coming soon - Our expert is preparing detailed learning materials!)"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Otto's Notes Section */}
                  <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-lg p-5 shadow-lg border border-cyan-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">🦦</div>
                      <h4 className="text-lg font-bold text-cyan-100">Otto's Notes</h4>
                    </div>
                    <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/20">
                      <textarea 
                        className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 resize-none focus:outline-none focus:border-cyan-400 min-h-[150px]"
                        placeholder="Add Otto's notes here... (Coming soon - Otto is preparing fun learning tips!)"
                        readOnly
                      />
                    </div>
                  </div>
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
                      const validation = cipherAlgorithms['cryptarithm'].validateEquation(equationToValidate, mappingObj);
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
                              const parsed = cipherAlgorithms['cryptarithm'].parseEquation(equationToShow);
                              const mappingObj = {};
                              cryptarithmMapping.split(',').forEach(pair => {
                                const [letter, digit] = pair.split('=').map(s => s.trim());
                                if (letter && digit) mappingObj[letter.toUpperCase()] = digit;
                              });
                              const words = parsed.parts.map(p => p.value);
                              const numbers = words.map(w => cipherAlgorithms['cryptarithm'].wordToNumber(w, mappingObj));
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
                      
                      return availableCiphers.map(key => {
                        const isDivisionC = divisionCCiphers.includes(key);
                        return (
                          <button 
                            key={key} 
                            onClick={() => setSelectedCipher(key)} 
                            className={`p-3 rounded-lg text-sm transition-all transform hover:scale-105 ${
                              selectedCipher === key 
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold shadow-lg' 
                                : isDivisionC 
                                  ? 'bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/50' 
                                  : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span>{cipherAlgorithms[key].name}</span>
                              <span>{getDifficultyBadge(cipherAlgorithms[key].difficulty)}</span>
                            </div>
                          </button>
                        );
                      });
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

export default CipherOtto;
