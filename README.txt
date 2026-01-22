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


echo $SHELL
cd /root/bank_robot_ws_full
source /opt/ros/humble/setup.bash || echo HUMBLE_FAIL
source install/setup.bash || echo OVERLAY_FAIL
echo "=== AMENT_PREFIX_PATH ==="; echo "$AMENT_PREFIX_PATH" | tr ':' '\n'
ros2 pkg list | grep -i bank || echo "NADA"
ros2 pkg prefix bank_robot_bringup || echo "NO_PREFIX"
ls -la $(ros2 pkg prefix bank_robot_bringup)/share/bank_robot_bringup/launch 2>/dev/null || echo "SIN_LAUNCH"

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
root@JenLapt:~/bank_robot_ws_full#
root@JenLapt:~/bank_robot_ws_full# echo $shell

root@JenLapt:~/bank_robot_ws_full# echo $SHELL
/bin/bash
root@JenLapt:~/bank_robot_ws_full# cd /root/bank_robot_ws_full

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
/opt/ros/humble
Package 'bank_robot_bringup' not found: "package 'bank_robot_bringup' not found, searching: ['/opt/ros/humble']"
root@JenLapt:~/bank_robot_ws_full# echo $SHELL
cd /root/bank_robot_ws_full
source /opt/ros/humble/setup.bash || echo HUMBLE_FAIL
source install/setup.bash || echo OVERLAY_FAIL
echo "=== AMENT_PREFIX_PATH ==="; echo "$AMENT_PREFIX_PATH" | tr ':' '\n'
ros2 pkg list | grep -i bank || echo "NADA"
ros2 pkg prefix bank_robot_bringup || echo "NO_PREFIX"
ls -la $(ros2 pkg prefix bank_robot_bringup)/share/bank_robot_bringup/launch 2>/dev/null || echo "SIN_LAUNCH"
/bin/bash
=== AMENT_PREFIX_PATH ===
/opt/ros/humble
NADA
Package not found
NO_PREFIX
Package not found
SIN_LAUNCH



cd /root/bank_robot_ws_full

# Ver si existen los setups
ls -la install | sed -n '1,200p'
ls -la install/setup.bash || echo "NO_SETUP"
ls -la install/local_setup.bash || echo "NO_LOCAL_SETUP"

# Ver contenido básico (debe tener exports/ament hooks)
head -n 40 install/setup.bash || echo "NO_SETUP_FILE"
head -n 40 install/local_setup.bash || echo "NO_LOCAL_SETUP_FILE"
RESPONSE:
head -n 40 install/setup.bash || echo "NO_SETUP_FILE"
head -n 40 install/local_setup.bash || echo "NO_LOCAL_SETUP_FILE"
total 88
drwxr-xr-x 3 root root  4096 Jan 21 23:06 .
drwxr-xr-x 6 root root  4096 Jan 21 23:06 ..
-rw-r--r-- 1 root root     9 Jan 21 23:06 .colcon_install_layout
-rw-r--r-- 1 root root     0 Jan 21 23:06 COLCON_IGNORE
-rw-r--r-- 1 root root 14856 Jan 21 23:06 _local_setup_util_ps1.py
-rw-r--r-- 1 root root 15024 Jan 21 23:06 _local_setup_util_sh.py
drwxr-xr-x 5 root root  4096 Jan 21 23:06 bank_robot_bringup
-rw-r--r-- 1 root root  3760 Jan 21 23:06 local_setup.bash
-rw-r--r-- 1 root root  2045 Jan 21 23:06 local_setup.ps1
-rw-r--r-- 1 root root  4336 Jan 21 23:06 local_setup.sh
-rw-r--r-- 1 root root  4155 Jan 21 23:06 local_setup.zsh
-rw-r--r-- 1 root root  1140 Jan 21 23:06 setup.bash
-rw-r--r-- 1 root root  1165 Jan 21 23:06 setup.ps1
-rw-r--r-- 1 root root  1909 Jan 21 23:06 setup.sh
-rw-r--r-- 1 root root  1128 Jan 21 23:06 setup.zsh
-rw-r--r-- 1 root root 1140 Jan 21 23:06 install/setup.bash
-rw-r--r-- 1 root root 3760 Jan 21 23:06 install/local_setup.bash
# generated from colcon_bash/shell/template/prefix_chain.bash.em

# This script extends the environment with the environment of other prefix
# paths which were sourced when this file was generated as well as all packages
# contained in this prefix path.

# function to source another script with conditional trace output
# first argument: the path of the script
_colcon_prefix_chain_bash_source_script() {
  if [ -f "$1" ]; then
    if [ -n "$COLCON_TRACE" ]; then
      echo "# . \"$1\""
    fi
    . "$1"
  else
    echo "not found: \"$1\"" 1>&2
  fi
}

# source chained prefixes
# setting COLCON_CURRENT_PREFIX avoids determining the prefix in the sourced script
COLCON_CURRENT_PREFIX="/opt/ros/humble"
_colcon_prefix_chain_bash_source_script "$COLCON_CURRENT_PREFIX/local_setup.bash"

