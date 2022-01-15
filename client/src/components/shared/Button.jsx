import React, {useState} from 'react'
import { SubTextFontNormal } from './Text'

const Button = ({func, params, text, overrides, fontSize = '16px'}) => {

    const [hover, setHover] = useState(false)   

    return(
        <div 
            style={{paddingLeft:'10px', paddingRight:'10px', display:'flex', justifyContent:'center', alignItems:'center', width:'180px', height:'40px', backgroundColor:'#6E76E5',borderRadius:'5px', cursor: hover ? 'pointer' : 'default', ...overrides}} 
            onClick={() => func()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        >
            <SubTextFontNormal size={fontSize}>
                {text}  
            </SubTextFontNormal>
        </div>
    )
}

export default Button