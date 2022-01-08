import { GridWrapper } from "components/shared/Grid";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from './components/MenuBar'
import { MoralisStore } from "context/MoralisStore";
import { WindowSizeStore } from "context/WindowSizeStore";

import Background from './assets/background.jpg'

const getWindowDimensions = () => {
  const{innerWidth: width, innerHeight:height} = window;
  return{width, height}
}

const useWindowSize = () => {

  const [windowSize, setWindowSize] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {setWindowSize(getWindowDimensions())}
    window.addEventListener('resize', handleResize)
  },[])

  return {windowSize}
}

const App = ({ isServerInfo }) => {

  const {windowSize} = useWindowSize()
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, authenticate, account, user } = useMoralis();
  //const {galaxyMarketplaceContract, galaxyNFT_milkywayContract} = useContracts()

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled, enableWeb3, isWeb3EnableLoading]);

  return (
    <div style={{backgroundColor:'black', backgroundImage:`url(${Background})`, height:'100vh', overflow:'hidden', maxHeight:windowSize.height, width:'100%', padding:'0px', margin:'0px'}}>
      <WindowSizeStore.Provider value={{windowSize}}>
        <MoralisStore.Provider value={{isWeb3EnableLoading, isWeb3Enabled, enableWeb3, isAuthenticated, authenticate, account, user}}>
          <Router>
            <GridWrapper>
              <MenuBar/>
            </GridWrapper>
          </Router>
        </MoralisStore.Provider>
      </WindowSizeStore.Provider>
    </div>
  );  
  
};


export default App;
