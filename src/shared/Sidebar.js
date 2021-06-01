import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });
  }

  render() {
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
                  <h5 className="mb-0 font-weight-normal">Henry Klein</h5>
                  <span>Membro Padrão</span>
                </div>
              </div>
            </div>
          </li >
          <li className="nav-item nav-category">
            <span className="nav-link">CHATBOT</span>
          </li>
          <li className={this.isPathActive('/session') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/session">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title">Controle de Sessão</span>
            </Link>
          </li>
          <li className={this.isPathActive('/messages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/messages">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title">Person. Mensagens</span>
            </Link>
          </li>
          <li className={this.isPathActive('/attendants') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/attendants">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title">Cadast. Atendentes</span>
            </Link>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link">FINANCEIRO</span>
          </li>
          <li className={this.isPathActive('/invoices') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/invoices">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title">Minhas Faturas</span>
            </Link>
          </li>
        </ul >
      </nav >
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);