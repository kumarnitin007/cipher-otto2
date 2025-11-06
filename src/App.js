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
   * Otto's Kid-Friendly Learning Notes for Each Cipher
   * These notes are designed to help kids understand the basics of each cipher in a fun, easy way
   */
  const getOttosNotes = (cipherKey) => {
    const ottosNotes = {
      caesar: `🦦 Hi! I'm Otto, and I'm here to help you learn the Caesar Cipher! 🎉

📚 What is it?
The Caesar Cipher is like a secret alphabet game! You take every letter and "shift" it forward by a certain number. For example, if you shift by 3, A becomes D, B becomes E, and so on!

🎮 How to Play:
1. Pick a number between 1-25 (that's your "shift")
2. Write your message
3. Move each letter forward by your shift number
4. Wrap around: After Z comes back to A!

💡 Otto's Tip:
Try encrypting your name with shift 3! "OTTO" becomes "RXXR" - that's my secret code name! 😄

🎯 Practice:
• Start with shift 3 (that's what Julius Caesar used!)
• Try: "HELLO" → "KHOOR" (shift 3)
• Try: "WORLD" → "ZRUOG" (shift 3)

Remember: To decrypt, just shift backwards by the same number! 🦦✨`,
      
      atbash: `🦦 Otter-ific! Let's learn the Atbash Cipher! 🎉

📚 What is it?
The Atbash Cipher is super simple - it's like looking in a mirror! A becomes Z, B becomes Y, C becomes X... you flip the whole alphabet backwards!

🎮 How to Play:
• A ↔ Z (first letter ↔ last letter)
• B ↔ Y
• C ↔ X
• And so on!

💡 Otto's Tip:
It's like a secret handshake with the alphabet! The alphabet does a complete backflip! 🔄

🎯 Practice:
• "PIZZA" → "KRAZZ" (try it!)
• "HELLO" → "SVOOL"
• "OTTO" → "L G G L" (that's me in Atbash!)

Fun Fact: This cipher is over 2000 years old! It's one of the oldest ciphers ever! 🦦✨`,
      
      aristocrat: `🦦 Detective time! Let's solve the Aristocrat Cipher! 🕵️‍♂️

📚 What is it?
The Aristocrat Cipher is like a word puzzle where each letter stands for a different letter. But here's the cool part - spaces stay in the same places! So you can still see where words begin and end!

🎮 How to Play:
• Every letter gets replaced with another letter
• Spaces stay in the same place
• It's like a secret code where A might become Z, B might become E, etc.

💡 Otto's Tip:
Look for common words! 
• "THE" is the most common word in English
• "AND" is super common too
• Short words like "A", "I", "TO" give you clues!

🎯 Practice Tips:
• Start by finding "THE" - it appears a lot!
• Look for patterns in short words
• Count how often each letter appears (frequency analysis)

Remember: Being a code detective takes practice, but you've got this! 🦦✨`,
      
      affine: `🦦 Math time! The Affine Cipher uses MATH to make codes! 🧮

📚 What is it?
The Affine Cipher uses a special formula: (a × letter + b) mod 26
Don't worry - I'll explain it simply!

🎮 How to Play:
• "a" is a multiplier (must be 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, or 25)
• "b" is a shift number (0-25)
• For each letter, we do some math!

💡 Otto's Tip:
Think of it like this:
• First, multiply the letter by "a"
• Then, add "b"
• Finally, wrap around if needed (that's the "mod 26" part)

🎯 Example:
If a=5 and b=8:
• A (0) → (5×0 + 8) mod 26 = 8 → I
• B (1) → (5×1 + 8) mod 26 = 13 → N

Fun Fact: The Caesar Cipher is actually a special case of Affine where a=1! 🦦✨`,
      
      nihilist: `🦦 Spy code alert! The Nihilist Cipher is what Russian spies used! 🔢

📚 What is it?
The Nihilist Cipher uses a grid (like a secret map!) and then adds numbers together. It's like a math puzzle with letters!

🎮 How to Play:
1. Make a 5×5 grid with letters (called a Polybius Square)
2. Find each letter's position in the grid (like row 2, column 3)
3. Turn that into a number (like 23)
4. Add numbers from a keyword to make it secret!

💡 Otto's Tip:
Think of it like coordinates on a map! The grid has rows (1-5) and columns (1-5). Each letter lives at a specific spot!

🎯 Practice:
• Make a grid with keyword "CRYPTO"
• Find letter "H" in your grid
• If it's at row 2, column 3, that's 23
• Add your keyword's number to it!

This was used by Russian revolutionaries in the 1880s! Super spy stuff! 🦦✨`,
      
      checkerboard: `🦦 Cold War secrets! The Straddling Checkerboard is REAL spy code! 🌐

📚 What is it?
This cipher creates a special board where some letters get one digit, and others get two digits. It's like a secret number system!

🎮 How to Play:
• Create a board with some blank spots
• Letters in regular spots = one digit (like 0, 1, 3, 4, 5, 7, 8, 9)
• Letters in blank column spots = two digits (like 20, 21, 60, 61)

💡 Otto's Tip:
The "blank" columns make it tricky! Some letters need one number, others need two numbers. It's like a secret code where the length itself is a clue!

🎯 Practice:
• Start with blank positions at columns 2 and 6
• Fill the regular spots first
• Then use the blank columns for the rest

Fun Fact: Soviet spies used this during the Cold War! It's a real spy technique! 🦦✨`,
      
      columnar: `🦦 Shuffle time! The Columnar Cipher rearranges your message! 📋

📚 What is it?
The Columnar Cipher writes your message in rows, then reads it in a different order based on a keyword. It's like shuffling a deck of cards!

🎮 How to Play:
1. Write your message in rows (like a table)
2. Use a keyword to decide the order of columns
3. Read the columns in that special order!

💡 Otto's Tip:
Think of it like this: You write your message normally in rows, but then you read it by columns in a scrambled order based on your keyword!

🎯 Example:
Message: "HELLO WORLD" with keyword "KEY"
• Write in rows: H E L / L O  / W O R / L D
• Rearrange columns based on "KEY"
• Read in new order!

It's like magic - the letters dance around! 🦦✨`,
      
      baconian: `🦦 Binary from the 1600s! The Baconian Cipher uses only A and B! 🥓

📚 What is it?
Francis Bacon invented a way to hide messages using only the letters A and B! Each letter of the alphabet gets a special 5-letter code made of A's and B's!

🎮 How to Play:
• A = AAAAA
• B = AAAAB
• C = AAABA
• D = AAABB
• And so on!

💡 Otto's Tip:
It's like binary code, but with letters! Each real letter becomes 5 A's or B's. It's like a secret language where only A and B exist!

🎯 Practice:
• "HELLO" becomes: AABAA AABAB ABABA ABABA ABBAB
• Try to decode: AAAAA AABAA AAABA AAABA ABBAB (hint: it spells "APPLE")

Fun Fact: This was invented in 1605! Way before computers had binary! 🦦✨`,
      
      porta: `🦦 Renaissance magic! The Porta Cipher uses 13 alphabets! 🎭

📚 What is it?
The Porta Cipher was created in 1563 by Giovanni Battista della Porta. It uses 13 different alphabets, and the coolest part? It's self-reciprocal - encryption and decryption work the same way!

🎮 How to Play:
• Use a keyword to pick which alphabet to use
• Each letter pair (like AB, CD, EF) has its own special alphabet
• Find your keyword letter's pair, then use that alphabet!

💡 Otto's Tip:
It's like having 13 different secret languages! Your keyword letter tells you which language to use. And the magic part? To decrypt, you just encrypt again with the same keyword!

🎯 Practice:
• Start with keyword "KEY"
• Letter K is in pair KL, which has its own alphabet
• Use that alphabet to encrypt your message!

This cipher is over 450 years old! 🦦✨`,
      
      patristocrat: `🦦 No spaces challenge! The Patristocrat Cipher removes all spaces! 🔤

📚 What is it?
The Patristocrat Cipher is just like the Aristocrat Cipher, but harder! Why? Because it removes ALL spaces between words. So you can't tell where one word ends and another begins!

🎮 How to Play:
• Each letter gets replaced with another letter
• BUT all spaces are removed
• So "HELLO WORLD" becomes "HELLOWORLD" then gets encrypted

💡 Otto's Tip:
This makes it much harder to crack! Without spaces, you can't see word boundaries. It's like reading a sentence without any punctuation - tricky!

🎯 Practice:
• Start with a simple message
• Remove all spaces
• Then apply letter substitution
• Try to decrypt without spaces - it's a challenge!

Remember: This is the same as Aristocrat but without word breaks! 🦦✨`,
      
      cryptarithm: `🦦 Math puzzle time! Cryptarithms are like word math! 🧩

📚 What is it?
A Cryptarithm is a puzzle where letters stand for digits. Each letter must be a different digit, and the math must work out correctly!

🎮 How to Play:
• Each letter = one unique digit (0-9)
• The equation must be mathematically correct
• No letter can be the same digit as another letter
• Numbers can't start with 0

💡 Otto's Tip:
Start with the most important letters! Look at the result column - those letters are key! Also, if a number has 4 digits and another has 5, the result tells you about the first digit!

🎯 Famous Example:
SEND + MORE = MONEY
• S=9, E=5, N=6, D=7
• M=1, O=0, R=8, Y=2
• 9567 + 1085 = 10652 ✓

Try solving it yourself! It's like a detective story with numbers! 🦦✨`,
      
      fractionatedMorse: `🦦 Morse code + substitution = AWESOME! 📡

📚 What is it?
Fractionated Morse combines Morse code with keyword substitution! First, your message becomes Morse code (dots and dashes), then it gets grouped into triplets, and finally those triplets become letters!

🎮 How to Play:
1. Convert your message to Morse code (. - x)
2. Group the Morse into triplets (like ... or ..- or .x.)
3. Use a keyword table to convert triplets to letters

💡 Otto's Tip:
Think of it in three steps:
• Step 1: Text → Morse code (dots and dashes)
• Step 2: Morse → Triplets (groups of 3)
• Step 3: Triplets → Letters (using keyword table)

🎯 Practice:
• Start with "HELLO"
• Convert to Morse: .... . .-.. .-.. ---
• Add separators (x): ....x .x .-..x .-..x ---x
• Group into triplets
• Convert to letters using your keyword!

This is a favorite in cryptography competitions! 🦦✨`,
      
      xenocrypt: `🦦 ¡Hola! Let's learn Xenocrypt - the Spanish cipher! 🇪🇸

📚 What is it?
Xenocrypt is like the Aristocrat Cipher, but for Spanish! It uses the special Spanish alphabet with 27 letters (A-Z plus Ñ!). It's perfect for Spanish text!

🎮 How to Play:
• Works exactly like Aristocrat cipher
• BUT uses the Spanish alphabet: A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z
• Accented letters (Á, É, Í, Ó, Ú) get converted to regular letters

💡 Otto's Tip:
The Spanish alphabet has Ñ! That's letter number 15. So when you're encrypting Spanish text, make sure to include Ñ in your substitution key!

🎯 Practice:
• Try encrypting "HOLA MUNDO" (Hello World in Spanish)
• Remember: Ñ is a special letter!
• Accented letters become regular letters (Á→A, É→E)

Fun Fact: This is popular in cryptography competitions! 🦦✨`,
      
      railfence: `🦦 All aboard! The Rail Fence Cipher zigzags like a train! 🚂

📚 What is it?
The Rail Fence Cipher writes your message in a zigzag pattern across multiple "rails" (rows), then reads it horizontally. It's like writing on train tracks!

🎮 How to Play:
1. Pick a number of rails (2-10)
2. Write your message in a zigzag pattern
3. When you hit the top or bottom rail, bounce back!
4. Read the message horizontally from all rails

💡 Otto's Tip:
Think of it like this: You write your message going down the rails, bouncing back and forth like a pinball! Then you read it straight across.

🎯 Example with 3 rails:
HELLO WORLD becomes:
H . . . O . . . R . . . (top rail)
. E . L . W . L . D . . (middle rail)
. . L . . . O . . . . . (bottom rail)
Read: HOR + EWL D + L O = HOREWL DLO

Try it with different numbers of rails! 🦦✨`,
      
      pollux: `🦦 Morse to numbers! Pollux transforms Morse code into digits! 🔢

📚 What is it?
Pollux converts your message to Morse code first (dots and dashes), then each dot and dash gets replaced with a digit. It's like a secret number language!

🎮 How to Play:
1. Convert text to Morse code (. and -)
2. Replace each . and - with a digit
3. Default: . = 5, - = 8
4. Add separators (x) between letters

💡 Otto's Tip:
The mapping is simple:
• Dot (.) becomes a digit
• Dash (-) becomes a different digit
• Separator (x) becomes a space

🎯 Practice:
• "HELLO" → Morse: .... . .-.. .-.. ---
• With mapping . = 5, - = 8
• Becomes: 5555 5 58 55 55 888

Try decoding those numbers back! 🦦✨`,
      
      morbit: `🦦 Double digits! Morbit is like Pollux but with pairs! 🔢

📚 What is it?
Morbit is similar to Pollux, but it groups the Morse code symbols into pairs of digits. So instead of single digits, you get pairs like 11, 22, 33!

🎮 How to Play:
1. Convert text to Morse code
2. Replace . with one digit (like 1)
3. Replace - with another digit (like 2)
4. Replace x with a third digit (like 3)
5. Group everything into pairs

💡 Otto's Tip:
It's like Pollux, but with extra steps! The pairs make it a bit more complex. Default mapping: . = 1, - = 2, x = 3

🎯 Practice:
• "HELLO" → Morse: ....x .x .-..x .-..x ---x
• With mapping . = 1, - = 2, x = 3
• Becomes: 1111 3 1 3 12 11 3 12 11 3 222 3
• Group into pairs: 11 11 31 31 21 13 12 11 32 22 3

You've got this! 🦦✨`,
      
      vigenere: `🦦 Keyword power! Vigenère is like Caesar but WAY stronger! 🔑

📚 What is it?
The Vigenère Cipher uses a keyword to create multiple Caesar ciphers! Each letter of your keyword tells you how much to shift. It's like having different shift amounts for each letter!

🎮 How to Play:
1. Pick a keyword (like "KEY")
2. Write your message
3. For each letter, use the corresponding keyword letter to determine the shift
4. Apply a Caesar shift based on that keyword letter

💡 Otto's Tip:
The keyword repeats! If your keyword is "KEY" and your message is "HELLO", you use:
• H with K (shift 10)
• E with E (shift 4)
• L with Y (shift 24)
• L with K (shift 10) - keyword repeats!
• O with E (shift 4)

🎯 Example:
Message: "HELLO" with keyword "KEY"
• H + K = R (shift 10)
• E + E = I (shift 4)
• L + Y = J (shift 24)
• L + K = V (shift 10)
• O + E = S (shift 4)
Result: "RIJVS"

Much stronger than Caesar! 🦦✨`,
      
      rsa: `🦦 Prime number magic! RSA uses math to keep secrets safe! 🔐

📚 What is it?
RSA is a public-key cipher that uses prime numbers! You have two keys - one public (for encrypting) and one private (for decrypting). This is simplified for learning!

🎮 How to Play:
• Public key: (n, e) - anyone can use this to encrypt
• Private key: (n, d) - only you can use this to decrypt
• Encryption: letter^e mod n
• Decryption: number^d mod n

💡 Otto's Tip:
Think of it like this:
• Public key = a lock (anyone can lock something)
• Private key = the key (only you can unlock)
• Real RSA uses HUGE prime numbers (hundreds of digits!)
• This version is simplified for learning

🎯 Practice:
• Convert letter to number (A=1, B=2, etc.)
• Raise to power e, then mod n
• To decrypt, raise to power d, then mod n

Fun Fact: Real RSA keeps the internet safe! This is a simplified version for learning! 🦦✨`,
      
      aristocratMisspelled: `🦦 Extra tricky! Aristocrat Misspelled adds intentional mistakes! 🔤

📚 What is it?
This is like the regular Aristocrat Cipher, but with intentional misspellings! Common words get spelled wrong on purpose to make frequency analysis harder!

🎮 How to Play:
• Works like Aristocrat cipher
• BUT first, some words get misspelled:
  • "THE" → "TEH"
  • "AND" → "NAD"
  • "YOU" → "YUO"
• Then you apply letter substitution

💡 Otto's Tip:
The misspellings make it harder! Without correct spelling, it's tougher to find common words like "THE" and "AND". It's like a code with extra puzzles!

🎯 Practice:
• Start with a message
• Apply common misspellings
• Then encrypt with letter substitution
• To decrypt, reverse both steps!

Remember: Fix the misspellings after decrypting! 🦦✨`,
      
      dancingMen: `🦦 Sherlock Holmes cipher! Dancing Men are secret stick figures! 💃

📚 What is it?
The Dancing Men Cipher represents each letter as a stick figure in a different pose! It was made famous in "The Adventure of the Dancing Men" by Arthur Conan Doyle!

🎮 How to Play:
• Each letter = a different stick figure pose
• Write your message using the dancing men figures
• To decrypt, match the figures back to letters

💡 Otto's Tip:
It's like emoji code from the 1800s! Each dancing man has a unique pose that stands for a letter. Some might be waving, some might be standing, some might be dancing!

🎯 Practice:
• A might be 🕺 (waving)
• B might be 💃 (dancing)
• C might be 👯 (hands up)
• And so on!

Fun Fact: Sherlock Holmes solved this in the story! 🦦✨`,
      
      hill2x2: `🦦 Matrix magic! Hill 2x2 uses math matrices! 📐

📚 What is it?
The Hill Cipher uses matrix multiplication to encrypt pairs of letters! It's like math meets cryptography! You need a 2×2 matrix (a grid with 4 numbers).

🎮 How to Play:
1. Pick a 2×2 matrix (like [[3,3],[2,5]])
2. Take letters in pairs
3. Convert letters to numbers (A=0, B=1, etc.)
4. Multiply by the matrix
5. Convert back to letters!

💡 Otto's Tip:
Think of it like this:
• Letters become numbers
• Numbers get multiplied by a matrix
• The result becomes new numbers
• New numbers become new letters!

🎯 Example:
Pair "HE" (H=7, E=4)
• Matrix [[3,3],[2,5]] × [7,4]
• = [3×7 + 3×4, 2×7 + 5×4]
• = [33, 34] mod 26 = [7, 8] = HI

Math is cool! 🦦✨`,
      
      hill3x3: `🦦 Bigger matrices = bigger security! Hill 3x3 is even stronger! 📐

📚 What is it?
Hill 3x3 is like Hill 2x2, but bigger! Instead of encrypting pairs of letters, it encrypts triplets (groups of 3 letters) using a 3×3 matrix!

🎮 How to Play:
1. Pick a 3×3 matrix (9 numbers in a grid)
2. Take letters in groups of 3
3. Convert to numbers
4. Multiply by the 3×3 matrix
5. Convert back to letters!

💡 Otto's Tip:
It's the same idea as 2x2, but with triplets! The matrix is bigger (3×3 instead of 2×2), so you process 3 letters at once instead of 2!

🎯 Example:
Triplet "HEL" (H=7, E=4, L=11)
• Use 3×3 matrix
• Multiply all three numbers together
• Get three new numbers
• Convert to three new letters!

More math = more security! 🦦✨`
    };
    
    return ottosNotes[cipherKey] || `🦦 Hi there! I'm still learning about this cipher myself! But I'm working hard to create awesome notes for you. Check back soon! 🦦✨`;
  };
  
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
                      <div className="w-full p-4 rounded-lg bg-white/10 border-2 border-white/20 text-white whitespace-pre-wrap leading-relaxed min-h-[200px] max-h-[400px] overflow-y-auto">
                        {getOttosNotes(selectedCipher)}
                      </div>
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
