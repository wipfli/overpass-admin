import requests
import os
import glob
import re


def scrap(data_zip_url, folder): 
    layer_name = data_zip_url.split('/')[-2] 
    filename = data_zip_url.split('/')[-1]
    cmd = f'wget {data_zip_url} -O {folder + filename}'
    os.system(cmd)
    cmd = f'mkdir -p {folder + layer_name}'
    os.system(cmd)
    cmd = f'unzip {folder + filename} -d {folder + layer_name}'
    os.system(cmd)
    cmd = f'rm {folder + filename}'
    os.system(cmd)

def get_online_layer_names():
    r = requests.get('https://data.geo.admin.ch/')
    layers = [layer[1:-10] for layer in re.findall(r'".*?">download', r.text)]
    return [layer for layer in layers if '/' not in layer]

folder = './shapefiles/'

layers = get_online_layer_names()

for i, layer in enumerate(layers):
    print(f'downloading {layer} ({i + 1}/{len(layers)})...')
    scrap(f'https://data.geo.admin.ch/{layer}/data.zip', folder)
