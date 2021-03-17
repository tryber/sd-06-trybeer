import React from 'react';
import proptypes from 'prop-types';

const BodyContainer = (props) => {
  const { children } = props;
  return (
    <div
      className="flex items-center justify-center w-full min-h-screen bg-app-background"
    >
      { children }
    </div>
  );
};

BodyContainer.propTypes = {
  children: proptypes.node.isRequired,
};

export default BodyContainer;
