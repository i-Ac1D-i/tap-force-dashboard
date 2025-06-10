// File: src/widgets/Mutagens/Mutagens.js
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AccountContext } from '../../context/AccountContext';
import { parseMutagen } from '../../utils/mutagenUtils';
import './Mutagens.css';

export default function Mutagens() {
  const { accountData } = useContext(AccountContext);

  const raw     = accountData.data.InfoResultPayload.UserData.KittyRolls.Value;
  const parsed  = JSON.parse(raw);

  const mutagensArr      = parsed.MutagenRolls || [];
  const superArr         = parsed.SuperMutagenRolls || [];
  const [idx, setIdx]         = useState(0);
  const [superIdx, setSuperIdx] = useState(0);

  const mutLength   = mutagensArr.length;
  const superLength = superArr.length;

  const currentMut   = parseMutagen(mutagensArr[idx] || 0);
  const currentSuper = parseMutagen(superArr[superIdx] || 0);

  const prevMut   = () => setIdx(i => (i - 1 + mutLength) % mutLength);
  const nextMut   = () => setIdx(i => (i + 1) % mutLength);
  const prevSuper = () => setSuperIdx(i => (i - 1 + superLength) % superLength);
  const nextSuper = () => setSuperIdx(i => (i + 1) % superLength);

  return (
    <motion.div
      className="mutagens-widget"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <h2 className="m-title">Mutagens</h2>

      <div className="m-section">
        <div className="m-grid">
          <div className="m-header">
            <span>HP</span><span>ATK</span><span>DEF</span><span>SPD</span>
          </div>
          <div className="m-values">
            {currentMut.priorities.map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </div>
        </div>
        <div className="m-footer">
          <motion.button className="m-arrow" onClick={prevMut} whileHover={{ scale: 1.1 }}>
            ‹
          </motion.button>
          <span className="m-index">{idx + 1}/{mutLength}</span>
          <span className="m-rating">Rating: {currentMut.rating}</span>
          <motion.button className="m-arrow" onClick={nextMut} whileHover={{ scale: 1.1 }}>
            ›
          </motion.button>
        </div>
      </div>

      <h3 className="m-subtitle">Super Mutagens</h3>
      <div className="m-section">
        <div className="m-grid">
          <div className="m-header">
            <span>HP</span><span>ATK</span><span>DEF</span><span>SPD</span>
          </div>
          <div className="m-values">
            {currentSuper.priorities.map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </div>
        </div>
        <div className="m-footer">
          <motion.button className="m-arrow" onClick={prevSuper} whileHover={{ scale: 1.1 }}>
            {"‹"}
          </motion.button>
          <div className="m-info">
            <span className="m-index">{superIdx + 1}/{superLength}</span>
            <span className="m-rating">Rating: {currentSuper.rating}</span>
          </div>
          <motion.button className="m-arrow" onClick={nextSuper} whileHover={{ scale: 1.1 }}>
            {"›"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}