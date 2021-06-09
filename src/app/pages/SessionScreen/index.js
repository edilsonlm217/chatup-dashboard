import React from 'react';

import './styles.css';

export default function SessionScreen() {
  function popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);

    return win.open(
      url,
      windowName,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
    );
  }

  function handleQrCodeScanning() {
    popupWindow('http://localhost:3000/scan', 'QrCodeScreen', window, 350, 350);
  }

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">Controle de Sessão</h3>
      </div>

      <div className="card" onClick={handleQrCodeScanning}>
        Iniciar sessão
        <span className="menu-icon">
          <i style={{ color: '#00D25B' }} className="mdi mdi-plus-circle"></i>
        </span>
      </div>
    </div>
  );
}