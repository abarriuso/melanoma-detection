import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function ExampleGallery({ examples, onSelect, disabled }) {
  const { t } = useI18n();
  if (examples.length === 0) return null;

  return (
    <div className="examples">
      <div className="examples-head">
        <span className="examples-label">{t('examplesLabel')}</span>
        <button
          type="button"
          className="rotate-examples-btn"
          onClick={() => onSelect('rotate')}
          title={t('rotateTitle')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7a6 6 0 016-6m0 0l-2 2m2-2l2 2M13 7a6 6 0 01-6 6m0 0l2-2m-2 2l-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('rotateBtn')}
        </button>
      </div>
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="examples-announcer">
        {t('examplesAnnounce', examples.length, examples.filter((e) => e.real === 'malignant').length, examples.filter((e) => e.real === 'benign').length)}
      </div>
      <div className="examples-row" role="group" aria-label={t('examplesGroup')} aria-describedby="examples-announcer">
        <AnimatePresence>
          {examples.map((ex) => (
            <motion.button
              key={ex.path}
              type="button"
              className={`example-thumb ${ex.real === 'malignant' ? 'is-mal' : 'is-ben'}`}
              onClick={() => onSelect(ex.path)}
              disabled={disabled}
              aria-label={t('tryWith', ex.real === 'malignant')}
              title={t('exampleLabel', ex.real === 'malignant')}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <img src={ex.path} alt="" loading="lazy" crossOrigin="anonymous" />
              <span className="example-thumb-badge" aria-hidden="true">
                {t('badge', ex.real === 'malignant')}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
