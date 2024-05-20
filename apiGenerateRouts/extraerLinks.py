import requests
from bs4 import BeautifulSoup

def obtener_links_museos(url):
    # Realizar la solicitud HTTP a la URL
    response = requests.get(url)
    # Parsear el contenido de la respuesta utilizando BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Encontrar todos los enlaces dentro de la clase especificada
    enlaces = soup.find_all('a', href=True, class_='links_fb')
    
    # Extraer y almacenar los URLs
    links_museos = []
    for enlace in enlaces:
        link_completo = 'https://sic.cultura.gob.mx' + enlace['href']
        links_museos.append(link_completo)

    return links_museos

# URL de la página de listado de museos
url = 'https://sic.cultura.gob.mx/lista.php?table=museo&estado_id=9&municipio_id=-1'

# Llamar a la función y obtener los links
links = obtener_links_museos(url)
print(links)
