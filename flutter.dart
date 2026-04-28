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

# Verificar FVM instalado
which fvm          # /snap/bin/fvm

# Verificar Make instalado  
which make         # /usr/bin/make

# Verificar Flutter
fvm flutter --version  # Flutter 3.35.3


PASO 1: Crear Estructura Base
cd 2026

# Crear app Flutter
fvm flutter create mi_app --platforms android,ios,web,linux,windows --project-name mi_app
cd mi_app


PASO 2: Crear .fvmrc
cat > .fvmrc << 'EOF'
{
  "flutter": "3.35.3"
}
EOF

PASO 3: Reemplazar pubspec.yaml
cat > pubspec.yaml << 'EOF'
name: ssays_bitacora
description: "Nueva aplicación Flutter con package_login."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: ^3.9.2

dependencies:
  flutter:
    sdk: flutter

  flutter_localizations:
    sdk: flutter

  # 🔑 DEPENDENCIA DEL PACKAGE COMPARTIDO
  package_login:
    path: ../packages/package_login

  # Dependencias principales
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

PASO 4: Crear .env
cat > .env << 'EOF'
BASE_URL_DEV=http://192.168.15.79:4000/api
BASE_URL_PROD=https://ssays-api.com/api
EOF


PASO 5: Crear Makefile ⚠️ USA TABS, NO ESPACIOS
cat > Makefile << 'EOF'
# Makefile - Flutter Development Automation
VERSION_NAME=1.0.0
APP_NAME=ssays_bitacora
FLUTTER=fvm flutter
DART=fvm dart

# ----- SETUP & MAINTENANCE -----
get:
    $(FLUTTER) pub get

clean:
    @echo "Limpiando proyecto..."
    $(FLUTTER) clean

setup:
    @echo "Instalando Flutter..."
    fvm install
    @echo "Configurando Flutter..."
    fvm use 3.35.3 --force
    @echo "Instalando dependencias..."
    $(FLUTTER) pub get
    @$(MAKE) gen
    @echo "[OK] Setup completo!"

rebuild: clean get gen

gen:
    @echo "Generando codigo..."
    $(DART) run build_runner build --delete-conflicting-outputs
    @echo "[OK] Codigo generado!"

watch:
    $(DART) run build_runner watch --delete-conflicting-outputs

# ----- EJECUCION -----
run-dev:
    $(FLUTTER) run -t lib/main_dev.dart

run-prod:
    $(FLUTTER) run -t lib/main_prod.dart

run-android:
    $(FLUTTER) run -d NBA54PEABC004209 -t lib/main_dev.dart

run-android-prod:
    $(FLUTTER) run -d NBA54PEABC004209 -t lib/main_prod.dart

run-linux:
    $(FLUTTER) run -d linux -t lib/main_dev.dart

# ----- BUILD -----
apk-dev:
    $(FLUTTER) build apk --debug

apk-prod:
    $(FLUTTER) build apk --release

aab-prod:
    $(FLUTTER) build appbundle --release

# ----- UTILIDADES -----
format:
    $(DART) format lib/ -l 80

doctor:
    $(FLUTTER) doctor -v

.PHONY: get clean setup rebuild gen watch run-dev run-prod run-android run-android-prod run-linux apk-dev apk-prod aab-prod format doctor
EOF

PASO 6: Crear lib/main.dart
cat > lib/main.dart << 'EOF'
import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:package_login/package_login.dart';
import 'app.dart';
import 'flavors.dart';

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback = (cert, host, port) {
        return host == 'nestjs-mysql.ssays-orquesta.com' ||
            host == '192.168.15.79';
      };
  }
}

Future<void> main() async {
  await runZonedGuarded(
    () async {
      WidgetsFlutterBinding.ensureInitialized();
      HttpOverrides.global = MyHttpOverrides();
      F.initialize();
      runApp(const ProviderScope(child: App()));
    },
    (error, stackTrace) {
      debugPrint('Error: $error\nStackTrace: $stackTrace');
    },
  );
}
EOF

PASO 7: Crear lib/main_dev.dart
cat > lib/main_dev.dart << 'EOF'
import 'flavors.dart';
import 'main.dart' as runner;

