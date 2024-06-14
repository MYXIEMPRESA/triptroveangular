from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import math

app = Flask(__name__)
CORS(app)

with open('datos_museos_modificados.json', encoding='utf-8') as f:
    museos_info = json.load(f)


def calcular_distancia(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distancia = R * c
    return distancia

@app.route('/museos_cercanos', methods=['GET'])
def museos_mas_cercanos():
    try:
        lat_cliente = float(request.args.get('lat'))
        lon_cliente = float(request.args.get('lon'))
        tipos_museo = request.args.getlist('tipo')
        museos_filtrados = [museo for museo in museos_info if museo['Categorías'] and any(tipo.lower() in museo['Categorías'] for tipo in tipos_museo)] if tipos_museo else museos_info
        museos_cercanos = []
        for museo in museos_filtrados:
            lat_museo = museo['Coordenadas']['latitud']
            lon_museo = museo['Coordenadas']['longitud']
            distancia = calcular_distancia(lat_cliente, lon_cliente, lat_museo, lon_museo)
            museos_cercanos.append({'nombre': museo['Nombre'], 'latitud': lat_museo, 'longitud': lon_museo, 'distancia': distancia})
        museos_cercanos = sorted(museos_cercanos, key=lambda x: x['distancia'])[:3]
        return jsonify(museos_cercanos)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
