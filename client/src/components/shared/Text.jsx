import React from 'react'
import './fonts.css'

export const HeaderTextFontMain = ({size = 30, overrides, children}) => {

    return(
        <div style={{color:'white',...overrides, fontSize:size, fontFamily:'Orbitron'}}>
            {children}
        </div>
    )
}

export const SubTextFontMain = ({size = 20, overrides, children}) => {

    return(
        <div style={{color:'white',...overrides, fontSize:size, fontFamily:'Orbitron'}}>
            {children}
        </div>
    )
}

export const HeaderTextFontNormal = ({size = 24, overrides, children}) => {

    return(
        <div style={{color:'white',...overrides, fontSize:size, fontFamily:'Chakra Petch'}}>
            {children}
        </div>
    )
}

export const SubTextFontNormal = ({size = 20, overrides, children}) => {

    return(
        <div style={{color:'white',...overrides, fontSize:size,fontFamily:'Chakra Petch'}}>
            {children}
        </div>
    )
}