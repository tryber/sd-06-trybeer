import React from 'react';
import PropTypes from 'prop-types';
import PaperContainer from '../../../design-system/containers/PaperContainer'

const RemoveConfirmation = ({ item, open, setOpen, handleRemove }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { name, photo } = item;

  const handleConfirmation = (value) => {
    if (value) handleRemove(value);
    setOpen(false);
  };

  const customTitle =  `Attention ${user.name}!!!` 

  return (
    <div
      className={ `${open ? '' : 'hidden'} w-full h-full absolute left-0 top-0
      rounded-md bg-gray-400 bg-opacity-70 z-10 flex items-center justify-center` }
    >
      <div
        className="bg-white min-w-min max-w-1/2 absolute rounded-md
          flex flex-col z-20 space-y-10"
      >
        <PaperContainer title={customTitle }>

        <div className="flex items-center space-x-2">
          <p>{ `Do you really want to remove ${name} ?` }</p>
          <img
            src={ photo }
            className="round-md object-contain
              w-8 h-8 md:w-10 md:h-10 md:object-scale-down"
            alt={ name }
          />
        </div>
        <div className="flex items-center justify-end space-x-3 mt-20">
          <button
            type="button"
            onClick={ () => handleConfirmation(false) }
            className="bg-secondary p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={ () => handleConfirmation(true) }
            className="bg-gray-200 p-2 rounded-md"
          >
            Remove
          </button>
        </div>
        </PaperContainer>

      </div>
    </div>
  );
};

RemoveConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default RemoveConfirmation;
