import {useState,useEffect} from 'react'
import { ethers } from 'ethers'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'

const localnetId = 31337
const testnetId = 43113
const liveId = 43114
const envChain = testnetId

const useEthers = () => {

    const [firstRender, setFirstRender] = useState(true)
    const [chain, setChain] = useState(false)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [address, setAddress] = useState(null)

    const {enableWeb3, authenticate} = useMoralis()

    const connectWallet = async () => {
        try{
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAddress(accounts[0]);
            setProvider(new ethers.providers.Web3Provider(window.ethereum, "any"))
            authenticate()
        }catch(e){
            //toast("Error connecting to wallet, please install metamask", {type:'warning', autoClose:'10000'})
        }
    }

    useEffect(() => {
        try{
            window.ethereum.on('accountsChanged', async (event, accounts) =>  {
                setAddress(accounts)
                window.location.reload()
            })
              
            window.ethereum.on('chainChanged', function (networkId) {
                let id = parseInt(networkId.toString())
                if(id !== envChain){
                    setChain(false)
                }else{
                    setChain(true)
                }
            })
        }catch(e){
            toast("Error connecting to blockchain, please install metamask", {type:'warning', autoClose:'10000'})
        }
        try{
            enableWeb3()
            authenticate()
            connectWallet()
            setFirstRender(false)
        }catch(e){
            toast("Error connecting to blockchain, please install metamask", {type:'warning', autoClose:'10000'})
        }
    },[])

    useEffect(() => {
        const setProviderFunc = async () => {
            let {chainId} = await provider.getNetwork()
            if(chainId !== envChain) setChain(false)
            else{setChain(true)}
            await provider.send("eth_requestAccounts", [])
            setSigner(provider.getSigner())
        }
        if(provider) setProviderFunc()
    },[provider])
    
    useEffect(() => {
        const setSignerFunc = async () => {
            setAddress(await signer.getAddress())
        }
        if(signer) setSignerFunc()
    },[signer])

    return {
        connectWallet,
        address,
        chain
    }
}

export default useEthers