// src/widgets/AccountOverview/SewerSection.js
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccountContext } from '../../context/AccountContext';
import { sewerContainer, sewerItem } from './variants';
import './AccountOverview.css';

export default function SewerSection() {
  const { accountData } = useContext(AccountContext);
  const [open, setOpen] = useState(false);
  if (!accountData) return null;

  // pull out your main + faction stats
  const stats = accountData.data.InfoResultPayload.PlayerStatistics;
  const progressSewer    = stats.find(s => s.StatisticName === 'Progress_Sewer')?.Value ?? 0;
  const kodiakSewer      = stats.find(s => s.StatisticName === 'Progress_Sewer_Red')?.Value ?? 0;
  const mantisSewer      = stats.find(s => s.StatisticName === 'Progress_Sewer_Green')?.Value ?? 0;
  const howlerSewer      = stats.find(s => s.StatisticName === 'Progress_Sewer_Yellow')?.Value ?? 0;
  const craneSewer       = stats.find(s => s.StatisticName === 'Progress_Sewer_Blue')?.Value ?? 0;
  const purpleSewer      = stats.find(s => s.StatisticName === 'Progress_Sewer_Purple')?.Value ?? 0;
  // etc…

  return (
    <motion.div layout className="ao-sewer-section">
      {/* header row */}
      <motion.div 
        layout 
        className="ao-row ao-sewer-header" 
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.02 }}
        style={{ cursor: 'pointer' }}
      >
        <span className="ao-label">Sewers</span>
        <span className="ao-value">{progressSewer + kodiakSewer + mantisSewer + howlerSewer + craneSewer + purpleSewer}</span>
      </motion.div>

      {/* sub-list */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="ao-sublist"
            variants={sewerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div variants={sewerItem} className="ao-row">
              <span className="ao-label">Main</span>
              <span className="ao-value">{progressSewer}</span>
            </motion.div>
            <motion.div variants={sewerItem} className="ao-row">
              <span className="ao-label">Kodiak</span>
              <span className="ao-value">{kodiakSewer}</span>
            </motion.div>
            <motion.div variants={sewerItem} className="ao-row">
              <span className="ao-label">Mantis</span>
              <span className="ao-value">{mantisSewer}</span>
            </motion.div>
            <motion.div variants={sewerItem} className="ao-row">
              <span className="ao-label">Howler</span>
              <span className="ao-value">{howlerSewer}</span>
            </motion.div>
            <motion.div variants={sewerItem} className="ao-row">
              <span className="ao-label">Crane</span>
              <span className="ao-value">{craneSewer}</span>
            </motion.div>
            <motion.div variants={sewerItem} className="ao-row">
              <span className="ao-label">Cobra/Gryphon</span>
              <span className="ao-value">{purpleSewer}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
