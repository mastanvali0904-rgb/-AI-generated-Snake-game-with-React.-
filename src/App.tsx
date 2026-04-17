/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Gamepad2, Volume2, Cpu } from 'lucide-react';

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 lg:p-12 overflow-hidden bg-[#020202]">
      {/* Background Animated Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-neon-cyan/5 rounded-full blur-[120px]" 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-1/4 -right-1/4 w-[80vw] h-[80vw] bg-neon-pink/5 rounded-full blur-[120px]" 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Scanning Line */}
        <motion.div 
          className="absolute inset-x-0 h-[2px] bg-neon-cyan/10 blur-[1px] z-0"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left/Top Decor & Stats */}
        <div className="lg:col-span-3 flex flex-col gap-6 w-full lg:sticky lg:top-12">
          <div className="glass p-6 rounded-2xl flex flex-col gap-4 border-l-4 border-l-neon-cyan">
            <div className="flex items-center gap-3 text-neon-cyan">
              <Terminal className="w-5 h-5" />
              <h2 className="font-mono text-sm tracking-widest font-bold uppercase">System_Status</h2>
            </div>
            <div className="space-y-3 font-mono text-[11px] text-white/40">
              <div className="flex justify-between">
                <span>LOCAL_TIME</span>
                <span className="text-white/60">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>CORES_ACTIVE</span>
                <span className="text-neon-lime">12/12</span>
              </div>
              <div className="flex justify-between">
                <span>UI_MODE</span>
                <span className="text-white/60 font-bold">NEON_V2</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex glass p-4 rounded-xl flex-col gap-2 opacity-50">
             <div className="flex items-center gap-2 text-white/50 mb-2">
               <Cpu className="w-4 h-4" />
               <h3 className="text-[10px] uppercase tracking-widest">Hardware Info</h3>
             </div>
             <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
               <motion.div className="bg-neon-cyan h-full w-3/4" animate={{ width: ['70%', '80%', '70%'] }} transition={{ duration: 2, repeat: Infinity }} />
             </div>
             <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
               <motion.div className="bg-neon-pink h-full w-1/2" animate={{ width: ['40%', '60%', '40%'] }} transition={{ duration: 3, repeat: Infinity }} />
             </div>
          </div>
        </div>

        {/* Center - Game Window */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-6 w-full flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2 mb-2 lg:mb-4 px-2">
            <div className="flex items-center gap-2 text-neon-cyan/50 italic mb-1">
               <Gamepad2 className="w-4 h-4" />
               <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Peripheral Connected</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase italic leading-none">
              Neon <span className="text-neon-cyan neon-glow-cyan">Snake</span>
            </h1>
          </div>

          <SnakeGame />
        </motion.div>

        {/* Right - Music Controls */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 w-full flex flex-col gap-6 lg:sticky lg:top-12"
        >
           <div className="flex items-center gap-3 text-neon-pink px-2">
              <Volume2 className="w-5 h-5" />
              <h2 className="font-mono text-sm tracking-widest font-bold uppercase">Audio_Stream</h2>
            </div>
          <MusicPlayer />

          <div className="glass p-6 rounded-2xl border-r-4 border-r-neon-pink">
            <p className="text-[10px] font-mono text-white/30 uppercase leading-relaxed tracking-wider">
              Experience the fusion of classic arcade survival and futuristic synthetic soundscapes. 
              Avoid system failure. Collect data fragments. Turn up the bass.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer / Info */}
      <footer className="mt-12 opacity-20 hover:opacity-100 transition-opacity font-mono text-[9px] uppercase tracking-[0.5em] flex gap-8 mb-4">
        <span>&copy; 2026 Neon Logic Systems</span>
        <span className="text-neon-cyan">Vortex Engine Enabled</span>
        <span className="text-neon-pink">Audio Sync v1.02</span>
      </footer>
    </div>
  );
}

