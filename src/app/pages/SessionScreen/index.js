import React, { useState } from 'react';

import './styles.css';
import 'react-responsive-modal/styles.css';

export default function SessionScreen() {
  function handleQrCodeScanning() {
    window.open(
      'http://localhost:3000/scan',
      'sharer',
      'toolbar = 0, status = 0, width = 548, height = 325'
    );
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