import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function Hero({ modelName, auc }) {
  const { t } = useI18n();
  return (
    <motion.header
      className="hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="hero-eyebrow">{t('heroEyebrow')}</p>
      <h1>
        {t('heroTitleBefore')}<em>{t('heroTitleEm')}</em>{t('heroTitleAfter')}
      </h1>
      <p className="subtitle">
        {t('heroSub1', modelName)} <em>{t('heroSubEm')}</em> {t('heroSub2')}{' '}
        <span className="metric-highlight">{auc ?? '—'}</span> {t('heroSub3')}
      </p>
      <p className="hero-warn">
        <svg className="hero-warn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1.5L15 13.5H1L8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M8 6.2v3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11.6" r="0.7" fill="currentColor" />
        </svg>
        <span>{t('heroWarn')}</span>
      </p>
    </motion.header>
  );
}
