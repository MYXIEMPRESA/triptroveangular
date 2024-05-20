import json

def leer_json(nombre_archivo):
    """Lee y devuelve los datos de un archivo JSON."""
    with open(nombre_archivo, 'r', encoding='utf-8') as file:
        return json.load(file)

def encontrar_correspondencia(museo, museos_info):
    """Encuentra la correspondencia de un museo en otra lista de museos basada en el nombre."""
    nombre_normalizado = museo['Nombre'].lower().strip()
    for info in museos_info:
        if nombre_normalizado == info['name'].lower().strip():
            return info
    return None

def agregar_categorias(datos_museos, museos_info):
    """Agrega categorías a cada museo en datos_museos si encuentra una correspondencia en museos_info."""
    for museo in datos_museos:
        correspondencia = encontrar_correspondencia(museo, museos_info)
        if correspondencia:
            museo['Categorías'] = correspondencia['categories']
        else:
            museo['Categorías'] = []  # Asigna lista vacía si no hay categorías correspondientes
    return datos_museos

def guardar_json(datos, nombre_archivo):
    """Guarda los datos modificados en un archivo JSON, asegurándose de que las cadenas estén en UTF-8."""
    with open(nombre_archivo, 'w', encoding='utf-8') as file:
        json.dump(datos, file, ensure_ascii=False, indent=4)  # ensure_ascii=False para evitar secuencias de escape en caracteres Unicode

# Cargar datos
datos_museos = leer_json('datos_museos.json')
museos_info = leer_json('museos_info.json')

# Procesar los datos
datos_museos_modificados = agregar_categorias(datos_museos, museos_info)

# Guardar los resultados en un nuevo archivo
guardar_json(datos_museos_modificados, 'datos_museos_modificados.json')
