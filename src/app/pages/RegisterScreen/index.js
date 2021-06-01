import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useHistory } from "react-router-dom";

import api from '../../../services/api';
import 'react-toastify/dist/ReactToastify.css';

function RegisterScreen() {
  let history = useHistory();

  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dbHost, setDbHost] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [dbPort, setDbPort] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post('/account', {
        name,
        companyName,
        cnpj,
        phoneNumber,
        email,
        login: cnpj,
        password,
        dbHost,
        dbPort,
      });

      toast.success(
        'Registrado com sucesso', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      history.push('/login');
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src="http://updata.com.br/chatup.png" alt="logo" />
              </div>
              <h4>Novo aqui?</h4>
              <h6 className="font-weight-light">
                Preencha o formulário abaixo para criar sua conta!
              </h6>
              <form className="pt-3">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="form-control form-control-lg"
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label>Empresa</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Nome da sua empresa"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>CNPJ</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Contato</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Número de contato"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Servidor</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Endereço do MK-AUTH"
                    value={dbHost}
                    onChange={e => setDbHost(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Porta</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Porta de acesso"
                    value={dbPort}
                    onChange={e => setDbPort(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Senha</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  CRIAR CONTA
                </button>

                <div className="text-center mt-4 font-weight-light">
                  Já tem uma conta? <Link to="/login" className="text-primary">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;