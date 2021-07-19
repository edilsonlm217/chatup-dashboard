import React from 'react';
import Stepper from 'react-stepper-horizontal';

import './styles.css';

function PaymentScreen() {
  return (
    <div className="full-page-container">

      <div className="custom-card main">
        <header>
          <img className="logo" src="http://updata.com.br/chatup.png" alt="logo" />
          <h4>Plano Padrão</h4>
        </header>

        <div className="stepper">
          <Stepper
            steps={[
              { title: 'Registro' },
              { title: 'Endereço' },
              { title: 'Pagamento' },
            ]}
            activeStep={2}
            activeColor="#00A0DF"
            completeColor="#00E71D"
            completeTitleColor="#00E71D"
            activeTitleColor="#FFFFFF"
            defaultOpacity={0.5}
            titleFontSize={12}
          />
        </div>

        <form className="forms-sample">
          <div className="form-group">
            <label>Nome no cartão</label>
            <input
              placeholder="Informe o nome indicado no cartão"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Número do cartão</label>
            <input
              placeholder="Informe o númere do seu cartão"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Data de Expiração</label>
            <input
              placeholder="MM/AAAA"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Código CVC</label>
            <input
              placeholder="Informe o código do cartão"
              type="text"
              className="form-control"
            />
          </div>
        </form>

      </div>

      <div className="custom-card">
        <div>
          <h4>Resumo da compra</h4>
          <p className="text-muted">1x Assinatura Plano Padrão</p>

          <h6 className="preview-subject">Descrição da assinatura:</h6>
          <p className="text-muted">Com esta assinatura você tem acesso garantido aos serviços de chatbot, add-on de mapa de caixas e aplicativo de suporte.</p>

          <h6 className="preview-subject">Valor:</h6>
          <p className="text-muted">R$ 150<strong>/mês</strong></p>

          <h6 className="preview-subject">Bônus:</h6>
          <p className="text-muted">30 dias grátis</p>

          <button
            type="button"
            className="btn btn-primary btn-fw btn-btn-lg"
            style={{ width: '100%', marginTop: 20 }}
          >Assinar</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;