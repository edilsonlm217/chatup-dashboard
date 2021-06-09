import React from 'react';
import { useHistory } from "react-router-dom";
import ErrorIcon from '../../../../assets/icons/Icon material-error-outline.svg';

import './styles.css';

export default function ErrorScreen() {
  const history = useHistory();

  function handleTryAgain() {
    history.push('/scan');
  }

  return (
    <div className="error-container">
      <img src={ErrorIcon} alt="Error" />

      <h3 className="page-title" style={{ padding: 30 }} >Algo deu errado!</h3>

      <p style={{ textAlign: 'center' }}>
        Por alguma razão não foi possível iniciar sua sessão.
      </p>

      <button
        type="button"
        className="btn btn-outline-info btn-fw"
        onClick={handleTryAgain}
        style={{ margin: 20 }}
      >Tentar Novamente</button>
    </div>
  );
}