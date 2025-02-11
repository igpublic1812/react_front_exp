import React from 'react';

const ConfirmationDialog = ({ isOpen, onCancel, onConfirm, message }) => {
  console.log ("isOpen"+isOpen);



  if (!isOpen) {
    return null;
  }

  return (
   <div>
    {message}
    <button onClick={onCancel}>No</button>
    <button onClick={onConfirm}>Yes</button>
    </div>
  );
};

export default ConfirmationDialog;