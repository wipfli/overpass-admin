# overpass-admin
Access swisstopo data with an overpass-like API

## install

```bash
python3.8 -m venv venv
source venv/bin/activate
pip install fastapi
pip install uvicorn
pip install geopandas
pip install rtree

mkdir shapefiles
# put .shp including .shx into this folder
```


Run server with

```bash
python server.py
```