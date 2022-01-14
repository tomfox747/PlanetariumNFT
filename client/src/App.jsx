import { GridWrapper } from "components/shared/Grid";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisSubscription, useMoralisCloudFunction } from "react-moralis";
import { BrowserRouter as Router } from "react-router-dom";
import MenuBar from './components/MenuBar'
import { MoralisStore } from "context/MoralisStore";
import { EthersStore } from "context/EthersStore";
import { WindowSizeStore } from "context/WindowSizeStore";
import { MarketplaceStore } from "context/MarketplaceStore";
import useEthers from "hooks/useEthers";

import GalaxyNFT from './contracts/abis/GalaxyNFT'

import Background from './assets/background.jpg'
import { useContext } from "react/cjs/react.development";

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

  // useMoralisSubscription(
  //   "e_tokenMinted", q => q, [], {
  //     onCreate: () => alert("the galaxy token was minted")
  //   }
  // )

  return (
    <div style={{backgroundColor:'black', backgroundImage:`url(${Background})`, height:'100vh', overflow:'hidden', maxHeight:windowSize.height, width:'100%', padding:'0px', margin:'0px'}}>
      <WindowSizeStore.Provider value={{windowSize}}>
        <EthersStore.Provider value={{connectWallet, address, chain}}>
          <MarketplaceStore.Provider value={{currentMarketplace, setCurrentMarketplace}}>
            <Router>
              <GridWrapper>
                <MenuBar/>
              </GridWrapper>
            </Router>
          </MarketplaceStore.Provider>
        </EthersStore.Provider>
      </WindowSizeStore.Provider>
    </div>
  );  
  
};


export default App;
