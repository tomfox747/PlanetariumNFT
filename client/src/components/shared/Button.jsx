import React, {useState} from 'react'
import { HeaderTextFontNormal } from './Text'

const Button = ({func, params, text, overrides}) => {

    const [hover, setHover] = useState(false)   

    return(
        <div 
            style={{paddingLeft:'10px', paddingRight:'10px', display:'flex', justifyContent:'center', alignItems:'center', width:'180px', height:'40px', backgroundColor:'#6E76E5',borderRadius:'5px'}} 
            onClick={() => func()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        >
            <HeaderTextFontNormal size={'20px'}>
                {text}  
            </HeaderTextFontNormal>
        </div>
    )
}

export default Button