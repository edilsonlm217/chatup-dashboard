import React from 'react';

export default function AttendantScreen() {
  return (
    <div className="content-wrapper">
      <div>
        <div className="page-header">
          <h3 className="page-title">Cadastro de atendentes</h3>
        </div>

        <div class="row">
          <div class="col-md-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Lista de departamentos</h4>

                <div class="table-responsive">
                  <table class="table">
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

          <div class="col-md-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Lista de atendentes</h4>
                <p class="card-description">Você ainda não possui nenhum atendente cadastrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}