import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { profileName } from '../actions';
import defaultProfile from '../img/profile.png';
import SideBarAdmin from '../components/SideBarAdmin';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return (
      <div className="profile-container">
       <SideBarAdmin />
        <div className="inputs-div">
          <img src={ defaultProfile } alt="profile" />
          <input name="name" placeholder="Name" data-testid="profile-name" onChange={ this.handleChange } />
          <input placeholder="Email" data-testid="profile-email" readOnly />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateProfileName: state.login.profileName,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchName: (name) => dispatch(profileName(name)),
});

Profile.propTypes = {
  dispatchName: PropTypes.func.isRequired,
  stateProfileName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
