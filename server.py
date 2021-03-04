from fastapi import FastAPI
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
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

def do_query(layers, layer, longitude0, latitude0, longitude1, latitude1):
    bbox = get_bbox(longitude0, latitude0, longitude1, latitude1)
    if layer not in layers:
        return None
    selection = select(layers[layer], bbox)
    return selection.to_json()

def get_layer_names(folder):
    return [g.split('/')[-1] for g in glob.glob(folder + '/*')]

def find_file(layer_name, folder):
    files = glob.glob(folder + layer_name + '/*.gpkg')
    if len(files) > 0:
        return files[0]
    files = glob.glob(folder + layer_name + '/*LV95*/*.shp')
    if len(files) > 0:
        return files[0]
    files = glob.glob(folder + layer_name + '/*.shp')
    if len(files) > 0:
        return files[0]
    files = glob.glob(folder + layer_name + '/*.json')
    if len(files) > 0:
        return files[0]
    return None

layers = {}

folder = './shapefiles/'
layer_names = get_layer_names(folder)
for layer_name in layer_names:
    filename = find_file(layer_name, folder)
    if filename:
        print('reading layer', layer_name)
        try:
            layers[layer_name] = read_shp(filename)
        except ValueError:
            print(f'error, skipping {layer_name}')
    else:
        print('format unknown, skipping', layer_name)

print('skipped in total', (len(layer_names) - len(layers)), 'layers')
print('loaded in total', len(layers), 'layers')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/layers')
async def layer_names():
    return [layer for layer in layers]

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

app.mount('/', StaticFiles(directory='frontend/build', html=True), name='frontend')

uvicorn.run(app, host='0.0.0.0', port=8000)
