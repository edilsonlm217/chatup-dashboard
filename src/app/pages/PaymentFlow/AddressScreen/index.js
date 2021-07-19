import React, { useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import { useHistory } from "react-router-dom";

import './styles.css';

function AddressScreen() {
  const history = useHistory();

  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [hood, setHood] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function nextPaymentFunction() {
    if (cep === '' || street === '' || number === '' || hood === '' || city === '' || uf === '') {
      return window.alert('Todos os campos são obrigatórios');
    } else {
      return (
        history.push('/payment/3', {
          cep,
          street,
          number,
          hood,
          city,
          uf
        })
      );
    }
  }

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
            defaultOpacity="0.5"
            titleFontSize={12}
          />
        </div>

        <form className="forms-sample">
          <div className="form-group">
            <label>CEP</label>
            <input
              value={cep}
              onChange={e => setCep(e.target.value)}
              placeholder="Informe seu CEP"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Rua</label>
            <input
              value={street}
              onChange={e => setStreet(e.target.value)}
              placeholder="Informe sua rua"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Número</label>
            <input
              value={number}
              onChange={e => setNumber(e.target.value)}
              placeholder="Informe o número do endereço"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Bairro</label>
            <input
              value={hood}
              onChange={e => setHood(e.target.value)}
              placeholder="Informe seu bairro"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Cidade</label>
            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Informe sua cidade"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>UF</label>
            <input
              value={uf}
              onChange={e => setUf(e.target.value)}
              placeholder="Informe sua UF"
              type="text"
              className="form-control"
            />
          </div>

          <button
            onClick={nextPaymentFunction}
            type="button"
            className="btn btn-primary btn-fw btn-btn-lg"
          >Avançar</button>
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