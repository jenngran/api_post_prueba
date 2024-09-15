1. GET
2. /contacts/{contact_id}
3. 404 si el usuario no existe, y 403 si la contraseña es incorrecta
4. TRUE
5. Verificar la presencia de un error. Si existe, lanzar una excepción con el error
6. Hacer un trait para manejar errores, de modo que los recoja en cualquier clase que lo use
7. parseDataForProducts()
8. Colocar las credenciales en un archivo .env, cargar los datos en un sistema de configuración y solicitarlas desde un proveedor de servicio de base de datos
