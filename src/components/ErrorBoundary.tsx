import React from 'react';

type Props = {children: React.ReactNode};
type State = {hasError: boolean};

// Catches uncaught rendering errors so one broken page shows a recovery
// screen instead of a blank view. Reset happens on the next route change
// or when the visitor reloads.
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {hasError: false};

  static getDerivedStateFromError(): State {
    return {hasError: true};
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1rem',
        padding: '2rem', textAlign: 'center',
        backgroundColor: '#f4efec', color: '#1f2322',
      }}>
        <h1 style={{fontSize: '1.5rem', margin: 0}}>Something did not load properly</h1>
        <p style={{maxWidth: '32rem', margin: 0, lineHeight: 1.6}}>
          This page ran into a problem while displaying. Reloading usually fixes it.
        </p>
        <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.4rem', borderRadius: '999px', border: 'none',
              backgroundColor: '#73a89a', color: '#fdfcfb', cursor: 'pointer', fontSize: '1rem',
            }}
          >Reload page</button>
          <a
            href="/"
            style={{
              padding: '0.6rem 1.4rem', borderRadius: '999px',
              border: '1px solid #73a89a', color: '#1f2322',
              textDecoration: 'none', fontSize: '1rem',
            }}
          >Back to home</a>
        </div>
      </main>
    );
  }
}
