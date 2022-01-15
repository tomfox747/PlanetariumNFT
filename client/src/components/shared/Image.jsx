import React,{useState} from 'react'
import { PuffLoader } from 'react-spinners'

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

import TheMoon from '../../assets/moon/moon.jpg'
import Phobos from '../../assets/moon/phobos.jpg'
import Titan from '../../assets/moon/titan.jpeg'

import Orion from '../../assets/Constellations/orionthehunter.jpg'
import Capricornus from '../../assets/Constellations/capricornus.jpg'
import Scorpius from '../../assets/Constellations/Scorpius.jpg'

import HalleysComet from '../../assets/Other/halleyscomet.jpg'
import Omuamua from '../../assets/Other/oumuamua.jpg'
import Holmberg15a from '../../assets/Other/holmberg15a.jpg'

const mapping  = {
    'background':Background,
    'avax': AVAX,
    'logo': Logo,
    'metaMask': MetaMask,
    'viewIcon': ViewIcon,
    'arrow': Arrow,
    'milkyway': MilkyWay,
    'andromeda': Andromeda,
    'messier83': Messier83,
    'arcturus':Arcturus,
    'formalhaut':Formalhaut,
    'betelgeuse':Betelgeuse,
    'saturn': Saturn,
    'mars': Mars,
    'earth': Earth,
    'moon': TheMoon,
    'titan': Titan,
    'phobos': Phobos,
    'orion': Orion,
    'capricornus': Capricornus,
    'scorpius': Scorpius,
    'oumuamua': Omuamua,
    'halleyscomet': HalleysComet,
    'holmberg15a': Holmberg15a,
}

const ImageWrapper = ({overrides, width, imageName, maxHeight}) => {

    const [loading, setLoading] = useState(true)

    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%', height:'100%',...overrides}}>
            {loading && <PuffLoader color={'#ffffff'} size={width}/>}
            <img src={mapping[imageName]} style={{width:width, height: loading === true ? '0px' : 'auto', maxHeight:maxHeight}} onLoad={() => setLoading(false)}/>
        </div>
    )
}

export default ImageWrapper