Future<void> main() async {
  F.appFlavor = Flavor.dev;
  await runner.main();
}
EOF


PASO 8: Crear lib/main_prod.dart
cat > lib/main_prod.dart << 'EOF'
import 'flavors.dart';
import 'main.dart' as runner;

Future<void> main() async {
  F.appFlavor = Flavor.prod;
  await runner.main();
}
EOF

PASO 9: Crear lib/flavors.dart
cat > lib/flavors.dart << 'EOF'
enum Flavor { dev, prod }

class F {
  static Flavor? appFlavor;

  static String get name => appFlavor?.name ?? '';

  static String get title {
    switch (appFlavor) {
      case Flavor.dev:
        return 'Mi App Dev';
      case Flavor.prod:
        return 'Mi App';
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

PASO 10: Crear lib/app.dart
cat > lib/app.dart << 'EOF'
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'flavors.dart';

class App extends ConsumerWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: F.title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: Scaffold(
        appBar: AppBar(title: Text(F.title)),
        body: const Center(
          child: Text('¡Bienvenido a mi_app!'),
        ),
      ),
    );
  }
}
EOF


PASO 11: ⚠️ CRÍTICO - Generar código en package_login PRIMERO
# Navegar a package_login
cd ../packages/package_login

# Asegurar que tiene .env
cat > .env << 'EOF'
BASE_URL_DEV=http://192.168.15.79:4000/api
BASE_URL_PROD=https://ssays-api.com/api
EOF

# Limpiar y regenerar se ejecuta dentro de la carpeta package/package_login
fvm flutter clean
fvm flutter pub get
fvm dart run build_runner build --delete-conflicting-outputs

# Esto debe mostrar: "wrote 34 outputs" (o similar)
# ESPERAR A QUE TERMINE

PASO 12: Setup en mi_app
# Volver a mi_app
cd ../../nuevo_proyecto/mi_app

# Ejecutar setup
make setup

# en caso de error de falta un separaro alto ejecutar este comando
sed -i 's/^    /\t/g' Makefile

# Esto ejecuta:
# 1. fvm install
# 2. fvm use 3.35.3
# 3. flutter pub get
# 4. generar código

PASO 13: Lanzar en Celular

# Ejecutar en Android (Dev)
make run-android

# O en Prod:
make run-android-prod

# Si necesitas otro dispositivo:
make run-device  # Lista dispositivos


📚 Comandos Útiles Resumen
make setup              # ⚙️ Setup inicial (solo primera vez)
make run-dev            # 💻 Ejecutar en desktop (Dev)
make run-prod           # 💻 Ejecutar en desktop (Prod)
make run-android        # 📱 Ejecutar en celular (Dev)
make run-android-prod   # 📱 Ejecutar en celular (Prod)
make rebuild            # 🔄 clean + get + gen
make watch              # 👁️ Regenerar código automático
make format             # 📝 Formatear código
make doctor             # 🏥 Verificar setup Flutter


PASO 14: Copiar y pegar carpeta "Assets" se aloja imagenes
Assets

PASO 15: 
cd nuevo_proyecto
mkdir components
mkdir core
mkdir presentation
mkdir src

PASO 16:
Crear el login de la app en carpeta raiz 2026
  
2026/
├── packages/
│   └── package_login/          ← PACKAGE COMPARTIDO (ya existe)
│       └── lib/
│           ├── presentation/login/screens/
│           │   └── login_screen.dart     ✅ YA EXISTE
│           └── presentation/splash/screens/
│               └── splash_screen.dart    ✅ YA EXISTE
│
└── ssays_bitacora/            ← TU PROYECTO
    └── lib/
        ├── presentation/screens/
        │   └── home_screen.dart          ❌ TÚ LO CREAS
        ├── core/configs/router/
        │   ├── app_router.dart           ❌ TÚ LO CREAS
        │   ├── router_provider.dart      ❌ TÚ LO CREAS
        │   └── router.dart               ❌ TÚ LO CREAS
        ├── app.dart                      ✏️ TÚ LO MODIFICAS
        └── main.dart                     (ya existe)

