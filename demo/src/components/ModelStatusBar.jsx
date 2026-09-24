import { useI18n } from '../i18n/context';

export default function ModelStatusBar({ status, progress, backend }) {
  const { t } = useI18n();
  return (
    <div className={`model-status status-${status}`} role="status" aria-live="polite">
      {status === 'loading' && (
        <>
          <span className="status-spinner" aria-hidden="true" />
          <span className="status-text">
            {progress >= 100 ? t('statusPreparing') : t('statusLoading', progress)}
          </span>
          <span
            className="status-progress"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </>
      )}
      {status === 'ready' && (
        <>
          <span className="status-dot" aria-hidden="true" />
          <span>{t('statusReady')} <code>{backend}</code></span>
        </>
      )}
      {status === 'error' && (
        <>
          <span className="status-dot status-dot--error" aria-hidden="true" />
          <span>{t('statusError')}</span>
          <button
            type="button"
            className="status-retry-btn"
            onClick={() => window.location.reload()}
          >
            {t('retry')}
          </button>
        </>
      )}
    </div>
  );
}
