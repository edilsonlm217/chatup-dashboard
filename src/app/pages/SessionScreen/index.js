import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';

import './styles.css';
import 'react-responsive-modal/styles.css';

function SessionScreen() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const Step1 = () => {
    return (
      <div className="modal-content">
        <label className="modal-title">Iniciar sessão</label>
        <label className="modal-subtitle">
          Este dispositivo será usado como chatbot no momento que você inicializar uma sessão
        </label>

        <div className="form-group">
          <label>Whatsapp</label>
          <input
            placeholder="Informe seu whatsapp"
            type="text"
            className="form-control"
          />
        </div>

        <div className="modal-btns-container">
          <button
            onClick={onCloseModal}
            type="button"
            className="btn btn-dark btn-lg"
          >
            Cancelar
          </button>
          <button type="button" className="btn btn-primary btn-lg">
            Próximo
          </button>
        </div>
      </div>
    );
  }

  function handleAddSession() {
    onOpenModal();
  }

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">Controle de Sessão</h3>
      </div>

      <div className="card" onClick={handleAddSession}>
        Iniciar sessão
        <span className="menu-icon">
          <i style={{ color: '#00D25B' }} className="mdi mdi-plus-circle"></i>
        </span>
      </div>

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        closeOnOverlayClick={false}
        showCloseIcon={false}
        styles={{ modal: { padding: 0, backgroundColor: '#191C24' } }}
      >
        <Step1 />
      </Modal>
    </div>
  );
}

export default SessionScreen;