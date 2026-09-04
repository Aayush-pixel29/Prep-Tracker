import React from 'react';

export default function TitleBar() {
  const handleMinimize = () => window.electronAPI?.minimizeWindow();
  const handleMaximize = () => window.electronAPI?.maximizeWindow();
  const handleClose = () => window.electronAPI?.closeWindow();

  return (
    <div className="titlebar">
      <div className="titlebar__logo">
        <div className="titlebar__logo-icon">P</div>
        <span>PrepTracker</span>
      </div>
      <div className="titlebar__controls">
        <button className="titlebar__btn" onClick={handleMinimize} title="Minimize">
          ─
        </button>
        <button className="titlebar__btn" onClick={handleMaximize} title="Maximize">
          □
        </button>
        <button className="titlebar__btn titlebar__btn--close" onClick={handleClose} title="Close">
          ✕
        </button>
      </div>
    </div>
  );
}
