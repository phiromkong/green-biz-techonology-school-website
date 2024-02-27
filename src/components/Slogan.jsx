import React from 'react';
import './css/Slogan.css';
import { useTranslation } from 'react-i18next';

const Slogan = () => {
  const { t } = useTranslation();
  return (
    <div className="Slogan">
      <div className='part1'>{t('sloganPart1')}</div>
      <div className="part2">{t('sloganPart2')}</div>
    </div>
 );
};

export default Slogan;
