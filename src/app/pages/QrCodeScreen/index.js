import React from 'react';
import { useParams } from "react-router-dom";

import './styles.css';

export default function QrCodeScreen() {
  const { qrCode } = useParams();
  const decoded = JSON.parse(decodeURIComponent(qrCode));

  return (
    <div className="container">
      <img src={decoded.qrcode} alt="qrCode" />
    </div>
  );
}