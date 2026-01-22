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




# === 0) Dime qué shell estás usando
echo "SHELL = $SHELL"

# === 1) Ve a la carpeta del workspace generado
cd ~/bank_robot_ws_full 2>/dev/null || cd $HOME/bank_robot_ws_full 2>/dev/null || pwd

# Si no existe, probablemente lo descomprimiste con otro nombre o en otra ruta.
# Verifica qué hay en tu $HOME:
if [ ! -d "./src/bank_robot_bringup" ]; then
  echo "[WARN] No encuentro ~/bank_robot_ws_full/src/bank_robot_bringup"
  echo "Por favor, dime dónde descomprimiste el ZIP."
fi

# === 2) Limpieza y build
rm -rf build/ install/ log/
# Underlay de Humble (elige el que corresponda a tu shell)
if echo "$SHELL" | grep -q "zsh"; then
  source /opt/ros/humble/setup.zsh
elif echo "$SHELL" | grep -q "fish"; then
  source /opt/ros/humble/setup.fish
else
  source /opt/ros/humble/setup.bash
fi

# Compilar solo el paquete del bringup con logs verbosos
colcon build --symlink-install --event-handlers console_direct+ status- --packages-select bank_robot_bringup

# === 3) Source del overlay (según tu shell)
if echo "$SHELL" | grep -q "zsh"; then
  source install/setup.zsh
elif echo "$SHELL" | grep -q "fish"; then
  source install/setup.fish
else
  source install/setup.bash
fi

# === 4) Verificaciones de entorno y paquete
echo "=== which ros2 ==="
type -a ros2
echo "=== AMENT_PREFIX_PATH ==="
echo "$AMENT_PREFIX_PATH" | tr ':' '\n'

echo "=== Paquetes visibles (grep bank) ==="
ros2 pkg list | grep -i bank || echo "NADA"

echo "=== Prefijo del paquete ==="
ros2 pkg prefix bank_robot_bringup || echo "NO_PREFIX"

echo "=== Launch instalados ==="
if ROS_PREFIX=$(ros2 pkg prefix bank_robot_bringup 2>/dev/null); then
  ls -la "$ROS_PREFIX/share/bank_robot_bringup/launch" || true
fi

# === 5) Intento de lanzamiento (si todo lo anterior pasa)
echo "=== Lanzando ==="
ros2 launch bank_robot_bringup robot_service.launch.py || echo "LAUNCH_FALLO"

