# overpass-admin
Access swisstopo data with an overpass-like API

## install

```bash
python3.8 -m venv venv
source venv/bin/activate
pip install fastapi
pip install uvicorn
pip install aiofiles
pip install geopandas
pip install rtree
pip install requests

mkdir shapefiles
python download.py
```


Run server with

```bash
python server.py
```