# source this prefix
# setting COLCON_CURRENT_PREFIX avoids determining the prefix in the sourced script
COLCON_CURRENT_PREFIX="$(builtin cd "`dirname "${BASH_SOURCE[0]}"`" > /dev/null && pwd)"
_colcon_prefix_chain_bash_source_script "$COLCON_CURRENT_PREFIX/local_setup.bash"

unset COLCON_CURRENT_PREFIX
unset _colcon_prefix_chain_bash_source_script
# generated from colcon_bash/shell/template/prefix.bash.em

# This script extends the environment with all packages contained in this
# prefix path.

# a bash script is able to determine its own path if necessary
if [ -z "$COLCON_CURRENT_PREFIX" ]; then
  _colcon_prefix_bash_COLCON_CURRENT_PREFIX="$(builtin cd "`dirname "${BASH_SOURCE[0]}"`" > /dev/null && pwd)"
else
  _colcon_prefix_bash_COLCON_CURRENT_PREFIX="$COLCON_CURRENT_PREFIX"
fi

# function to prepend a value to a variable
# which uses colons as separators
# duplicates as well as trailing separators are avoided
# first argument: the name of the result variable
# second argument: the value to be prepended
_colcon_prefix_bash_prepend_unique_value() {
  # arguments
  _listname="$1"
  _value="$2"

  # get values from variable
  eval _values=\"\$$_listname\"
  # backup the field separator
  _colcon_prefix_bash_prepend_unique_value_IFS="$IFS"
  IFS=":"
  # start with the new value
  _all_values="$_value"
  _contained_value=""
  # iterate over existing values in the variable
  for _item in $_values; do
    # ignore empty strings
    if [ -z "$_item" ]; then
      continue
    fi
    # ignore duplicates of _value
    if [ "$_item" = "$_value" ]; then
      _contained_value=1
      continue


# Underlay de Humble
source /opt/ros/humble/setup.bash

# Intenta cargar el overlay y muestra si falla
set -o pipefail
( set -x; source install/setup.bash ) 2>&1 | sed -n '1,120p' || echo "SOURCE_SETUP_BASH_FALLO"

echo "=== AMENT_PREFIX_PATH luego de setup.bash ==="
echo "$AMENT_PREFIX_PATH" | tr ':' '\n'



( set -x; source install/local_setup.bash ) 2>&1 | sed -n '1,120p' || echo "SOURCE_LOCAL_SETUP_FALLO"
echo "=== AMENT_PREFIX_PATH luego de local_setup.bash ==="
echo "$AMENT_PREFIX_PATH" | tr ':' '\n'



export AMENT_PREFIX_PATH="/root/bank_robot_ws_full/install/bank_robot_bringup:${AMENT_PREFIX_PATH}"
echo "$AMENT_PREFIX_PATH" | tr ':' '\n'

# Ahora ROS debería ver el paquete
ros2 pkg list | grep -i bank || echo "NADA"

# Si ya lo ve, lanza:
ros2 launch bank_robot_bringup robot_service.launch.py



cd /root/bank_robot_ws_full
rm -rf build/ install/ log/

# Underlay primero
source /opt/ros/humble/setup.bash

# Build verboso
colcon build --symlink-install --event-handlers console_direct+ status- --packages-select bank_robot_bringup

# Verifica que el setup ahora exista
ls -la install/setup.bash
ls -la install/local_setup.bash

# Carga el overlay
source install/setup.bash || source install/local_setup.bash

# Revisa el PATH de ament
echo "$AMENT_PREFIX_PATH" | tr ':' '\n'

# Deberías ver el paquete
ros2 pkg list | grep -i bank || echo "NADA"
ros2 pkg prefix bank_robot_bringup || echo "NO_PREFIX"

# Lanza
ros2 launch bank_robot_bringup robot_service.launch.py


cd /root/bank_robot_ws_full
echo "SHELL=$SHELL"
echo "PWD=$(pwd)"
ls -la install | sed -n '1,200p'
ls -la install/setup.bash || echo NO_SETUP
ls -la install/local_setup.bash || echo NO_LOCAL_SETUP
grep -n \"AMENT_PREFIX_PATH\" install/setup.bash 2>/dev/null || echo "NO_AMENT_IN_SETUP"
grep -n \"AMENT_PREFIX_PATH\" install/local_setup.bash 2>/dev/null || echo "NO_AMENT_IN_LOCAL_SETUP"
source /opt/ros/humble/setup.bash
source install/setup.bash || echo OVERLAY_FAIL_1
echo "=== AMENT_PREFIX_PATH tras setup.bash ==="; echo "$AMENT_PREFIX_PATH" | tr ':' '\n'
source install/local_setup.bash || echo OVERLAY_FAIL_2
echo "=== AMENT_PREFIX_PATH tras local_setup.bash ==="; echo "$AMENT_PREFIX_PATH" | tr ':' '\n'
ros2 pkg list | grep -i bank || echo "NADA"
``



# Bash:
echo 'source /opt/ros/humble/setup.bash' >> ~/.bashrc
echo 'source /root/bank_robot_ws_full/install/setup.bash' >> ~/.bashrc
