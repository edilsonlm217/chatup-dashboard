import React, { useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

function Sidebar() {
  const { user } = useAuth();

  const [state, setState] = useState({});

  const onRouteChanged = useCallback(() => {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(state).forEach(i => {
      setState({ [i]: false });
    });
  }, [state]);

  function isPathActive(path) {
    const pathname = window.location.pathname;
    return pathname.startsWith(path);
  }

  useEffect(() => {
    onRouteChanged();
  }, [onRouteChanged]);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href="index.html">
          <img src="http://updata.com.br/chatup.png" alt="logo" />
        </a>
        <a className="sidebar-brand brand-logo-mini" href="index.html">
          <img src="http://updata.com.br/up.svg" alt="logo" />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle"
                  src={require('../assets/images/faces/face15.jpg')}
                  alt="profile"
                />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">{user?.name}</h5>
                <span>Membro Padrão</span>
              </div>
            </div>
          </div>
        </li >
        <li className="nav-item nav-category">
          <span className="nav-link">CHATBOT</span>
        </li>
        <li className={isPathActive('/session') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/session">
            <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
            <span className="menu-title">Controle de Sessão</span>
          </Link>
        </li>
        <li className={isPathActive('/messages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/messages">
            <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
            <span className="menu-title">Person. Mensagens</span>
          </Link>
        </li>
        <li className={isPathActive('/attendants') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/attendants">
            <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
            <span className="menu-title">Cadast. Atendentes</span>
          </Link>
        </li>

        <li className="nav-item nav-category">
          <span className="nav-link">FINANCEIRO</span>
        </li>
        <li className={isPathActive('/invoices') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/invoices">
            <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
            <span className="menu-title">Minhas Faturas</span>
          </Link>
        </li>
      </ul >
    </nav>
  );
}

export default withRouter(Sidebar);