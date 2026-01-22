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

Starting >>> bank_robot_bringup
running develop
running egg_info
creating bank_robot_bringup.egg-info
writing bank_robot_bringup.egg-info/PKG-INFO
writing dependency_links to bank_robot_bringup.egg-info/dependency_links.txt
writing entry points to bank_robot_bringup.egg-info/entry_points.txt
writing requirements to bank_robot_bringup.egg-info/requires.txt
writing top-level names to bank_robot_bringup.egg-info/top_level.txt
writing manifest file 'bank_robot_bringup.egg-info/SOURCES.txt'
reading manifest file 'bank_robot_bringup.egg-info/SOURCES.txt'
writing manifest file 'bank_robot_bringup.egg-info/SOURCES.txt'
running build_ext
Creating /root/bank_robot_ws_full/install/bank_robot_bringup/lib/python3.10/site-packages/bank-robot-bringup.egg-link (link to .)
Installing robot_service_node script to /root/bank_robot_ws_full/install/bank_robot_bringup/bin

Installed /root/bank_robot_ws_full/build/bank_robot_bringup
running symlink_data
creating /root/bank_robot_ws_full/install/bank_robot_bringup/share
creating /root/bank_robot_ws_full/install/bank_robot_bringup/share/ament_index
creating /root/bank_robot_ws_full/install/bank_robot_bringup/share/ament_index/resource_index
creating /root/bank_robot_ws_full/install/bank_robot_bringup/share/ament_index/resource_index/packages
symbolically linking /root/bank_robot_ws_full/build/bank_robot_bringup/resource/bank_robot_bringup -> /root/bank_robot_ws_full/install/bank_robot_bringup/share/ament_index/resource_index/packages
creating /root/bank_robot_ws_full/install/bank_robot_bringup/share/bank_robot_bringup
symbolically linking /root/bank_robot_ws_full/build/bank_robot_bringup/package.xml -> /root/bank_robot_ws_full/install/bank_robot_bringup/share/bank_robot_bringup
creating /root/bank_robot_ws_full/install/bank_robot_bringup/share/bank_robot_bringup/launch
symbolically linking /root/bank_robot_ws_full/build/bank_robot_bringup/launch/robot_service.launch.py -> /root/bank_robot_ws_full/install/bank_robot_bringup/share/bank_robot_bringup/launch
Finished <<< bank_robot_bringup [2.16s]

Summary: 1 package finished [3.61s]
=== which ros2 ===
ros2 is /opt/ros/humble/bin/ros2
=== AMENT_PREFIX_PATH ===
/opt/ros/humble
=== Paquetes visibles (grep bank) ===
NADA
=== Prefijo del paquete ===
Package not found
NO_PREFIX
=== Launch instalados ===
=== Lanzando ===
Package 'bank_robot_bringup' not found: "package 'bank_robot_bringup' not found, searching: ['/opt/ros/humble']"
LAUNCH_FALLO


cd /root/bank_robot_ws_full

# 1) Underlay de Humble
source /opt/ros/humble/setup.bash

# 2) Overlay del workspace (¡este es el que falta!)
source install/setup.bash

# 3) Comprueba que ahora sí aparece el overlay primero
echo "$AMENT_PREFIX_PATH" | tr ':' '\n'

# 4) Verifica que ROS ve el paquete
ros2 pkg list | grep -i bank_robot_bringup

# 5) Lanza
ros2 launch bank_robot_bringup robot_service.launch.py

