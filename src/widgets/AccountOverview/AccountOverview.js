// File: src/widgets/AccountOverview/AccountOverview.js
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AccountContext } from '../../context/AccountContext';
import { getAvatarPathById } from '../../utils/heroUtils';
import './AccountOverview.css';
import SewerSection from './SewerSection';

export default function AccountOverview() {
  const { accountData } = useContext(AccountContext);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // if (!accountData) return null; commented because i cant put conditionals before the useEffect function

  const info  = accountData.data.InfoResultPayload;
  const stats = info.PlayerStatistics;

  // get display name and avatar index
  const displayName  = info.AccountInfo.TitleInfo.DisplayName;
  const avatarIndex  = stats.find(s => s.StatisticName === 'AvatarIndex')?.Value;

  useEffect(() => {
    if (avatarIndex != null) {
      getAvatarPathById(avatarIndex).then(url => {
        if (url) setAvatarUrl(url);
      });
    }
  }, [avatarIndex]);

  // other stats
  const xpLevel          = stats.find(s => s.StatisticName === 'XpLevel')?.Value ?? 0;
  const progressCampaign = stats.find(s => s.StatisticName === 'Progress_Campaign')?.Value ?? 0;
  const vipLevel         = stats.find(s => s.StatisticName === 'VipLevel')?.Value ?? 0;

  return (
    <motion.div
      className="account-overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Avatar and Name Row */}
      <motion.div className="ao-avatar-name">
        {avatarUrl && (
          <img src={avatarUrl} alt="Avatar" className="ao-avatar" />
        )}
        <span className="ao-displayName">{displayName}</span>
      </motion.div>

      

      <motion.div className="ao-row">
        <span className="ao-label">XP Level:</span>
        <span className="ao-value">{xpLevel}</span>
      </motion.div>

      <motion.div className="ao-row">
        <span className="ao-label">VIP</span>
        <span className="ao-value">{vipLevel}</span>
      </motion.div>

      <motion.div className="ao-row">
        <span className="ao-label">Campaign Progress:</span>
        <span className="ao-value">{progressCampaign}</span>
      </motion.div>

      <SewerSection/>
    </motion.div>
  );
}
