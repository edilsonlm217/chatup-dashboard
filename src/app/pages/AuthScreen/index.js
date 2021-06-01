import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import { useAuth } from '../../../hooks/auth';

function AuthScreen() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const { user, signIn } = useAuth();

  console.log(user);

  function handleSubmit(event) {
    event.preventDefault();
    signIn({ login, password });
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src="http://updata.com.br/chatup.png" alt="logo" />
              </div>
              <h4>Bem vindo</h4>
              <h6 className="font-weight-light">Faça login para começar</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="email"
                    placeholder="Informe seu CNPJ"
                    size="lg"
                    className="h-auto"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Informe sua senha"
                    size="lg"
                    className="h-auto"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>

                <button
                  onClick={handleSubmit}
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  CRIAR CONTA
                </button>

                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                        Mantenha-me logado
                      </label>
                  </div>
                </div>

                <div className="text-center mt-4 font-weight-light">
                  Ainda não tem conta? <Link to="/register" className="text-primary">Registrar</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;