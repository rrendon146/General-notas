2026/
├── packages/
│   └── package_login/          ← YA EXISTE (reutilizable)
│       ├── lib/
│       ├── pubspec.yaml
│       └── .fvmrc
│
├── ssays_limpieza/             ← Proyecto 1 (usa package_login)
└── ssays_rpt_bitacora/         ← NUEVO PROYECTO (usa package_login)


2026/├── packages/│   └── package_login/          ← YA EXISTE (reutilizable)│       ├── lib/│       ├── pubspec.yaml│       └── .fvmrc│├── ssays_limpieza/             ← Proyecto 1 (usa package_login)└── ssays_rpt_bitacora/         ← NUEVO PROYECTO (usa package_login)

Paso 1: Crear Estructura Base del Proyecto

cd /home/rrendon/Documentos/repositorios/flutter/2026

# Crear carpeta del proyecto
mkdir -p ssays_rpt_bitacora
cd ssays_rpt_bitacora

# Crear estructura Flutter básica
fvm flutter create . --platforms android,ios,web,linux,windows --project-name ssays_rpt_bitacora

cd ..

#esto crea:
ssays_rpt_bitacora/
├── lib/
│   └── main.dart
├── android/
├── ios/
├── web/
├── linux/
├── windows/
├── test/
├── pubspec.yaml
├── pubspec.lock
├── analysis_options.yaml
└── README.md

Paso 2: Configurar pubspec.yaml
Ya tienes el contenido. Reemplaza ssays_rpt_bitacora/pubspec.yaml completamente:

cat > ssays_rpt_bitacora/pubspec.yaml << 'EOF'
name: ssays_rpt_bitacora
description: "ssays_rpt_bitacora usando package_login."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: ^3.10.7

dependencies:
  flutter:
    sdk: flutter

  flutter_localizations:
    sdk: flutter

  # 🔑 DEPENDENCIA DEL PACKAGE COMPARTIDO
  package_login:
    path: ../packages/package_login

  # Dependencias comunes
  auto_route: ^10.1.2
  awesome_dio_interceptor: ^1.3.0
  dio: ^5.9.0
  envied: ^1.2.1
  flutter_riverpod: ^3.0.0
  freezed_annotation: ^3.1.0
  intl: ^0.20.2
  fpdart: ^1.2.0
  shared_preferences: ^2.5.3
  connectivity_plus: ^7.0.0
  package_info_plus: ^8.1.2
  image: ^4.8.0

dev_dependencies:
  json_serializable: ^6.11.1
  auto_route_generator: ^10.2.6
  build_runner: ^2.7.1
  freezed: ^3.1.0
  envied_generator: ^1.2.1
  flutter_launcher_icons: ^0.14.4
  
  flutter_test:
    sdk: flutter

  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  generate: true
EOF
    

Paso 3: Crear .fvmrc

cat > ssays_rpt_bitacora/.fvmrc << 'EOF'
{
  "flutter": "3.35.3",
  "fvmUpToDate": true
}
EOF



Paso 4: Crear Makefile
Copiar del patrón de ssays_limpieza pero adaptado:


cat > ssays_rpt_bitacora/Makefile << 'EOF'
# -----------------------
# VARIABLES
# -----------------------
VERSION_NAME=1.0.0
APP_NAME=ssays_rpt_bitacora
FLUTTER=fvm flutter
DART=fvm dart

# Detectar Sistema Operativo
ifeq ($(OS),Windows_NT)
    DETECTED_OS=Windows
else
    DETECTED_OS=$(shell uname -s)
endif

# -----------------------
# FLUTTER TASKS
# -----------------------

get:
    $(FLUTTER) pub get

clean:
    @echo "Limpiando proyecto..."
    $(FLUTTER) clean
    @find . -name "hs_err_pid*.log" -delete 2>/dev/null || true
    @find . -name "replay_pid*.log" -delete 2>/dev/null || true
    @echo "[OK] Proyecto limpio!"

setup:
    @echo "Instalando Flutter..."
    fvm install
    @echo ""
    @echo "Configurando Flutter SDK..."
    fvm use 3.35.3 --force
    @echo ""
    @echo "Instalando dependencias..."
    $(FLUTTER) pub get
    @echo ""
    @$(MAKE) gen
    @echo ""
    @echo "[OK] Setup completo! Ejecuta: make run"

rebuild: clean get gen

gen:
    @echo "Generando codigo..."
    $(DART) run build_runner build --delete-conflicting-outputs
    @echo "[OK] Codigo generado!"

watch:
    $(DART) run build_runner watch --delete-conflicting-outputs

# -----------------------
# EJECUCION
# -----------------------

run:
    @echo "Ejecutando app..."
    $(FLUTTER) run

run-device:
    @echo "Listando dispositivos..."
    $(FLUTTER) devices
    @echo ""
    @echo "Ejecuta: $(FLUTTER) run -d <device_id>"

# -----------------------
# BUILD
# -----------------------

apk-dev:
    @echo "Compilando APK Dev..."
    $(FLUTTER) build apk --debug
    @echo "[OK] APK: build/app/outputs/flutter-apk/app-debug.apk"

apk-prod:
    @echo "Compilando APK Release..."
    $(FLUTTER) build apk --release
    @echo "[OK] APK: build/app/outputs/flutter-apk/app-release.apk"

aab-prod:
    @echo "Compilando AAB para Play Store..."
    $(FLUTTER) build appbundle --release
    @echo "[OK] AAB: build/app/outputs/bundle/release/app-release.aab"

# -----------------------
# UTILIDADES
# -----------------------

