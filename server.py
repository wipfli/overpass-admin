from fastapi import FastAPI
from fastapi.responses import Response
import uvicorn
import shapely
from shapely.geometry import Point, Polygon
import os
import geopandas as gpd
from geopandas.tools import sjoin
import glob
import json


def read_shp(filename):
    gdf = gpd.read_file(filename)
    return gdf.to_crs('EPSG:4326')

def select(gdf, bbox):
    bbox_polygon = shapely.geometry.box(*bbox, ccw=True)
    bbox_gdf = gpd.GeoDataFrame(gpd.GeoSeries(bbox_polygon), 
                                columns=['geometry'], crs='EPSG:4326')
    return sjoin(gdf, bbox_gdf, how='inner', op='intersects')

def get_bbox(longitude0, latitude0, longitude1, latitude1):
    return (longitude0, latitude0, longitude1, latitude1)

def get_name(filename):
    return os.path.basename(filename).split('.')[0]

def get_layer_names(layers):
    return [layer for layer in layers]

def do_query(layers, layer, longitude0, latitude0, longitude1, latitude1):
    bbox = get_bbox(longitude0, latitude0, longitude1, latitude1)
    if layer not in layers:
        return None
    selection = select(layers[layer], bbox)
    return selection.to_json()

def get_filenames(folder):
    return glob.glob(folder + '*.shp')

layers = {}

folder = './shapefiles/'
for filename in get_filenames(folder):
    layers[get_name(filename)] = read_shp(filename)

app = FastAPI()

@app.get('/')
async def root():
    return {'message': 'Hello World'}

@app.get('/layers')
async def layer_names():
    return get_layer_names(layers)

@app.get('/query')
async def query(
    layer: str, 
    longitude0: float, 
    latitude0: float, 
    longitude1: float, 
    latitude1: float
):
    return Response(
        content=do_query(
            layers, 
            layer, 
            longitude0, 
            latitude0, 
            longitude1, 
            latitude1
        ),
        media_type='application/json'
    )


uvicorn.run(app, host='0.0.0.0', port=15151)
