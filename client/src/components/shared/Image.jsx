import React from 'react'

import Background from '../../assets/background.jpg'
import AVAX from '../../assets/avax.png'
import Logo from '../../assets/logo.png'
import MetaMask from '../../assets/metamask.png'
import ViewIcon from '../../assets/view.png'

const mapping  = {
    'background':Background,
    'avax': AVAX,
    'logo': Logo,
    'metaMask': MetaMask,
    'viewIcon': ViewIcon
}

const ImageWrapper = ({overrides, width, imageName}) => {

    return(<div style={{width:'100%', height:'100%'}}><img src={mapping[imageName]} style={{width:width}}/></div>)
}

export default ImageWrapper