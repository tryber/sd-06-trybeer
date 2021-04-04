import React from 'react';
import proptypes from 'prop-types';

const PaperContainer = (props) => {
  const { children, testid = '', title = '' } = props;

  return (
    <div
      className="w-full rounded-md overflow-hidden bg-white relative"
    >
      <div className="w-full h-2 bg-primary-dark" />
      <div
        className="w-full h-10 bg-primary flex items-center text-white text-xl font-bold p-2"
        data-testid={ testid }
      >
        { title }
      </div>
      <div className="w-full p-2">
        { children }
      </div>
    </div>
  );
};
PaperContainer.propTypes = {
  children: proptypes.node.isRequired,
};
export default PaperContainer;
