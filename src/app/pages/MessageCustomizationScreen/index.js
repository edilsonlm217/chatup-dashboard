/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import Modal from 'simple-react-modal';
import { toast } from 'react-toastify';

import edit_icon from '../../../assets/icons/edit_icon_for_messages.svg';
import { useAuth } from '../../../hooks/auth';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MessageCustomizationScreen() {
  const [messages, setMessages] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState({});

  const { user } = useAuth();

  function handleEdit(message) {
    setModalMsg(message);
    setModalOpen(true);
  }

  async function handleUpdateMessage() {
    const { _id } = modalMsg;

    try {
      const response = await api.put(`messages/${user.id}/${_id}`, {
        newMsg: modalMsg.message
      });

      messages.map((obj, index) => {
        if (obj._id === response.data._id) {
          messages[index] = response.data;
        }
      });

      setModalOpen(false);

      toast.success(
        'Mensagem alterada com sucesso', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await api.get(`messages/${user.id}`);

        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMessages();
  }, [user]);

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">Personalizar Mensagens</h3>
      </div>

      <div className="card-body" style={{ backgroundColor: '#191c24' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Opção</th>
                <th>Descrição</th>
                <th>Mensagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(item => (
                <tr key={item._id}>
                  <td>{item.option}</td>
                  <td>{item.description}</td>
                  <td>{item.message}</td>
                  <td>
                    <div className="edit-icon" onClick={() => handleEdit(item)}>
                      <img src={edit_icon} alt="edit_icon" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        containerStyle={{ background: '#191C24', width: 1000 }}
        closeOnOuterClick={true}
        show={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div>
          <header>
            <h3 className="modal-title">{modalMsg.option}</h3>
            <p style={{ color: '#6C7293' }}>{modalMsg.description}</p>
          </header>

          <div className='form-container'>
            <strong className='modal-form-label'>Mensagem</strong>
            <textarea
              onChange={(e) => setModalMsg({
                ...modalMsg,
                message: e.target.value
              })}
              readOnly={false}
              value={modalMsg.message}
              rows={10}
              className='text-area'
            />
          </div>

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-primary btn-fw"
              onClick={() => handleUpdateMessage(false)}
            >Salvar</button>

            <button
              onClick={() => setModalOpen(false)}
              type="button"
              className="btn btn-dark btn-fw"
            >Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}