import React from 'react'

export const GridWrapper = ({children, overrides}) => {

    return(
        <div style={{display: 'flex', flexDirection:'column', flex:'1', width:'100%', ...overrides}}>
            {children}
        </div>
    )
}

export const Row = ({children, overrides}) => {

    return(
        <div style={{flex:'1', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'100%', ...overrides}}>
            {children}
        </div>
    )
}

export const Col = ({children, overrides, width}) => {

    return(
        <div style={{flex: width, display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', alignItems:'center', ...overrides}}>
            {children}
        </div>
    )
} 