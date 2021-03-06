import React, { useRef, useState, useEffect } from 'react';

import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import { IconButton, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'

const Map = ({
    viewportWidth,
    viewportHeight,
    centerLongitude,
    centerLatitude,
    shareMap,
}) => {

    const [
        ,
        hashLayer,
        hashLongitude,
        hashLatitude,
        hashZoom,
    ] = window.location.hash.split('/')

    const [zoom, setZoom] = useState(hashZoom ? Number(hashZoom) : 7)
    const [map, setMap] = useState(null)
    const mapContainerRef = useRef(null)
    const [center, setCenter] = useState({
        lng: hashLongitude ? Number(hashLongitude) : centerLongitude, 
        lat: hashLatitude ? Number(hashLatitude) : centerLatitude,
    })

    const zoomIn = () => {
        if (map) {
            map.setZoom(zoom + 1)
            setZoom(zoom + 1)
        }
    }

    const zoomOut = () => {
        if (map) {
            map.setZoom(zoom - 1)
            setZoom(zoom - 1)
        }
    }

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
            center: center,
            zoom: zoom,
            attributionControl: false,
        })

        const scale = new maplibregl.ScaleControl({
            maxWidth: 80,
            unit: 'metric'
        })
        map.addControl(scale)

        map.dragRotate.disable()
        map.touchZoomRotate.disableRotation()

        map.on('move', () => {
            setCenter(map.getCenter())
            setZoom(map.getZoom())
        })

        map.on('load', () => {
            map.resize()
        })

        setMap(map)
        shareMap(map)
    }, [])

    useEffect(() => {
        if (map) {
            map.resize()
        }
    }, [viewportWidth, viewportHeight])

    useEffect(() => {
        const [
            ,
            hashLayer
        ] = window.location.hash.split('/')
        const newHash = `#/${hashLayer}/${center.lng.toFixed(6)}/${center.lat.toFixed(6)}/${zoom.toFixed(1)}/`
        window.history.replaceState(undefined, undefined, newHash)
    
    }, [center, zoom])

    return (
        <div>
            <div
                ref={mapContainerRef}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                }}
            />

            <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                padding: 10
            }}>
                <Box display="flex" flexDirection="column">
                    <Tooltip title="Zoom In" placement="left">
                        <IconButton onClick={zoomIn}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom Out" placement="left">
                        <IconButton onClick={zoomOut}>
                            <RemoveIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </div>

            <div style={{
                position: 'absolute',
                right: 0,
                bottom: 0
            }}>
                <Box display="flex" justifyContent="flex-end" mx={1} color="text.secondary">
                    <Typography style={{ fontSize: 12 }}>
                        <Link color="inherit" href="https://www.geo.admin.ch/">©swisstopo </Link>
                    </Typography>
                </Box>
            </div>
        </div>
    )

}

export default Map