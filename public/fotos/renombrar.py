import os

carpeta = os.getcwd()
archivos = [f for f in os.listdir(carpeta) if os.path.isfile(os.path.join(carpeta, f))]
archivos.sort()

# Quitar el script de la lista si está en la carpeta
if 'renombrar.py' in archivos:
    archivos.remove('renombrar.py')

# Pedir al usuario el número inicial
try:
    count = int(input("¿Desde qué número quieres empezar a renombrar? (ej. 47): "))
except ValueError:
    print("Error: Debes introducir un número entero.")
    input("Presiona Enter para salir...")
    exit()

# Filtrar solo los archivos que NO son numéricos (para no renombrar los que ya tienen número)
archivos_a_renombrar = []
for archivo in archivos:
    nombre, extension = os.path.splitext(archivo)
    if not nombre.isdigit():
        archivos_a_renombrar.append(archivo)

if not archivos_a_renombrar:
    print("No se encontraron archivos nuevos para renombrar (todos ya tienen nombre numérico).")
    input("Presiona Enter para salir...")
    exit()

print(f"\nSe van a renombrar {len(archivos_a_renombrar)} archivos, empezando por el número {count}.\n")

for archivo in archivos_a_renombrar:
    nombre, extension = os.path.splitext(archivo)
    nuevo_nombre = str(count) + extension
    
    ruta_vieja = os.path.join(carpeta, archivo)
    ruta_nueva = os.path.join(carpeta, nuevo_nombre)
    
    if os.path.exists(ruta_nueva):
        print(f"⚠️  Saltando: {archivo} (ya existe {nuevo_nombre})")
    else:
        os.rename(ruta_vieja, ruta_nueva)
        print(f"✅ Renombrado: {archivo} -> {nuevo_nombre}")
        count += 1

print(f"\nListo. Se procesaron hasta el número {count - 1}.")
input("Presiona Enter para salir...")