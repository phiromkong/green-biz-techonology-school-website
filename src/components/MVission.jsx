import React from 'react';
import './css/MVission.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const MVission = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

    return (
        <div className="missionVisionContainer">
          <div className="mission">
            <h2>{t('mission')}</h2>
            <p>
            {t('missionStatement')}
            </p>
          </div>
          <div className="divider"></div>
          <div className="vision">
            <h2>{t('vission')}</h2>
            <p>
            {t('vissionStatement')}
            </p>
          </div>
        </div>
      );
  };
  
  export default MVission;