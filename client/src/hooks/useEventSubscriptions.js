import { useMoralisSubscription } from 'react-moralis'
import { toast } from 'react-toastify';

const useEventSubscriptions = (account) => {

    //Mint events
    useMoralisSubscription("MintedNFTmilkyway", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTmessier", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTandromeda", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTbetelguese", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTarcturus", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTformahaut", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTearth", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTmars", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTsaturn", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTthemoon", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTtitan", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTphobos", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTorion", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTcapricornus", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTscorpius", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFToumuamua", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFThalleyscomet", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
    useMoralisSubscription("MintedNFTholmberg", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
}

export default useEventSubscriptions