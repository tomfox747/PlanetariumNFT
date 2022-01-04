import React from 'react'

export const GridWrapper = ({children, overrides}) => {

    return(
        <div style={{flex:1, height:'100%',...overrides}}>
            {children}
        </div>
    )
}

export const Row = ({children, overrides}) => {

    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flex:1, height:'100%', ...overrides}}>
            {children}
        </div>
    )
}

export const Col = ({children, overrides, width}) => {

    return(
        <div style={{display:'flex', flex:width, justifyContent:'center', alignItems:'center', flexDirection:'column', ...overrides}}>
            {children}
        </div>
    )
} 