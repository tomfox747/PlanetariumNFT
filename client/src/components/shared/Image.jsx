import React from 'react'

import Background from '../../assets/background.jpg'
import AVAX from '../../assets/avax.png'
import Logo from '../../assets/logo.png'
import MetaMask from '../../assets/metamask.png'
import ViewIcon from '../../assets/view.png'
import Arrow from '../../assets/arrow.png'

import MilkyWay from '../../assets/Galaxies/milkyway.jpg'
import Andromeda from '../../assets/Galaxies/andromeda.jpg'
import Messier83 from '../../assets/Galaxies/messier83.jpg'

import Arcturus from '../../assets/Stars/arcturus.jpg'
import Formalhaut from '../../assets/Stars/formalhaut.jpg'
import Betelgeuse from '../../assets/Stars/betelgeuse.jpg'

import Saturn from '../../assets/planets/Saturn.jpg'
import Mars from '../../assets/planets/mars.jpg'
import Earth from '../../assets/planets/earth.jpg'

const mapping  = {
    'background':Background,
    'avax': AVAX,
    'logo': Logo,
    'metaMask': MetaMask,
    'viewIcon': ViewIcon,
    'milkyway': MilkyWay,
    'andromeda': Andromeda,
    'messier83': Messier83,
    'arcturus':Arcturus,
    'formalhaut':Formalhaut,
    'betelgeuse':Betelgeuse,
    'saturn': Saturn,
    'mars': Mars,
    'earth': Earth,
    'arrow': Arrow,
}

const ImageWrapper = ({overrides, width, imageName}) => {

    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%', height:'100%',...overrides}}>
            <img alt='not found' src={mapping[imageName]} style={{width:width}}/>
        </div>
    )
}

export default ImageWrapper