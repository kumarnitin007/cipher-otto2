import React from 'react';
import { Coffee, DollarSign } from 'lucide-react';
import AnimatedOtter from './AnimatedOtter';

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

export default DonateModal;

