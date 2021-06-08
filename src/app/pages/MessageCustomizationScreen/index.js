import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

import edit_icon from '../../../assets/icons/edit_icon_for_messages.svg'
import { useAuth } from '../../../hooks/auth';

import './styles.css';

export default function MessageCustomizationScreen() {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  function handleEdit(message) {
    console.log(message);
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
    </div>
  );
}