import { Component } from 'react';
import { I18nContext } from './i18n/context';

/**
 * React Error Boundary: captura errores de rendering en la UI y muestra
 * un fallback en lugar de una pantalla blanca. TF.js crashes, errores
 * de inferencia, etc. no matan toda la app.
 */
export default class ErrorBoundary extends Component {
  static contextType = I18nContext;

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  render() {
    const { t } = this.context;
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary">
          <p className="error-boundary-title">{t('ebTitle')}</p>
          <p className="error-boundary-msg">
            {this.state.error?.message || t('ebUnknown')}
          </p>
          <button
            type="button"
            className="error-boundary-btn"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            {t('retry')}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
