import React, { createContext, useEffect, useState } from 'react'


export const WindowSize = createContext(null)

const WindowContext = ({ children }) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    
    useEffect(() => {
        function setWindowWith() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', setWindowWith)

        return () => {
            window.removeEventListener('resize', setWindowSize)
        }

    }, [])


    return <WindowSize.Provider value={{ windowSize, setWindowSize }}>{children}</WindowSize.Provider>

}

export default WindowContext
