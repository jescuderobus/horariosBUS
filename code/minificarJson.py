import json

def cargar_json(filepath):
    """
    Carga el contenido del archivo JSON.
    """
    with open(filepath, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

def guardar_json_minificado(data, filepath):
    """
    Guarda el contenido del JSON minificado en el archivo.
    """
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, separators=(',', ':'), ensure_ascii=False)

def main(filepath):
    """
    Función principal que carga el archivo JSON, 
    lo minifica y guarda el archivo actualizado.
    """
    data = cargar_json(filepath)  # Cargar el archivo JSON
    guardar_json_minificado(data, filepath)  # Guardar el JSON minificado
    print(f"Archivo minificado y guardado en {filepath}")

if __name__ == "__main__":
    ruta_archivo = '../excepcionesHorarios.json'  # Ruta al archivo JSON
    main(ruta_archivo)  # Ejecutar la función principal
