import React from 'react';
import { Sparkles } from 'lucide-react';
import { cipherAlgorithms } from '../ciphers';
import { getDifficultyColor, getDifficultyBadge } from '../utils/helpers';

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
        {availableCiphers.map(key => {
          const isDivisionC = divisionCCiphers.includes(key);
          return (
            <button 
              key={key} 
              onClick={() => onSelect(key)} 
              className={`p-4 rounded-xl text-sm transition-all transform hover:scale-105 ${
                selectedCipher === key 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold shadow-lg scale-105' 
                  : isDivisionC 
                    ? 'bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/50' 
                    : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-center">{cipherAlgorithms[key].name}</span>
                <span className={`${selectedCipher === key ? 'text-gray-900' : getDifficultyColor(cipherAlgorithms[key].difficulty)}`}>
                  {getDifficultyBadge(cipherAlgorithms[key].difficulty)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CipherSelector;

