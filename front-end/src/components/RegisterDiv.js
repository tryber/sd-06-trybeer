import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validNameReg, validEmailReg, validPassReg } from '../actions';
import { create } from '../api/index';

class RegisterDiv extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { dispatchRegName, dispatchRegEmail, dispatchRegPass } = this.props;
    if (name === 'email') {
      const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i;
      const isValid = validator.test(value.toLowerCase());
      if (isValid) {
        dispatchRegEmail(true);
      } else {
        dispatchRegEmail(false);
      }
    }
    if (name === 'password') {
      const maxLength = 5;
      if (value.length > maxLength) {
        dispatchRegPass(true);
      } else {
        dispatchRegPass(false);
      }
    }

    if (name === 'name') {
      const validator = /^[a-z ]+$/i;
      const isValid = validator.test(value.toLowerCase());
      const maxLength = 12;
      if (isValid && value.length > maxLength) {
        dispatchRegName(true);
      } else {
        dispatchRegName(false);
      }
    }
  }

  async signUp({ target }) {
    const { history } = this.props;
    const name = target.parentNode.firstChild.childNodes[1].value;
    const email = target.parentNode.firstChild.childNodes[2].childNodes[1].value;
    const pass = target.parentNode.firstChild.childNodes[4].value;
    const checked = target.parentNode.firstChild.childNodes[5].childNodes[0];
    const spanMaxTime = 10000;
    let role = 'client';
    if (checked.checked) {
      role = 'administrator';
    }
    const user = await create(name, email, pass, role);
    if (user.statusText) {
      const hiddenSpan = document.querySelector('.hidden-span');
      hiddenSpan.style.display = 'inline-block';
      hiddenSpan.innerHTML = user.message;
      setTimeout(() => {
        document.querySelector('.hidden-span').style.display = 'none';
      }, spanMaxTime);
      return null;
    }
    if (user.role === 'administrator') {
      history.push('./admin/orders');
    } else {
      history.push('./products');
    }
  }

  render() {
    const { validRegName, validRegEmail, validRegPass } = this.props;
    return (
      <div className="register-container">
        <div className="register-form">
          <span>Nome</span>
          <input
            name="name"
            className="input"
            data-testid="signup-name"
            onChange={ this.handleChange }
          />
          <div className="email-div">
            <span>Email</span>
            <input
              name="email"
              className="input"
              data-testid="signup-email"
              onChange={ this.handleChange }
            />
            <span className="hidden-span" />
          </div>
          <span>Senha</span>
          <input
            name="password"
            type="password"
            className="input"
            data-testid="signup-password"
            onChange={ this.handleChange }
          />
          <label htmlFor="sell-checkbox">
            <input type="checkbox" id="sell-checkbox" data-testid="signup-seller" />
            <span>Quero vender</span>
          </label>
        </div>
        <button
          type="button"
          data-testid="signup-btn"
          onClick={ (event) => this.signUp(event) }
          disabled={ !validRegName || !validRegEmail || !validRegPass }
        >
          Cadastrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  validRegName: state.login.regName,
  validRegEmail: state.login.regEmail,
  validRegPass: state.login.regPass,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRegName: (boolean) => dispatch(validNameReg(boolean)),
  dispatchRegEmail: (boolean) => dispatch(validEmailReg(boolean)),
  dispatchRegPass: (boolean) => dispatch(validPassReg(boolean)),
});

RegisterDiv.propTypes = {
  history: PropTypes.shape().isRequired,
  validRegEmail: PropTypes.bool.isRequired,
  validRegName: PropTypes.bool.isRequired,
  validRegPass: PropTypes.bool.isRequired,
  dispatchRegName: PropTypes.func.isRequired,
  dispatchRegPass: PropTypes.func.isRequired,
  dispatchRegEmail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDiv);
