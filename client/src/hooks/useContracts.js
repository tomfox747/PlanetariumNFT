import React,{useState, useEffect} from 'react'
import { useMoralis } from 'react-moralis'
import Ethers from 'ethers'

import addresses from '../contracts/contractAddresses'

import GalaxyMarketPlaceAbi from 'contracts/abis/GalaxyMarketplace.json'
import GalaxyNFT_MilkywayAbi from 'contracts/abis/GalaxyNFT_milkyway.json'

// get the contracts and build the functions
const useContracts = () => {

    const [galaxyMarketplaceContract, setGalaxyMarketplaceContract] = useState(null)
    const [galaxyNFT_milkywayContract, setGalaxyNFT_milkywayContract] = useState(null)

    useEffect(() => {

        const buildContracts = () => {
            
            let contract = new Ethers.Contract(addresses.GalaxyMarketplace, GalaxyMarketPlaceAbi)
            let functions = {
                create: async (nftAddress) => {await contract.functions.createNewGalaxy(nftAddress)},
                getAll: async () => {await contract.functions.getAllGalaxies()}
            }
            setGalaxyMarketplaceContract({functions: functions})

            contract = new Ethers.Contract(addresses.Galaxy_Milkyway, GalaxyNFT_MilkywayAbi)
            functions = {
                create: async () => {await contract.functions.createToken()},
                setTokenSaleState:async (tokenId, state) => {await contract.functions.setTokenSaleState(tokenId, state)},
                setTokenPrice:async (tokenId, price) => {await contract.functions.setTokenPrice(tokenId, price)},
                purchaseToken:async (tokenId) => {await contract.functions.purchaseToken(tokenId)},
                getMetaData:async () => {await contract.functions.getMetaData()},
                getTokenState:async (tokenId) => {await contract.functions.getTokenState(tokenId)},
                getMaxSupply:async () => {await contract.functions.getMaxSupply()},
                getInitialPrice:async () => {await contract.functions.getInitialPrice()},
                getNumberForSale:async () => {await contract.functions.getNumberForSale()},
                getAllTokens:async () => {await contract.functions.getAllTokens()}
            }
            setGalaxyNFT_milkywayContract({functions:functions})
        }
        buildContracts()
    })

    return{
        galaxyMarketplaceContract,
        galaxyNFT_milkywayContract
    }
}

export default useContracts