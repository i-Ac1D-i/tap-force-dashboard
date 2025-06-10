import React from 'react';
import './styles/App.css';
//import { motion } from 'motion/react'
import { useContext } from 'react';
import { AccountContext } from './context/AccountContext';
import UploadButton from './components/Button/UploadButton';
import AccountOverview from './widgets/AccountOverview';
import { getHeroById } from './utils/heroUtils';
import UpcomingSummons from './widgets/UpcomingSummons/UpcomingSummons';
import DragonShards from './widgets/DragonShards/DragonShards';
import Mutagens from './widgets/Mutagens/Mutagens';

function App() {
  console.log(getHeroById(1));
  const { accountData } = useContext(AccountContext);
  return (

    <div className="App">
      {/*       <header className="App-header">
        About
      </header> */}
      <main className="App-main">
        {accountData != null ? (
          <div className="account-data">
            <div className="dashboard">
              <AccountOverview />
              <UpcomingSummons />
              <DragonShards />
              <Mutagens />
            </div>
          </div>
        ) : (<>
          <h1 className="title">Welcome to Stats Force!</h1>
          <p className="description">
            Upload your JSON file to get started.
          </p>
          <UploadButton />
        </>)}

      </main>
    </div>

  );
}

export default App;