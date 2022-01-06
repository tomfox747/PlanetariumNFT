import React from 'react'

import Background from '../../assets/background.jpg'
import AVAX from '../../assets/avax.png'
import Logo from '../../assets/logo.png'
import MetaMask from '../../assets/metamask.png'
import ViewIcon from '../../assets/view.png'
import Arrow from '../../assets/arrow.png'

import Saturn from '../../assets/planets/Saturn.jpg'
import Mars from '../../assets/planets/mars.jpg'
import Earth from '../../assets/planets/earth.jpg'

const mapping  = {
    'background':Background,
    'avax': AVAX,
    'logo': Logo,
    'metaMask': MetaMask,
    'viewIcon': ViewIcon,
    'saturn': Saturn,
    'mars': Mars,
    'earth': Earth,
    'arrow': Arrow
}

const ImageWrapper = ({overrides, width, imageName}) => {

    return(<div style={{width:'100%', height:'100%',...overrides}}><img src={mapping[imageName]} style={{width:width}}/></div>)
}

export default ImageWrapper