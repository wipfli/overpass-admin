import React, { useRef, useState, useEffect } from 'react';

import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import { IconButton, Typography } from '@material-ui/core'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'

import style from './style'

const Map = ({
    viewportWidth,
    viewportHeight,
    centerLongitude,
    centerLatitude,
    shareMap,
}) => {

    const [zoom, setZoom] = useState(6)
    const [map, setMap] = useState(null)
    const mapContainerRef = useRef(null)

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
            style: style,
            center: [centerLongitude, centerLatitude],
            zoom: zoom,
            attributionControl: false
        })

        const scale = new maplibregl.ScaleControl({
            maxWidth: 80,
            unit: 'metric'
        })
        map.addControl(scale)

        map.dragRotate.disable()
        map.touchZoomRotate.disableRotation()

        map.on('move', () => {
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

    return (
        <div>
            <div
                ref={mapContainerRef}
                style={{
                    position: 'absolute',
                    width: (viewportWidth - 1),
                    height: (viewportHeight - 1),
                    overflow: 'hidden'
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
                        <Link color="inherit" href="https://www.openstreetmap.org/about/">©OpenStreetMap </Link>
                        <Link color="inherit" href="https://www.geo.admin.ch/">©swisstopo </Link>
                    </Typography>
                </Box>
            </div>
        </div>
    )

}

export default Map