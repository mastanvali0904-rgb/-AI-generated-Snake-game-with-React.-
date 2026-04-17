import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "Cyber Runner",
    artist: "AI Synth-01",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#ff00ff"
  },
  {
    id: 2,
    title: "Neon Pulse",
    artist: "AI Synth-02",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#00ffff"
  },
  {
    id: 3,
    title: "Glitch Dreams",
    artist: "AI Synth-03",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#39ff14"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="glass p-6 rounded-2xl w-full max-w-md mx-auto relative overflow-hidden">
      {/* Background Decorative Glow */}
      <motion.div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-30"
        animate={{ backgroundColor: currentTrack.color }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 overflow-hidden relative">
             <motion.div 
               animate={{ rotate: isPlaying ? 360 : 0 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             >
               <Music className="w-8 h-8 text-white/50" />
             </motion.div>
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h3 className="font-bold text-lg tracking-tight uppercase tracking-widest" style={{ color: currentTrack.color }}>
                  {currentTrack.title}
                </h3>
                <p className="text-white/40 text-sm font-mono uppercase italic">{currentTrack.artist}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-1 rounded-full mb-6 overflow-hidden">
          <motion.div 
            className="h-full"
            style={{ backgroundColor: currentTrack.color }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button onClick={handlePrev} className="p-2 hover:bg-white/10 rounded-full transition-colors order-1">
            <SkipBack className="w-6 h-6" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all order-2"
            style={{ 
              backgroundColor: currentTrack.color,
              boxShadow: `0 0 20px ${currentTrack.color}66`
            }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-black fill-black" />
            ) : (
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            )}
          </button>

          <button onClick={handleNext} className="p-2 hover:bg-white/10 rounded-full transition-colors order-3">
            <SkipForward className="w-6 h-6" />
          </button>

          <div className="order-4 opacity-50">
            <Volume2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
}
