import React, { useState, useEffect } from 'react';

import axios from 'axios'
import buildUrl from 'build-url'

import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MaterialUISelect from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

const prefix = ''

const Select = ({ map, viewportHeight, viewportWidth }) => {
    const [layer, setLayer] = useState('loading...')
    const [layers, setLayers] = useState(['loading...'])
    const [snack, setSnack] = useState(null)

    const [properties, setProperties] = useState(null)

    const handleChange = e => {
        setLayer(e.target.value)
    }

    useEffect(() => {
        axios.get(`${prefix}/layers`)
            .then(res => {
                const sortedLayers = res.data.sort()
                setLayers(sortedLayers)
                setLayer(sortedLayers[0])
            })
            .catch(err => console.log(err))
    }, [])

    const getQueryUrl = () => {
        if (!map) {
            return ''
        }
        const [
            [
                longitude0,
                latitude0
            ],
            [
                longitude1,
                latitude1
            ]
        ] = map.getBounds().toArray()
        const url = buildUrl(`${prefix}/query`, {
            queryParams: {
                layer: layer,
                longitude0: longitude0,
                latitude0: latitude0,
                longitude1: longitude1,
                latitude1: latitude1,
            }
        })
        return url
    }

    const load = () => {
        setSnack('loading...')
        setProperties(null)
        axios.get(getQueryUrl())
            .then(res => {
                if (res.data.features.length > 0) {
                    setSnack(`Loaded ${res.data.features.length} features.`)
                }
                else {
                    setSnack('Found no features.')
                }

                if (!map.getSource('my-overlay')) {
                    map.addSource('my-overlay', {
                        type: 'geojson',
                        data: res.data,
                    })
                    map.addLayer({
                        'id': 'my-overlay-fill',
                        'source': 'my-overlay',
                        'type': 'fill',
                        'paint': {
                            'fill-color': '#3498db',
                            'fill-opacity': 0.5
                        }
                    })
                    map.addLayer({
                        'id': 'my-overlay-line',
                        'source': 'my-overlay',
                        'type': 'line',
                        'paint': {
                            'line-color': '#2980b9',
                            'line-width': 2,
                            'line-opacity': 0.5
                        }
                    })
                    map.addLayer({
                        'filter': [
                            '==',
                            '$type',
                            'Point'
                        ],
                        'id': 'my-overlay-point',
                        'source': 'my-overlay',
                        'type': 'circle',
                        'paint': {
                            'circle-radius': 8,
                            'circle-color': '#2980b9',
                            'circle-opacity': 0.5,
                        }
                    })
                    map.on('click', 'my-overlay-fill', e => {
                        setProperties(e.features[0].properties)
                    })
                    map.on('click', 'my-overlay-line', e => {
                        setProperties(e.features[0].properties)
                    })
                    map.on('click', 'my-overlay-point', e => {
                        setProperties(e.features[0].properties)
                    })
                }
                else {
                    map.getSource('my-overlay').setData(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div style={{
            position: 'absolute',
            left: 0,
            top: 0
        }}>
            <Box m={1} p={1}>

                <Paper>
                    <Box m={1} p={1}>
                        <FormControl>
                            <InputLabel>Layer</InputLabel>
                            <MaterialUISelect
                                value={layer}
                                onChange={handleChange}
                            >
                                {layers.map((layerName, index) => {
                                    return <MenuItem value={layerName} key={index.toString()}>{layerName}</MenuItem>
                                })}
                            </MaterialUISelect>
                        </FormControl>

                    </Box>
                </Paper>
                <Box my={1} display="flex" flexDirection="row">
                    <Box>
                        <Button variant="contained" color="primary" onClick={load}>
                            Show
                        </Button>
                    </Box>
                    <Box mx={1}>
                        <Button variant="contained" color="primary" onClick={() => {
                            window.open(getQueryUrl())
                        }}>
                            GeoJSON
                        </Button>
                    </Box>
                </Box>
                {properties && <Paper>
                    <Box m={1} p={1}>
                        <IconButton onClick={() => setProperties(null)}>
                            <CloseIcon />
                        </IconButton>
                        <Box style={{
                            width: Math.min(viewportWidth * 0.75, 340),
                            maxHeight: (viewportHeight * 0.5),
                            overflow: 'auto',
                        }}>
                            <List>
                                {Object.keys(properties).map((key, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={properties[key]}
                                                secondary={key}
                                            />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Box>

                    </Box>
                </Paper>}
            </Box>
            <Snackbar
                open={Boolean(snack)}
                autoHideDuration={5000}
                onClose={() => setSnack(null)}
                message={snack}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                action={
                    <IconButton color="inherit" onClick={() => setSnack(null)}>
                        <CloseIcon />
                    </IconButton>
                }
            />
        </div>
    )

}

export default Select