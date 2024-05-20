from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import math
import random

app = Flask(__name__)
CORS(app) 

# Cargar la información de los museos desde el archivo JSON
with open('museos_info.json') as f:
    museos_info = json.load(f)

# Función para calcular la distancia entre dos puntos (coordenadas latitud y longitud)
def calcular_distancia(lat1, lon1, lat2, lon2):
    # Utiliza la fórmula de Haversine para calcular la distancia sobre la superficie de la Tierra
    R = 6371  # Radio de la Tierra en kilómetros
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distancia = R * c
    return distancia

# Ruta para encontrar los tres museos más cercanos
@app.route('/museos_cercanos', methods=['GET'])
def museos_mas_cercanos():
    try:
        # Obtener la ubicación del cliente desde los parámetros de la consulta
        lat_cliente = float(request.args.get('lat'))
        lon_cliente = float(request.args.get('lon'))

        # Obtener los tipos de museo específicos de la consulta
        tipos_museo = request.args.getlist('tipo')

        # Filtrar los museos por tipo si se proporcionan tipos específicos
        if tipos_museo:
            museos_filtrados = [museo for museo in museos_info if any(tipo.lower() in museo['categories'] for tipo in tipos_museo)]
        else:
            museos_filtrados = museos_info

        # Calcular la distancia a cada museo
        museos_cercanos = []
        for museo in museos_filtrados:
            lat_museo = museo['latitude']
            lon_museo = museo['longitude']
            distancia = calcular_distancia(lat_cliente, lon_cliente, lat_museo, lon_museo)
            museos_cercanos.append({'nombre': museo['name'], 'latitud': lat_museo, 'longitud': lon_museo, 'distancia': distancia})

        # Ordenar los museos por distancia de más cercano a más lejano
        museos_cercanos = sorted(museos_cercanos, key=lambda x: x['distancia'])

        # Seleccionar los tres museos más cercanos
        tres_mas_cercanos = museos_cercanos[:3]

        # Ordenar los tres museos más cercanos por categoría
        tres_mas_cercanos = sorted(tres_mas_cercanos, key=lambda x: x['nombre'])

        # Introducir un pequeño factor aleatorio para mezclar un poco los museos de la misma categoría
        random.shuffle(tres_mas_cercanos)

        return jsonify(tres_mas_cercanos)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
