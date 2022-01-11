import {useState, useEffect} from 'react'
import {ethers} from 'ethers'

import {addresses} from '../contracts/contractAddresses'

import GalaxyMarketPlace from 'contracts/abis/GalaxyMarketplace'
import GalaxyNFT from 'contracts/abis/GalaxyNFT'

// get the contracts and build the functions
const useContracts = () => {

    const [galaxyMarketplaceContract, setGalaxyMarketplaceContract] = useState(null)
    const [galaxyNFT, setGalaxyNFT] = useState(null)

    useEffect(() => {

        const buildContracts = () => {
            let contract = new ethers.Contract(addresses.GalaxyMarketplace, GalaxyMarketPlace.abi)
            setGalaxyMarketplaceContract(contract)

            contract = new ethers.Contract(addresses.Galaxy, GalaxyNFT.abi)
            let functions = {
                create: async () => {await contract.functions.createToken()},
                setTokenSaleState:async (tokenId, state) => {await contract.functions.setTokenSaleState(tokenId, state)},
                setTokenPrice:async (tokenId, price) => {await contract.functions.setTokenPrice(tokenId, price)},
                purchaseToken:async (tokenId) => {await contract.functions.purchaseToken(tokenId)},
                getMetaData:async () => {await contract.functions.getMetaData()},
                getfTokenState:async (tokenId) => {await contract.functions.getTokenState(tokenId)},
                getMaxSupply:async () => {await contract.functions.getMaxSupply()},
                getInitialPrice:async () => {await contract.functions.getInitialPrice()},
                getNumberForSale:async () => {await contract.functions.getNumberForSale()},
                getAllTokens:async () => {await contract.functions.getAllTokens()}
            }
            setGalaxyNFT({functions:functions})
        }
        buildContracts()
    },[])

    return{
        galaxyMarketplaceContract,
        galaxyNFT
    }
}

export default useContracts