format:
    $(DART) format lib/ -l 80

doctor:
    $(FLUTTER) doctor -v

.PHONY: get clean setup rebuild gen watch run run-device apk-dev apk-prod aab-prod format doctor
EOF



Paso 5: Setup Completo
cd ssays_rpt_bitacora

# Ejecutar setup (esto toma 2-5 minutos la primera vez)
make setup


Esto hace automáticamente:

✅ fvm install → Descarga Flutter 3.35.3 (si no lo has instalado)
✅ fvm use 3.35.3 --force → Activa esa versión
✅ flutter pub get → Descarga dependencias, incluyendo package_login desde ../packages/package_login
✅ make gen → Genera código (freezed, auto_route, etc)
Instalando Flutter...
Configurando Flutter SDK...
Instalando dependencias...
Generando codigo...
[OK] Codigo generado!
[OK] Setup completo! Ejecuta: make run



Paso 6: Crear Estructura Interna (copy de ssays_limpieza)

cd ssays_rpt_bitacora/lib

# Crear estructura base
mkdir -p core/configs core/services
mkdir -p presentation
mkdir -p components
mkdir -p src

# Crear archivos base
cat > app.dart << 'EOF'
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:package_login/package_login.dart';

class App extends ConsumerWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: 'SSAYS RPT Bitácora',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const Scaffold(
        body: Center(
          child: Text('¡Bienvenido a ssays_rpt_bitacora!'),
        ),
      ),
    );
  }
}
EOF

cat > flavors.dart << 'EOF'
enum Flavor { dev, prod }

class F {
  static Flavor? appFlavor;

  static String get name => appFlavor?.name ?? '';

  static String get title {
    switch (appFlavor) {
      case Flavor.dev:
        return 'SSAYS RPT Bitácora Dev';
      case Flavor.prod:
        return 'SSAYS RPT Bitácora';
      default:
        return 'title';
    }
  }

  static void initialize() {
    if (appFlavor != null) return;
    const dartDefineEnv = String.fromEnvironment(
      'ENVIRONMENT',
      defaultValue: 'dev',
    );
    appFlavor = dartDefineEnv == 'prod' ? Flavor.prod : Flavor.dev;
  }
}
EOF



Paso 7: Actualizar main.dart

cat > ssays_rpt_bitacora/lib/main.dart << 'EOF'
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:package_login/package_login.dart';
import 'app.dart';
import 'flavors.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  F.initialize();
  
  runApp(
    const ProviderScope(
      child: App(),
    ),
  );
}
EOF



Paso 8: Primer Test
cd /home/rrendon/Documentos/repositorios/flutter/2026/ssays_rpt_bitacora

# Ver dispositivos disponibles
make doctor

# Ejecutar la app
make run


Alternativas:
# Solo listar dispositivos
fvm flutter devices

# Ejecutar con dispositivo específico
fvm flutter run -d linux     # Si tienes Linux
fvm flutter run -d chrome    # Web
fvm flutter run -d emulator-5554  # Android emulator



📊 Relación: ssays_rpt_bitacora ↔ package_login
ssays_rpt_bitacora/
│
├── pubspec.yaml
│   └─→ package_login: path: ../packages/package_login
│       │
│       └─→ Importa: import 'package:package_login/package_login.dart'
│
├── lib/
│   ├── main.dart          ← Importa package_login
│   ├── app.dart           ← Usa SessionManager() de package_login
│   ├── flavors.dart
│   ├── core/
│   ├── presentation/
│   ├── components/
│   └── src/
│
├── Makefile               ← Automatiza todo
└── .fvmrc                 ← Flutter 3.35.3

packages/package_login/          ← COMPARTIDO
├── lib/
│   ├── package_login.dart       ← Barrel export
│   ├── core/
│   │   ├── configs/router/      ← Routes reutilizables
│   │   ├── configs/network/     ← API config
│   │   └── services/
│   ├── components/              ← Widgets reusables
│   ├── presentation/            ← Pantallas (Login, Register)
│   └── src/                     ← Dominio (User, Auth, etc)
├── pubspec.yaml
└── .fvmrc


✅ Comandos Frecuentes en Zorin OS
# 1️⃣ Setup inicial (una sola vez)
cd ssays_rpt_bitacora
make setup

# 2️⃣ Descargar cambios de package_login
make get

# 3️⃣ Regenerar código si cambias package_login
make gen

# 4️⃣ Desarrollo con auto-regeneración
make watch
# En otra terminal:
make run

# 5️⃣ Formatear código
make format

# 6️⃣ Limpiar y reconstruir
make rebuild

# 7️⃣ Build para Android
make apk-dev    # Debug
make apk-prod   # Release
make aab-prod   # Play Store

# 8️⃣ Verificar instalación
make doctor


🔄 Flujo de Desarrollo (Editar package_login)
# Terminal 1: En ssays_rpt_bitacora, mira cambios en tiempo real
cd ssays_rpt_bitacora
make watch

# Terminal 2: En ssays_limpieza, hace edits en package_login (compartido)
cd ../packages/package_login
# ... editas código ...

# Terminal 1 automáticamente regenera
# Terminal 3: En ssays_rpt_bitacora, ejecuta
cd ssays_rpt_bitacora
make run

# Los cambios en package_login se ven inmediatamente

🆘 Troubleshooting en Zorin OS
Error: "pubspec.yaml could not find package package_login"
# Asegúrate que la ruta es correcta
ls -la ../packages/package_login/pubspec.yaml

# Luego:
cd ssays_rpt_bitacora
rm -rf pubspec.lock
make get





