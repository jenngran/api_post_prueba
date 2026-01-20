1. GET
2. /contacts/{contact_id}
3. 404 si el usuario no existe, y 403 si la contraseña es incorrecta
4. TRUE
5. Verificar la presencia de un error. Si existe, lanzar una excepción con el error
6. Hacer un trait para manejar errores, de modo que los recoja en cualquier clase que lo use
7. parseDataForProducts()
8. Colocar las credenciales en un archivo .env, cargar los datos en un sistema de configuración y solicitarlas desde un proveedor de servicio de base de datos

🔍 Citas clave (para tu documentación)

Incremental/Online con scikit‑learn (estructura partial_fit): Kaggle notebook
KITTI‑odometry (lectura/empate de frames/ORB, base para features de navegación): Kaggle notebook
2D Path Planning dataset (mapas+rutas óptimas) y demo CNN: Kaggle dataset, GitHub demo
Nav2 docs (estructura, configuración, tuning): Nav2 documentation

bank_robot_ws_full/
├─ README.md
└─ src/
   ├─ bank_robot_nlp/          ← NLP incremental de intenciones (scikit‑learn partial_fit)
   ├─ bank_robot_routes/       ← Aprendizaje incremental de rutas + bridge a Nav2
   ├─ bank_robot_pathlearn/    ← Preentrenamiento con Kaggle 2D Path Planning + continual runtime
   ├─ bank_robot_eval/         ← Tools: scenario_player (frases) + demo_metrics (KPIs)
   └─ bank_robot_bringup/
      ├─ robot_service.launch.py
      └─ worlds/banco_realista.world
