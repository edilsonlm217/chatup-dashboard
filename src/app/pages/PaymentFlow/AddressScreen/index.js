import React from 'react';
import Stepper from 'react-stepper-horizontal';

import './styles.css';

function AddressScreen() {
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
            activeStep={1}
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
            <label>CEP</label>
            <input
              placeholder="Informe seu CEP"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Rua</label>
            <input
              placeholder="Informe sua rua"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Número</label>
            <input
              placeholder="Informe o número do endereço"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Bairro</label>
            <input
              placeholder="Informe seu bairro"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Cidade</label>
            <input
              placeholder="Informe sua cidade"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>UF</label>
            <input
              placeholder="Informe sua UF"
              type="text"
              className="form-control"
            />
          </div>

          <button type="button" className="btn btn-primary btn-fw btn-btn-lg">Avançar</button>
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
        </div>
      </div>

    </div>
  );
}

export default AddressScreen;