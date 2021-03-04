import React, { useState, useEffect } from 'react'

import Map from './Map'
import Select from './Select'

const App = () => {

    const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    const [map, setMap] = useState(null)

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight)
            setViewportWidth(document.getElementById('root').clientWidth)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div>
            <Map
                viewportWidth={viewportWidth}
                viewportHeight={viewportHeight}
                centerLongitude={8.55301}
                centerLatitude={47.35257}
                shareMap={setMap}
            />
            <Select map={map} />
        </div>
    )
}

export default App