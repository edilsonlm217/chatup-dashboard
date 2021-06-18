/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Modal from 'simple-react-modal';
import { toast } from 'react-toastify';
import Loader from "react-loader-spinner";

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import delete_icon from '../../../assets/icons/delete_icon_for_messages.svg';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function SessionScreen() {
  const { user } = useAuth();

  const [session, setSession] = useState(null);
  const [wppNumber, setWppNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
    var windowRef = null;

    const socket = io(`http://localhost:3333/`, {
      query: {
        userId: user.id,
      }
    });

    socket.on('read-qr-code', data => {
      const { qrcode } = data;
      const encoded = encodeURIComponent(JSON.stringify({ qrcode }));

      windowRef = popupWindow(`http://localhost:3000/scan/${encoded}`, 'QrCodeScreen', window, 350, 350);
    });

    socket.on('disconnect', reason => {
      windowRef.close();
      console.log('Server Disconnected');
    });

    socket.on('read-successfully', async () => {
      setIsModalOpen(false);
      setIsLoading(false);

      // TODO fazer chamada a API para criar sessão no wpp

      fetchSession();
    });
  }

  function desconnectSession() {
    // TODO chamada a api para desconectar um bot
  }

  function connectSession() {
    // TODO chamada a api para conectar um bot
  }

  function handleCreateSession() {
    const phoneNumberRegex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;

    if (!wppNumber.match(phoneNumberRegex)) {
      setIsModalOpen(false);
      setWppNumber('');

      toast.error('Este não é um número válido', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    setIsLoading(true);
    handleQrCodeScanning();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchSession() {
    try {
      const response = await api.get(`/venom/session/${user.id}`);
      setSession(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSession();
  }, [user.id]);

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">Controle de Sessão</h3>
      </div>

      {!session &&
        <div className="card" onClick={() => setIsModalOpen(true)}>
          Iniciar sessão
          <span className="menu-icon">
            <i style={{ color: '#00D25B' }} className="mdi mdi-plus-circle"></i>
          </span>
        </div>
      }

      {session &&
        <div className='session-card'>
          <div className='session-card-header'>
            <div>
              <small className='text-muted'>Whatsapp</small>
              <h4>36483445</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <small
                className={session.isConnected ? 'text-success' : 'text-danger'}
                style={{ marginTop: 5 }}
              >
                {session.isConnected ? 'Online' : 'Offline'}
              </small>

              <small>
                {`Bateria: ${session.getBatteryLevel}%`}
              </small>
            </div>

          </div>

          <div className='session-card-options'>
            <button
              type="button"
              className="btn btn-outline-info btn-fw"
              onClick={session.isConnected ? desconnectSession : connectSession}
            >{session.isConnected ? 'Desconectar' : 'Conectar'}</button>

            <div className='action_container'>
              <img src={delete_icon} alt='delete_icon' />
            </div>
          </div>
        </div>
      }

      <Modal
        containerStyle={{ background: '#191C24', width: 600 }} //changes styling on the inner content area
        closeOnOuterClick={true}
        show={isModalOpen}
      // onClose={this.close.bind(this)}
      >
        <div style={{ marginTop: 20 }}>
          <h4>Novo Dispositivo</h4>
          <p className='text-muted'>
            Este dispositivo será usado como chatbot no momento que você inicializar uma sessão
          </p>

          <div className="form-group" style={{ marginTop: 30 }}>
            <label>Whatsapp</label>
            <input
              value={wppNumber}
              onChange={e => setWppNumber(e.target.value)}
              placeholder="Informe um número whatsapp válido"
              type="text"
              className="form-control form-control" />
          </div>

          <div className="modal-btns">
            <button
              type="button"
              className="btn btn-dark btn-fw"
              onClick={() => setIsModalOpen(false)}
            >Cancelar</button>

            <button
              type="button"
              className="btn btn-primary btn-fw"
              onClick={handleCreateSession}
              style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}
            >
              Continuar
              {isLoading &&
                <Loader
                  type="Oval"
                  color="#191C24"
                  height={20}
                  width={20}
                  visible={isLoading}
                />
              }
            </button>
          </div>
        </div>
      </Modal>
    </div >
  );
}