'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
// We will build these sub-views next
import OverviewView from './OverviewView'; 
import StatsView from './StatsView'; 
import TimelineView from './TimelineView';
import LineupView from './LineupView';

const TABS = ['Overview', 'Timeline', 'Lineups', 'Stats'];

export default function MatchTabs({ match }: { match: any }) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Selectors */}
      <div className="flex p-1 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 mb-8 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all duration-300 relative whitespace-nowrap ${
              activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-lg shadow-inner"
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'Stats' && <StatsView stats={match.stats} />}
        {activeTab === 'Lineups' && <LineupView lineups={match.lineups} />}
        {activeTab === 'Timeline' && <TimelineView match={match} />}
        {activeTab === 'Overview' && <OverviewView match={match} />}
      </div>
    </div>
  );
}
