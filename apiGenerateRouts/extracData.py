import requests
from bs4 import BeautifulSoup
import json
from time import sleep

def hacer_solicitud(url, intentos=5, tiempo_espera=5):
    for i in range(intentos):
        try:
            response = requests.get(url)
            return response
        except requests.exceptions.ConnectionError:
            if i < intentos - 1:  # i es 0-indexado, así que resta 1
                sleep(tiempo_espera)  # Espera antes de reintentar
                continue
            else:
                raise  # Si todos los intentos fallan, levanta la excepción

def extraer_datos_museo(url):
    response = hacer_solicitud(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extracción básica de datos...
    datos_museo = {
        # Datos básicos como antes
        'Nombre': soup.find('div', id='nombre').get_text(strip=True) if soup.find('div', id='nombre') else 'No disponible',
        'Adscripcion': soup.find('div', id='adscripcion').get_text(strip=True) if soup.find('div', id='adscripcion') else 'No disponible',
        'Direccion': soup.find('div', id='datosgen').p.get_text(strip=True).replace('\r\n', ' ').replace('\n', ' ') if soup.find('div', id='datosgen') and soup.find('div', id='datosgen').p else 'No disponible',
        'Email': soup.find('a', href=lambda x: x and x.startswith('mailto:')).get_text(strip=True) if soup.find('a', href=lambda x: x and x.startswith('mailto:')) else 'No disponible',
        'Datos Generales': soup.find('div', class_='subtemas').get_text(strip=True, separator=" ") if soup.find('div', class_='subtemas') else 'No disponible',
        'Horarios': '',  # Ajustaremos esto abajo
        'Costos': '',    # Ajustaremos esto abajo
        'Imagen URL': [],  # Lista para URLs de imágenes
        'Coordenadas': {
            'latitud': None,
            'longitud': None
        },
        'URL': url,
        'Empresa': '',
        'Negocio': '',
        'Salas de Exhibición': []  # Lista para detalles de salas
    }

    # Coordenadas
    script_json = soup.find('script', type='application/ld+json')
    if script_json:
        data = json.loads(script_json.string)
        datos_museo['Coordenadas'] = {"latitud": data['geo']['latitude'], "longitud": data['geo']['longitude']}

    # Imágenes
    for i in range(4):  # Asumiendo hasta cuatro imágenes
        img = soup.find('img', {'id': f'imagen{i}'})
        if img:
            imagen_url = 'https://sic.cultura.gob.mx' + img['src']
            datos_museo['Imagen URL'].append(imagen_url)

    # Horarios y costos
    horarios_costos_div = soup.find('div', id='datoscomplemento')
    if horarios_costos_div:
        datos_museo['Horarios'] = horarios_costos_div.get_text(strip=True)

    # Salas de exhibición
    salas_div = soup.find_all('div', class_='subtemas')  # Asumiendo que 'subtemas' contenga información de salas
    for sala in salas_div:
        sala_info = sala.get_text(strip=True, separator=" ")
        datos_museo['Salas de Exhibición'].append(sala_info)

    return datos_museo


def obtener_links_museos(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    enlaces = soup.find_all('a', href=True, class_='links_fb')
    links_museos = ['https://sic.cultura.gob.mx' + enlace['href'] for enlace in enlaces]
    return links_museos

# URL de la página de listado de museos
url_lista_museos = 'https://sic.cultura.gob.mx/lista.php?table=museo&estado_id=9&municipio_id=-1'
links_museos = obtener_links_museos(url_lista_museos)

datos_museos = []
for url_museo in links_museos:
    datos_museos.append(extraer_datos_museo(url_museo))

# Guardar los datos en un archivo JSON
with open('datos_museos.json', 'w', encoding='utf-8') as f:
    json.dump(datos_museos, f, indent=4, ensure_ascii=False)

print("Datos de los museos extraídos y guardados en 'datos_museos.json'")
