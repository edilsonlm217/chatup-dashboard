import React, { useState } from 'react';

import edit_icon from '../../../assets/icons/edit_icon.svg';
import delete_icon from '../../../assets/icons/delete_icon.svg';

import './styles.css';

export default function AttendantScreen() {
  const [attendants, setAttendants] = useState(['a', 'b']);

  return (
    <div className="content-wrapper">
      <div>
        <div className="page-header">
          <h3 className="page-title">Cadastro de atendentes</h3>
        </div>

        <div className="row">
          <div className="col-md-5 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Lista de departamentos</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Departamento</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Suporte</td>
                        <td>Padrão do sistema</td>
                      </tr>
                      <tr>
                        <td>Financeiro</td>
                        <td>Padrão do sistema</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Lista de atendentes</h4>

                {attendants.length === 0 &&
                  <p className="card-description">
                    Você ainda não possui nenhum atendente cadastrado
                  </p>
                }

                {attendants.length !== 0 &&
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Whatsapp</th>
                          <th>Departamento</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Edilson Rocha Lima</td>
                          <td>92981974189</td>
                          <td>Suporte</td>
                          <td>
                            <div className="actions">
                              <img className="action_btn" src={edit_icon} alt="edit_icon" />
                              <img className="action_btn" src={delete_icon} alt="delete_icon" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Edilson Rocha Lima</td>
                          <td>92981974189</td>
                          <td>Suporte</td>
                          <td>
                            <div className="actions">
                              <img className="action_btn" src={edit_icon} alt="edit_icon" />
                              <img className="action_btn" src={delete_icon} alt="delete_icon" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                }

                <div className="card_option">
                  <button type="button" class="btn btn-success btn-fw">Adicionar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}