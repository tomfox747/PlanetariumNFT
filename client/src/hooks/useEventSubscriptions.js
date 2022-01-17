import { useMoralisSubscription } from 'react-moralis'
import { toast } from 'react-toastify';

const useEventSubscriptions = (account) => {

    //Mint events
    useMoralisSubscription("NFTmilkyway", q => q.equalTo("sender", account), [], {onCreate: () => toast("Your NFT was successfully minted", {type:'success'})})
}

export default useEventSubscriptions