import { GridWrapper } from "components/shared/Grid";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuBar from './components/MenuBar'
import { MoralisStore } from "context/MoralisStore";

import Background from './assets/background.jpg'

const App = ({ isServerInfo }) => {

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, authenticate, account, user } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div style={{backgroundImage:`url(${Background})`, height:'100vh', width:'100%', padding:'0px', margin:'0px'}}>
      <MoralisStore.Provider value={{isWeb3EnableLoading, isWeb3Enabled, enableWeb3, isAuthenticated, authenticate, account, user}}>
        <Router>
          <GridWrapper>
            <MenuBar/>
          </GridWrapper>
        </Router>
      </MoralisStore.Provider>
    </div>
  );  
  
};


export default App;
