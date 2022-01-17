import { GridWrapper } from "components/shared/Grid";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from './components/MenuBar'
import { EthersStore } from "context/EthersStore";
import { WindowSizeStore } from "context/WindowSizeStore";
import { MarketplaceStore } from "context/MarketplaceStore";
import useEthers from "hooks/useEthers";
import { ToastContainer } from 'react-toastify';

import GalaxyNFT from './contracts/abis/GalaxyNFT'

import Background from './assets/background.jpg'
import useEventSubscriptions from "hooks/useEventSubscriptions";

import 'react-toastify/dist/ReactToastify.css';

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
  const {connectWallet, address, chain} = useEthers()
  const [currentMarketplace, setCurrentMarketplace] = useState({GalaxyNFT})

  return (
    <div style={{backgroundColor:'black', backgroundImage:`url(${Background})`, height:'100vh', overflow:'hidden', maxHeight:windowSize.height, width:'100%', padding:'0px', margin:'0px'}}>
      <WindowSizeStore.Provider value={{windowSize}}>
        <EthersStore.Provider value={{connectWallet, address, chain}}>
          <MarketplaceStore.Provider value={{currentMarketplace, setCurrentMarketplace}}>
            <Router>
              <GridWrapper>
                <MenuBar/>
                <ToastContainer position="bottom-center" theme="dark"/>
              </GridWrapper>
            </Router>
          </MarketplaceStore.Provider>
        </EthersStore.Provider>
      </WindowSizeStore.Provider>
    </div>
  );  
  
};


export default App;
