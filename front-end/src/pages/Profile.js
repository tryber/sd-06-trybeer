import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { profileName } from '../actions';
import { Header } from '../components';
import defaultProfile from '../img/profile.png';
import { edit } from '../api';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { dispatchName } = this.props;
    const maxLength = 6;
    if (name === 'name') {
      if (value.length >= maxLength) {
        dispatchName(value);
      } else {
        dispatchName('');
      }
    }
  }

  async editUser({ target }) {
    const { stateActualUser } = this.props;
    console.log(stateActualUser.name);
    let nextName = target.parentNode.childNodes[1].value;
    const response = await edit(stateActualUser.name, nextName);
    if (response.data.message) {
      nextName = '';
      const spanMaxTime = 6000;
      const hiddenSpan = document.querySelector('.hidden-span');
      hiddenSpan.style.display = 'inline-block';
      hiddenSpan.innerText = response.data.message;
      setTimeout(() => {
        document.querySelector('.hidden-span').style.display = 'none';
      }, spanMaxTime);
    } else {
      return null;
    }
  }

  render() {
    const { history, stateProfileName } = this.props;
    const maxLength = 6;
    return (
      <div className="profile-container">
        <Header history={ history } />
        <div className="inputs-div">
          <img src={ defaultProfile } alt="profile" />
          <input
            name="name"
            data-testid="profile-name-input"
            placeholder="Name"
            onChange={ this.handleChange }
          />
          <span className="hidden-span">Atualização concluida com sucesso</span>
          <input placeholder="Email" readOnly data-testid="profile-email-input" />
          <button
            type="button"
            data-testid="profile-save-btn"
            disabled={ stateProfileName.length >= maxLength ? null : true }
            onClick={ this.editUser }
          >
            Salvar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateProfileName: state.login.profileName,
  stateActualUser: state.user.actualUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchName: (name) => dispatch(profileName(name)),
});

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchName: PropTypes.func.isRequired,
  stateProfileName: PropTypes.string.isRequired,
  stateActualUser: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
