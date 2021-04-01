import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HamburgerMenu from 'react-hamburger-menu';
import SideMenu from './SideMenu';
import '../styles/components/TopBar.css';

const TopBar = ({ text, sideMenuOptions, isAdmin }) => {
  const [visibleSide, setVisibleSide] = useState(false);

  return (
    <div>
      <div className="topBar">
        { !isAdmin ? (
          <div>
            <div className="topTitleContainer">
              <h1 data-testid="top-title">
                { text }
              </h1>
            </div>
            <div className={ visibleSide ? 'sideMenuOn' : 'sideMenuOff' }>
              <div className="hamburguerContainer">
                <button
                  data-testid="top-hamburguer"
                  type="button"
                >
                  <HamburgerMenu
                    isOpen={ visibleSide }
                    menuClicked={ () => setVisibleSide(!visibleSide) }
                    width={ 40 }
                    height={ 35 }
                    strokeWidth={ 1 }
                    rotate={ 0 }
                    color="white"
                    borderRadius={ 0 }
                    animationDuration={ 0.5 }
                  />
                </button>
              </div>
              { visibleSide && <SideMenu menuOptions={ sideMenuOptions } /> }
            </div>
          </div>
        ) : (
          <div>
            <h1 data-testid="top-title">
              { text }
            </h1>
            <SideMenu menuOptions={ sideMenuOptions } />
          </div>
        )}
      </div>
      <div className="topBarMargin" />
    </div>
  );
};

TopBar.defaultProps = { isAdmin: false };

TopBar.propTypes = {
  text: PropTypes.string.isRequired,
  sideMenuOptions: PropTypes.instanceOf(Object).isRequired,
  isAdmin: PropTypes.bool,
};

export default TopBar;
