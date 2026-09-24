import { motion } from 'framer-motion';
import { MODELS } from '../lib/constants';
import { useI18n } from '../i18n/context';

export default function ModelSelector({ modelId, onChange, predicting, disabled }) {
  const { t } = useI18n();
  return (
    <fieldset className="model-selector">
      <legend className="model-selector-title">{t('modelLegend')}</legend>
      <div className="model-selector-options">
        {MODELS.map((m, i) => (
          <motion.label
            key={m.id}
            className={`model-card ${modelId === m.id ? 'is-active' : ''} ${m.auc == null ? 'is-pending' : ''}`}
            title={m.auc == null ? t('noWeights') : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
          >
            <input
              type="radio"
              name="modelId"
              value={m.id}
              checked={modelId === m.id}
              disabled={predicting || m.auc == null || disabled}
              onChange={() => {
                if (modelId !== m.id) onChange(m.id);
              }}
            />
            <div className="model-card-header">
              <span className="model-radio" aria-hidden="true" />
              <span className="model-card-name">{m.name}</span>
              {m.auc != null && modelId === m.id && (
                <span className="model-card-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
            <span className="model-card-metrics">
              {m.auc != null
                ? `AUC ${m.auc} · ${m.sizeMB} MB`
                : t('pendingTraining')}
            </span>
            {m.auc != null && (
              <span className="model-card-detail">
                {t('sensSpec', m.sens, m.spec)}
              </span>
            )}
            {modelId === m.id && disabled && (
              <span className="model-card-loading">{t('loadingModel')}</span>
            )}
          </motion.label>
        ))}
      </div>
    </fieldset>
  );
}
