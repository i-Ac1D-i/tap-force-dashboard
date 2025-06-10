// File: src/widgets/DragonShards/DragonShards.js
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccountContext } from '../../context/AccountContext';
import { getDragonById } from '../../utils/dragonUtils';
import './DragonShards.css';

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit:   { opacity: 0, x: -10, transition: { duration: 0.2 } }
};

// global rarity filter options (matching your CSV rarities)
const rarityOptions = ['All', 'Base', 'Super', 'Elite', 'Rare Elite'];

const categories = [
  { key: 'ArtifactsBlue',   label: 'Normal Shards', filterRarities: ['Base', 'Super'] },
  { key: 'ArtifactsPurple', label: 'Elite Shards',  filterRarities: ['Elite', 'Rare Elite'] },
  { key: 'ArtifactsUltra',  label: 'Ultra Shards',  filterRarities: ['Rare Elite'] }
];

export default function DragonShards() {
  const { accountData } = useContext(AccountContext);
  const [filter, setFilter] = useState('All');

  if (!accountData) return null;
  const raw  = accountData.data.InfoResultPayload.UserData.KittyRolls.Value;
  const data = JSON.parse(raw);

  return (
    <div className="dragon-shards">
      <h2 className="ds-title">Dragon Shards</h2>

      
      <div className="ds-filters">
        {rarityOptions.map(opt => (
          <button
            key={opt}
            className={`ds-filter-btn ${filter === opt ? 'active' : ''}`}
            onClick={() => setFilter(opt)}
          >
            {opt === "Rare Elite" ? "Ultra" : opt}
          </button>
        ))}
      </div>

      {categories.map(cat => (
        <ShardCategory
          key={cat.key}
          label={cat.label}
          ids={data[cat.key] || []}
          categoryRarities={cat.filterRarities}
          globalFilter={filter}
        />
      ))}
    </div>
  );
}

function ShardCategory({ label, ids, categoryRarities, globalFilter }) {
  const [open, setOpen] = useState(false);
  const [dragons, setDragons] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    if (!open) {
      setOpen(true);
      if (!dragons.length) {
        setLoading(true);
        Promise.all(ids.map(id => getDragonById(id)))
          .then(loaded => {
            const withIndex = loaded
              .map((d, idx) => d ? ({ ...d, originalIndex: idx + 1 }) : null)
              .filter(Boolean);
            setDragons(withIndex);
          })
          .finally(() => setLoading(false));
      }
    } else {
      setOpen(false);
    }
  };

  // determine display list: apply category rarities then global filter
  const display = loading
    ? []
    : dragons.filter(d =>
        categoryRarities.includes(d.rarity) &&
        (globalFilter === 'All' || d.rarity === globalFilter)
      );

  return (
    <motion.div layout className="ds-category">
      <motion.div
        layout
        className="dc-header"
        onClick={toggle}
        whileHover={{ scale: 1.02 }}
        style={{ cursor: 'pointer' }}
      >
        <span className="dc-label">{label}</span>
        <span className="dc-count">{ids.length}</span>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="dc-list"
          >
            {loading && <li className="dc-item">Loading...</li>}
            {!loading && display.map(d => (
              <motion.li
                key={d.originalIndex}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`dc-item dc-rarity-${d.rarity.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {d.originalIndex}. {d.name} <span className="dc-rarity">({d.rarity})</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}