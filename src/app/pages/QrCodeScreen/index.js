import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useAuth } from '../../../hooks/auth';

import './styles.css';

export default function QrCodeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const [qrCode, setQrCode] = useState('');

  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const socket = io(`http://localhost:3333/`, {
      query: {
        userId: user.id,
      }
    });

    socket.on("connect_error", () => {
      history.push('/error');
    });

    socket.on('qrcode', data => {
      const { qrcode } = data;
      setQrCode(qrcode);
      setIsLoading(false);
    });

    socket.on('qrcode-error', () => {
      history.push('/error');
    });

    return () => {
      socket.emit('disconnect');
      socket.disconnect();
    };

  }, [history, user.id]);

  return (
    <div className="container">
      {isLoading
        ? <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000} />

        : <img src={qrCode} alt="qrCode" />
      }
    </div>
  )
}