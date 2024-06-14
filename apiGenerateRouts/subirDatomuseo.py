import json
import firebase_admin
from firebase_admin import credentials, firestore

# Función para leer el archivo JSON
def leer_json(nombre_archivo):
    with open(nombre_archivo, 'r', encoding='utf-8') as file:
        return json.load(file)

# Configuración de Firebase
cred = credentials.Certificate('triptroveangular-firebase-adminsdk-qt474-3bdae93670.json')
firebase_admin.initialize_app(cred)
# Cliente Firestore
db = firestore.client()

# Función para cargar datos a Firestore
def cargar_datos_firestore(datos, coleccion):
    for museo in datos:
        nombre_museo = museo['Nombre'].replace('/', '|')  # Remplaza caracteres no válidos en IDs
        doc_ref = db.collection(coleccion).document(nombre_museo)
        doc_ref.set(museo)
        print(f'Datos cargados para: {nombre_museo}')

# Leer los datos modificados
datos_museos_modificados = leer_json('datos_museos_modificados.json')

# Cargar datos en la colección 'places'
cargar_datos_firestore(datos_museos_modificados, 'places')
