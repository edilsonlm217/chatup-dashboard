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
  const [connectingIndicator, setConnectingIndicator] = useState(false);

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
        phoneNumber: wppNumber,
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

      fetchSession();
    });
  }

  async function desconnectSession() {
    await api.post(`venom/session/${user.id}`, {
      action: 'disconnect'
    });

    fetchSession();
  }

  async function connectSession() {
    setConnectingIndicator(true);

    await api.post(`venom/session/${user.id}`, {
      action: 'connect'
    }, { timeout: 60000 });

    fetchSession();

    setConnectingIndicator(false);
  }

  async function logoutSession() {
    await api.delete(`venom/session/${user.id}`);
    fetchSession();
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
      setSession(null);
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

      {session === null && (
        <div className="card cardy" onClick={() => setIsModalOpen(true)}>
          Iniciar sessão
          <span className="menu-icon">
            <i style={{ color: '#00D25B' }} className="mdi mdi-plus-circle"></i>
          </span>
        </div>
      )}

      {session !== null && (
        <div className='session-card'>
          <div className='session-card-header'>
            <div>
              <small className='text-muted'>Whatsapp</small>
              <h4>{session.phoneNumber}</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <small
                className={session.isConnected ? 'text-success' : 'text-danger'}
                style={{ marginTop: 5 }}
              >
                {session.isConnected ? 'Online' : 'Offline'}
              </small>

              <small>
                {session.getBatteryLevel !== null ? `Bateria: ${session.getBatteryLevel}%` : 'Bateria: Não foi possível obter'}
              </small>
            </div>

          </div>

          <div className='session-card-options'>
            <button
              type="button"
              className="btn btn-outline-info btn-fw"
              onClick={session.isConnected ? desconnectSession : connectSession}
            >
              {session.isConnected ? 'Desconectar' : 'Conectar'}
              <Loader
                type="Oval"
                color="#191C24"
                height={20}
                width={20}
                visible={connectingIndicator}
              />
            </button>

            <div className='action_container' onClick={logoutSession}>
              <img src={delete_icon} alt='delete_icon' />
            </div>
          </div>
        </div>
      )}

      <Modal
        containerStyle={{ background: '#191C24', width: 600 }} //changes styling on the inner content area
        closeOnOuterClick={true}
        show={isModalOpen}
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