// src/components/UploadButton.js
import React, { useContext, useEffect, useState } from 'react';
import useJsonUpload from '../../hooks/useJsonUpload';
import { AccountContext } from '../../context/AccountContext';

function UploadButton() {
  const { data, FileInput, openFileDialog } = useJsonUpload();
  const { setAccountData } = useContext(AccountContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (data) {
      let accountData = data;
      if (accountData.data && typeof accountData.data === 'object') {
        accountData = accountData.data;
      } else if (accountData.InfoResultPayload && typeof accountData.InfoResultPayload === 'object') {
        accountData = accountData.InfoResultPayload;
      } else {
        console.error('Invalid account data format:', accountData);
        setErrorMessage('Invalid account data format. Please upload a valid JSON file.');
        return;
      }
      setAccountData(data);
      setErrorMessage(''); // clear any previous error
    }
  }, [data, setAccountData]);

  return (
    <div className="upload-container">
      <button className="upload-button" onClick={openFileDialog}>
        Upload JSON
      </button>
      <FileInput />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UploadButton;
