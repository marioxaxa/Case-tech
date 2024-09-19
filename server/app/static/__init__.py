import json
from pathlib import Path

# Definir o caminho para o arquivo JSON
caminho_json = Path(__file__).resolve().parent / 'products.json'

# Carregar o conteúdo do JSON
with caminho_json.open('r', encoding='utf-8') as f:
    PRODUCTS_DATA = json.load(f)