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

import Background1 from './assets/background.jpg'
import Background2 from './assets/background2.jpg'
import Background3 from './assets/background3.jpg'
import Background4 from './assets/background4.jpg'
import Background5 from './assets/background5.jpg'

import 'react-toastify/dist/ReactToastify.css';

const images = [Background1,Background2, Background3, Background4, Background5]

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
  const [img, setimg] = useState(null)

  useEffect(() => {
    let num = Math.floor(Math.random() * 5);
    setimg(images[num])
  },[])

  return (
    <div style={{backgroundColor:'black', backgroundImage:`url(${img})`, backgroundSize:'cover', height:'100vh', overflow:'hidden', maxHeight:windowSize.height, width:'100%', padding:'0px', margin:'0px'}}>
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
