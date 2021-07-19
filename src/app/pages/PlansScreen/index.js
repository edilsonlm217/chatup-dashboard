import React from 'react';

export default function PlansScreen() {
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">Nossos planos</h3>
      </div>

      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Plano Padrão</h4>
          <p className="card-description">Com esta assinatura você tem acesso garantido aos serviços de chatbot, add-on de mapa de caixas e aplicativo de suporte. Tudo pelo preço de um!</p>

          <div style={{ display: 'flex', marginTop: 20 }}>
            <button
              type="button"
              className="btn btn-primary btn-fw"
            >Assinar agora</button>
          </div>
        </div>
      </div>
    </div>
  );
}