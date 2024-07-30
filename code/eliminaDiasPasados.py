
import json
from datetime import datetime, timedelta

def obtener_lunes_semana_actual():
    hoy = datetime.today()
    lunes = hoy - timedelta(days=hoy.weekday())
    return lunes

def filtrar_fechas_anteriores_a_lunes(data):
    lunes_semana_actual = obtener_lunes_semana_actual()
    lunes_str = lunes_semana_actual.strftime('%y%m%d')

    for key in data:
        if isinstance(data[key], dict):
            data[key] = {fecha: valores for fecha, valores in data[key].items() if fecha >= lunes_str}

    return data

def cargar_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

def guardar_json(data, filepath):
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def main(filepath):
    data = cargar_json(filepath)
    data_filtrada = filtrar_fechas_anteriores_a_lunes(data)
    guardar_json(data_filtrada, filepath)
    print(f"Archivo filtrado y guardado en {filepath}")

if __name__ == "__main__":
    ruta_archivo = '../excepcionesHorarios.json'
    main(ruta_archivo)
