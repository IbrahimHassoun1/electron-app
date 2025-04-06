import React, { createContext } from 'react'

export const MyContext = createContext({})


const MyContextProvider = ({children}) => {

    const values = {
        
    }

    return(
    <MyContext.Provider value={values}>
        {children}
    </MyContext.Provider>
    )
}

export default MyContextProvider