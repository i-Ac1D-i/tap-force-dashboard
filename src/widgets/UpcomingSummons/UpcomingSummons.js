// File: src/widgets/UpcomingSummons/UpcomingSummons.js
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccountContext } from '../../context/AccountContext';
import { getHeroById } from '../../utils/heroUtils';
import './UpcomingSummons.css';

// Framer Motion variants for list items
const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit:   { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

const rarityOptions = ['all', 'base', 'super', 'elite'];

export default function UpcomingSummons() {
  const { accountData } = useContext(AccountContext);
  const [filter, setFilter] = useState('elite');

  if (!accountData) return null;

  const raw   = accountData.data.InfoResultPayload.UserData.KittyRolls.Value;
  const data  = JSON.parse(raw);
  const categories = [
    { key: 'RecruitScrolls', label: 'Capsules' },
    { key: 'RecruitOrbs',   label: 'Orbs' },
    { key: 'RecruitShardsBlue',   label: 'Rare Cartridges' },
    { key: 'RecruitShardsPurple', label: 'Elite Cartridges' },
  ];

  return (
    <div className="upcoming-summons">
      <h2 className="us-title">Upcoming Summons</h2>
      <div className="us-filters">
        {rarityOptions.map(opt => (
          <button
            key={opt}
            className={`us-filter-btn ${filter === opt ? 'active' : ''}`}
            onClick={() => setFilter(opt)}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      {categories.map(cat => (
        <SummonCategory
          key={cat.key}
          label={cat.label}
          ids={data[cat.key] || []}
          filter={filter}
        />
      ))}
    </div>
  );
}

function SummonCategory({ label, ids, filter }) {
  const [open, setOpen] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (!open && heroes.length === 0) {
      setLoading(true);
      const loaded = await Promise.all(ids.map(id => getHeroById(id)));
      // attach original position index
      const withIndex = loaded
        .map((h, idx) => h ? ({ ...h, originalIndex: idx + 1 }) : null)
        .filter(Boolean);
      console.log(withIndex);
      setHeroes(withIndex);
      setLoading(false);
    }
    setOpen(v => !v);
  };

  // determine subset to render:
  // Rare Cartridges only show super; otherwise apply global filter
  const displayHeroes = loading
    ? []
    : label === 'Rare Cartridges'
    ? heroes.filter(h => h.rarity.toLowerCase() === 'super')
    : heroes.filter(h => filter === 'all' || h.rarity.toLowerCase() === filter);

  return (
    <motion.div layout className="summon-category">
      <motion.div
        layout
        className="sc-header"
        onClick={toggle}
        whileHover={{ scale: 1.02 }}
        style={{ cursor: 'pointer' }}
      >
        <span className="sc-label">{label}</span>
        <span className="sc-count">{ids.length}</span>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sc-list"
          >
            {loading && (
              <li className="sc-item">Loading...</li>
            )}

            {!loading && displayHeroes.map((hero) => (
              <motion.li
                key={hero.originalIndex}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`sc-item rarity-${hero.rarity.toLowerCase()}`}
              >
                {hero.originalIndex}. {hero.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
