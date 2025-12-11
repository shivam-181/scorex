'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Share2, RotateCcw, Search, User, X, Swords, Copy, Check, Twitter, Send } from 'lucide-react'; // Added icons

// Expanded Player Data
const INITIAL_PLAYERS = [
  // Forwards
  { id: 'fw1', name: 'Lionel Messi', position: 'FW', rating: 94, image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg' },
  { id: 'fw2', name: 'Erling Haaland', position: 'FW', rating: 93, image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Erling_Haaland_2023_%28cropped%29.jpg' },
  { id: 'fw3', name: 'Kylian Mbappé', position: 'FW', rating: 92, image: 'https://upload.wikimedia.org/wikipedia/commons/5/57/20180715_FIFA_World_Cup_Final_France_vs_Croatia_Kylian_Mbapp%C3%A9.jpg' },
  { id: 'fw4', name: 'Cristiano Ronaldo', position: 'FW', rating: 92, image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg' },
  { id: 'fw5', name: 'Harry Kane', position: 'FW', rating: 91, image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Harry_Kane_2018.jpg' },
  { id: 'fw6', name: 'Vinícius Jr', position: 'FW', rating: 90, image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Vinicius_Jr_2021.jpg' },
  { id: 'fw7', name: 'Mohamed Salah', position: 'FW', rating: 89, image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Mohamed_Salah_2018.jpg' },
  { id: 'fw8', name: 'Robert Lewandowski', position: 'FW', rating: 89, image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Robert_Lewandowski_2018.jpg' },
  { id: 'fw9', name: 'Neymar Jr', position: 'FW', rating: 88, image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._2018.jpg' },
  { id: 'fw10', name: 'Heung-min Son', position: 'FW', rating: 87, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Son_Heung-min_2019.jpg/800px-Son_Heung-min_2019.jpg' },
  { id: 'fw11', name: 'Bukayo Saka', position: 'FW', rating: 86, image: '' },
  { id: 'fw12', name: 'Antoine Griezmann', position: 'FW', rating: 86, image: '' },
  { id: 'fw13', name: 'Victor Osimhen', position: 'FW', rating: 88, image: '' },
  { id: 'fw14', name: 'Lautaro Martínez', position: 'FW', rating: 87, image: '' },
  { id: 'fw15', name: 'Rafael Leão', position: 'FW', rating: 86, image: '' },
  { id: 'fw16', name: 'Rodrygo', position: 'FW', rating: 85, image: '' },
  { id: 'fw17', name: 'Julián Álvarez', position: 'FW', rating: 85, image: '' },
  { id: 'fw18', name: 'Jack Grealish', position: 'FW', rating: 85, image: '' },
  { id: 'fw19', name: 'Phil Foden', position: 'FW', rating: 85, image: '' },
  { id: 'fw20', name: 'Ousmane Dembélé', position: 'FW', rating: 84, image: '' },
  
  // Midfielders
  { id: 'mf1', name: 'Kevin De Bruyne', position: 'MF', rating: 91, image: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Kevin_De_Bruyne_201807061.jpg' },
  { id: 'mf2', name: 'Rodri', position: 'MF', rating: 90, image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Rodri_2023.jpg' },
  { id: 'mf3', name: 'Jude Bellingham', position: 'MF', rating: 90, image: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Jude_Bellingham_2023.jpg' },
  { id: 'mf4', name: 'Luka Modrić', position: 'MF', rating: 88, image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Luka_Modric_2018.jpg' },
  { id: 'mf5', name: 'Bernardo Silva', position: 'MF', rating: 88, image: '' },
  { id: 'mf6', name: 'Federico Valverde', position: 'MF', rating: 87, image: '' },
  { id: 'mf7', name: 'Bruno Fernandes', position: 'MF', rating: 87, image: '' },
  { id: 'mf8', name: 'Martin Ødegaard', position: 'MF', rating: 86, image: '' },
  { id: 'mf9', name: 'Frenkie de Jong', position: 'MF', rating: 86, image: '' },
  { id: 'mf10', name: 'Pedri', position: 'MF', rating: 85, image: '' },
  { id: 'mf11', name: 'Declan Rice', position: 'MF', rating: 85, image: '' },
  { id: 'mf12', name: 'Toni Kroos', position: 'MF', rating: 88, image: '' },
  { id: 'mf13', name: 'Gavi', position: 'MF', rating: 83, image: '' },
  { id: 'mf14', name: 'Jamal Musiala', position: 'MF', rating: 86, image: '' },
  { id: 'mf15', name: 'Lucas Paquetá', position: 'MF', rating: 84, image: '' },
  { id: 'mf16', name: 'Bruno Guimarães', position: 'MF', rating: 84, image: '' },
  { id: 'mf17', name: 'Joshua Kimmich', position: 'MF', rating: 88, image: '' },
  { id: 'mf18', name: 'İlkay Gündoğan', position: 'MF', rating: 87, image: '' },
  { id: 'mf19', name: 'Aurélien Tchouaméni', position: 'MF', rating: 84, image: '' },
  { id: 'mf20', name: 'Eduardo Camavinga', position: 'MF', rating: 83, image: '' },

  // Defenders
  { id: 'df1', name: 'Virgil van Dijk', position: 'DF', rating: 89, image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Virgil_van_Dijk_2023.jpg' },
  { id: 'df2', name: 'Rúben Dias', position: 'DF', rating: 88, image: '' },
  { id: 'df3', name: 'Trent Alexander-Arnold', position: 'DF', rating: 87, image: '' },
  { id: 'df4', name: 'Alphonso Davies', position: 'DF', rating: 86, image: '' },
  { id: 'df5', name: 'Achraf Hakimi', position: 'DF', rating: 86, image: '' },
  { id: 'df6', name: 'Theo Hernandez', position: 'DF', rating: 86, image: '' },
  { id: 'df7', name: 'William Saliba', position: 'DF', rating: 85, image: '' },
  { id: 'df8', name: 'David Alaba', position: 'DF', rating: 85, image: '' },
  { id: 'df9', name: 'Antonio Rüdiger', position: 'DF', rating: 85, image: '' },
  { id: 'df10', name: 'Kyle Walker', position: 'DF', rating: 85, image: '' },
  { id: 'df11', name: 'John Stones', position: 'DF', rating: 86, image: '' },
  { id: 'df12', name: 'João Cancelo', position: 'DF', rating: 86, image: '' },
  { id: 'df13', name: 'Luke Shaw', position: 'DF', rating: 84, image: '' },
  { id: 'df14', name: 'Ronald Araújo', position: 'DF', rating: 86, image: '' },
  { id: 'df15', name: 'Éder Militão', position: 'DF', rating: 86, image: '' },
  { id: 'df16', name: 'Marquinhos', position: 'DF', rating: 87, image: '' },
  { id: 'df17', name: 'Dayot Upamecano', position: 'DF', rating: 84, image: '' },

  // Goalkeepers
  { id: 'gk1', name: 'Alisson Becker', position: 'GK', rating: 89, image: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Alisson_Becker_2018.jpg' },
  { id: 'gk2', name: 'Thibaut Courtois', position: 'GK', rating: 89, image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Courtois_2018.jpg' },
  { id: 'gk3', name: 'Marc-André ter Stegen', position: 'GK', rating: 88, image: '' },
  { id: 'gk4', name: 'Ederson', position: 'GK', rating: 88, image: '' },
  { id: 'gk5', name: 'Jan Oblak', position: 'GK', rating: 87, image: '' },
  { id: 'gk6', name: 'Mike Maignan', position: 'GK', rating: 87, image: '' },
  { id: 'gk7', name: 'Manuel Neuer', position: 'GK', rating: 87, image: '' },
  { id: 'gk8', name: 'Emiliano Martínez', position: 'GK', rating: 85, image: '' },
  { id: 'gk9', name: 'Gianluigi Donnarumma', position: 'GK', rating: 87, image: '' },
];

const FORMATION_SLOTS = [
    { id: 'slot-gk', x: 50, y: 88, label: 'GK' },
    { id: 'slot-lb', x: 15, y: 70, label: 'LB' },
    { id: 'slot-lcb', x: 38, y: 78, label: 'CB' },
    { id: 'slot-rcb', x: 62, y: 78, label: 'CB' },
    { id: 'slot-rb', x: 85, y: 70, label: 'RB' },
    { id: 'slot-cm1', x: 28, y: 50, label: 'CM' },
    { id: 'slot-cm2', x: 50, y: 55, label: 'CDM' },
    { id: 'slot-cm3', x: 72, y: 50, label: 'CM' },
    { id: 'slot-lw', x: 15, y: 25, label: 'LW' },
    { id: 'slot-st', x: 50, y: 18, label: 'ST' },
    { id: 'slot-rw', x: 85, y: 25, label: 'RW' },
];

type PlacedPlayer = typeof INITIAL_PLAYERS[0] & { x: number, y: number, uniqueId: string };

export default function ManagerMode() {
  const [team, setTeam] = useState<PlacedPlayer[]>([]);
  const [search, setSearch] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const pitchRef = useRef<HTMLDivElement>(null);

  const getShareText = () => {
      const grouped = team.reduce((acc, p) => {
          acc[p.position] = [...(acc[p.position] || []), p.name];
          return acc;
      }, {} as Record<string, string[]>);
      
      let text = "⚽️ My Dream XI on ScoreX\n\n";
      if (grouped['FW']) text += `FW: ${grouped['FW'].join(', ')}\n`;
      if (grouped['MF']) text += `MF: ${grouped['MF'].join(', ')}\n`;
      if (grouped['DF']) text += `DF: ${grouped['DF'].join(', ')}\n`;
      if (grouped['GK']) text += `GK: ${grouped['GK'].join(', ')}\n`;
      
      text += "\nBuild yours now!";
      return text;
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  // --- Hybrid Drag Logic ---
  
  // 1. Sidebar Drag Start (Native)
  const handleDragStart = (e: React.DragEvent, player: typeof INITIAL_PLAYERS[0]) => {
      e.dataTransfer.setData('playerId', player.id);
      e.dataTransfer.effectAllowed = 'copy';
      // Set a drag image if possible, but default is usually fine
  };

  // 2. Pitch Drag Over (Native)
  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault(); // allow drop
      e.dataTransfer.dropEffect = 'copy';
  };

  // 3. Pitch Drop (Native)
  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      const playerId = e.dataTransfer.getData('playerId');
      const player = INITIAL_PLAYERS.find(p => p.id === playerId);
      
      if (player && pitchRef.current) {
          // Calculate drop position %
          const rect = pitchRef.current.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
          
          let xPercent = (offsetX / rect.width) * 100;
          let yPercent = (offsetY / rect.height) * 100;

          // Clamp
          xPercent = Math.max(0, Math.min(100, xPercent));
          yPercent = Math.max(0, Math.min(100, yPercent));
          
          addPlayerAt(player, xPercent, yPercent);
      }
  };

  const addPlayerAt = (player: typeof INITIAL_PLAYERS[0], x: number, y: number) => {
      if (team.length >= 11) {
          // Find if there's a player nearby to replace? For now, prevent.
          alert("Max 11 players!"); 
          return;
      }
      
      // Check for snap to slot (Basic)
      let finalX = x;
      let finalY = y;
      
      const snapThreshold = 5; // %
      const closestSlot = FORMATION_SLOTS.find(slot => {
          const dist = Math.sqrt(Math.pow(slot.x - x, 2) + Math.pow(slot.y - y, 2));
          return dist < snapThreshold;
      });

      if (closestSlot) {
          finalX = closestSlot.x;
          finalY = closestSlot.y;
      }

      setTeam(prev => [
          ...prev, 
          { ...player, x: finalX, y: finalY, uniqueId: `${player.id}-${Date.now()}` }
      ]);
  };

  const removeFromTeam = (uniqueId: string) => {
      setTeam(team.filter(p => p.uniqueId !== uniqueId));
  };

  const filteredPlayers = INITIAL_PLAYERS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-crimson/30 pb-24">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-24 px-4">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="px-3 py-1 bg-crimson/20 border border-crimson/50 rounded-full text-crimson text-xs font-bold uppercase tracking-wider">Beta 2.0</span>
               <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Interactive Builder</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              Manager <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600">Mode</span>
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button 
                onClick={() => setTeam([])}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-bold text-sm"
            >
                <RotateCcw size={16} /> Reset
            </button>
            <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson/80 shadow-[0_0_20px_rgba(220,20,60,0.3)] rounded-xl transition-all font-bold text-sm"
            >
                <Share2 size={16} /> Share Squad
            </button>
          </div>
        </header>

        {/* Share Modal */}
        <AnimatePresence>
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowShareModal(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-[#111] border border-white/10 p-6 rounded-2xl w-full max-w-sm overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold font-serif">Share your Dream Team</h3>
                            <button onClick={() => setShowShareModal(false)} className="bg-white/5 hover:bg-white/10 p-1 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {/* WhatsApp */}
                            <a 
                                href={`https://wa.me/?text=${encodeURIComponent(getShareText())}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 w-full p-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-xl transition-all"
                            >
                                <Send size={20} /> Share via WhatsApp
                            </a>

                            {/* Twitter / X */}
                            <a 
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 w-full p-4 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold rounded-xl transition-all"
                            >
                                <Twitter size={20} /> Share via X (Twitter)
                            </a>

                            {/* Copy Link */}
                            <button 
                                onClick={copyToClipboard}
                                className="flex items-center gap-4 w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all"
                            >
                                {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />} 
                                {copied ? 'Copied to Clipboard!' : 'Copy Text'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
          
          {/* LEFT: Sidebar / Player Pool */}
          <div className="lg:col-span-3 bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col order-2 lg:order-1 h-[400px] lg:h-auto z-20 shadow-2xl">
             <div className="p-4 border-b border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2 text-gray-400">
                        <User size={16} /> {filteredPlayers.length} Players
                    </h3>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-white/60">
                        Squad: {team.length}/11
                    </span>
                </div>
                
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-crimson"
                    />
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="grid grid-cols-1 gap-2">
                    {filteredPlayers.map(player => {
                        const inTeam = team.some(p => p.id === player.id);
                        return (
                            <div 
                                key={player.id}
                                draggable={!inTeam}
                                onDragStart={(e) => handleDragStart(e, player)}
                                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 border transition-all select-none ${
                                    inTeam 
                                    ? 'bg-crimson/10 border-crimson/30 opacity-50 cursor-not-allowed' 
                                    : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-white/10 cursor-grab active:cursor-grabbing'
                                }`}
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden relative border border-white/10 shrink-0 pointer-events-none">
                                    <PlayerAvatar player={player} />
                                </div>
                                <div className="flex-1 min-w-0 pointer-events-none">
                                    <h4 className="text-sm font-bold truncate group-hover:text-crimson transition-colors">{player.name}</h4>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                        <span className={`font-mono px-1 rounded ${
                                            player.position === 'FW' ? 'text-blue-400' :
                                            player.position === 'MF' ? 'text-green-400' :
                                            player.position === 'DF' ? 'text-orange-400' : 'text-yellow-400'
                                        }`}>{player.position}</span>
                                        <span>OVR {player.rating}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
             </div>
          </div>


          {/* RIGHT: Pitch */}
          <div 
            className="lg:col-span-9 relative order-1 lg:order-2" 
            ref={pitchRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
             {/* Pitch Graphic */}
             <div className="absolute inset-0 bg-[#1a4d2e] rounded-2xl overflow-hidden border-4 border-[#1f5c38] shadow-2xl">
                {/* Grass Pattern */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(0,0,0,0.05)_50px,rgba(0,0,0,0.05)_100px)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                
                {/* Lines */}
                <div className="absolute inset-4 border-2 border-white/30 opacity-70 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/30 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-0 left-1/2 w-80 h-40 border-b-2 border-x-2 border-white/30 -translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-1/2 w-80 h-40 border-t-2 border-x-2 border-white/30 -translate-x-1/2"></div>
                </div>

                {/* VISUAL SLOTS (GHOSTS) */}
                {FORMATION_SLOTS.map(slot => (
                    <div 
                        key={slot.id}
                        className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                    >
                        <span className="text-white/20 font-bold text-xs">{slot.label}</span>
                    </div>
                ))}
             </div>

             {/* UI Overlay */}
             <div className="absolute top-4 right-4 z-10 pointer-events-none">
                 <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs text-white/70 flex items-center gap-2">
                     <Swords size={12} /> Drag Players Here
                 </div>
             </div>

             {/* PLAYERS ON PITCH (Motion Drag) */}
             <div className="absolute inset-0 z-20">
                 <AnimatePresence>
                     {team.map((player) => (
                         <DraggablePlayer 
                            key={player.uniqueId} 
                            player={player} 
                            pitchRef={pitchRef}
                            onRemove={() => removeFromTeam(player.uniqueId)} 
                         />
                     ))}
                 </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function DraggablePlayer({ player, pitchRef, onRemove }: { player: PlacedPlayer, pitchRef: React.RefObject<HTMLDivElement | null>, onRemove: () => void }) {
    return (
        <motion.div 
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={pitchRef}
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
            style={{
                position: 'absolute',
                top: `${player.y}%`,
                left: `${player.x}%`,
                x: '-50%', // Center anchor
                y: '-50%'
            }}
            className="group flex flex-col items-center cursor-grab active:cursor-grabbing"
        >
            {/* Remove Button (Hover) */}
            <div 
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-crimson rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-50 shadow-md"
            >
                <X size={12} />
            </div>

            {/* Token */}
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 shadow-xl overflow-hidden relative ${
                player.position === 'GK' ? 'border-yellow-400 bg-yellow-900/80' : 
                'border-white bg-black/60 backdrop-blur-sm'
            }`}>
                 <PlayerAvatar player={player} />
            </div>

            {/* Name Label */}
            <div className="mt-1 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-white/10 whitespace-nowrap overflow-visible">
                {player.name} <span className="text-crimson ml-1">{player.rating}</span>
            </div>
        </motion.div>
    );
}

function PlayerAvatar({ player }: { player: { name: string, image?: string, position: string } }) {
    const [imgError, setImgError] = useState(false);

    if (player.image && !imgError) {
        return (
            <img 
                src={player.image} 
                alt={player.name} 
                className="w-full h-full object-cover" 
                draggable={false}
                onError={() => setImgError(true)}
            />
        );
    }

    return (
        <div className="w-full h-full flex items-center justify-center font-bold text-white/40 select-none">
            {player.position}
        </div>
    );
}
