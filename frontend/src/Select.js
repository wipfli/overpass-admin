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

const Select = ({ map }) => {
    const [layer, setLayer] = useState('loading...')
    const [layers, setLayers] = useState(['loading...'])

    const handleChange = e => {
        setLayer(e.target.value)
    }

    useEffect(() => {
        axios.get('http://loki.lab:15151/layers')
            .then(res => {
                setLayers(res.data)
                setLayer(res.data[0])
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
        const url = buildUrl('http://loki.lab:15151/query', {
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
        
        axios.get(getQueryUrl())
            .then(res => {
                if (!map.getSource('my-overlay')) {
                    map.addSource('my-overlay', {
                        type: 'geojson',
                        data: res.data,
                    })
                    map.addLayer({
                        'id': 'my-overlay',
                        'source': 'my-overlay',
                        'type': 'fill',
                        'paint': {
                            'fill-color': '#a61662',
                            'fill-opacity': 0.5
                        }
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
                            Download
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )

}

export default Select