// en main.dart 

import 'dart:async';
import 'dart:io';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:package_login/package_login.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'app.dart';
import 'flavors.dart';
import 'presentation/app_auth_navigator/app_auth_navigator.dart';

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

class _SimpleNetworkInfo implements NetworkInfo {
  final Connectivity _connectivity;
  _SimpleNetworkInfo(this._connectivity);

  @override
  Future<bool> get isConnected async {
    try {
      final result = await _connectivity.checkConnectivity();
      return result != ConnectivityResult.none;
    } catch (_) {
      return false;
    }
  }
}

Future<void> main() async {
  await runZonedGuarded(
    () async {
      WidgetsFlutterBinding.ensureInitialized();

      // 🔐 HTTP SSL Override
      HttpOverrides.global = MyHttpOverrides();

      // ⚙️ Inicializar Flavors
      F.initialize();

      // 💾 Inicializar configuración
      final config = F.appFlavor == Flavor.prod
          ? ProdEnvironmentConfig()
          : DevEnvironmentConfig();
      EnvironmentManager.init(config);

      // 🗄️ SharedPreferences
      final sharedPreferences = await SharedPreferences.getInstance();

      // 🗄️ Inicializar Hive
      await Hive.initFlutter();

      // ✅ Listo para iniciar
      runApp(
        ProviderScope(
          overrides: [
            authNavigatorProvider.overrideWithValue(AppAuthNavigator()),
            networkInfoProvider.overrideWith((ref) {
              final connectivity = Connectivity();
              return _SimpleNetworkInfo(connectivity);
            }),
          ],
          child: const App(),
        ),
      );
    },
    (error, stackTrace) {
      debugPrint('Error: $error\nStackTrace: $stackTrace');
    },
  );
}

PUNTOS DE ENTRADA
// main_dev.dart
import 'flavors.dart';
import 'main.dart' as runner;

Future<void> main() async {
  F.appFlavor = Flavor.dev;
  await runner.main();
}

// main_prod.dart
import 'flavors.dart';
import 'main.dart' as runner;

Future<void> main() async {
  F.appFlavor = Flavor.prod;
  await runner.main();
}

APP WIDGET
// app.dart
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:package_login/package_login.dart';
import 'core/configs/router/router_provider.dart';
import 'flavors.dart';

class App extends ConsumerWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    return MaterialApp.router(
      title: F.title,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      routerDelegate: appRouter.delegate(
        navigatorObservers: () => [AutoRouteObserver()],
      ),
      routeInformationParser: appRouter.defaultRouteParser(),
    );
  }
}

IMPLEMENTACION DEL NAVIGATOR
// app_auth_navigator.dart
import 'package:flutter/material.dart';
import 'package:package_login/core/configs/router/router_provider.gr.dart' as login_router;
import 'package:package_login/presentation/navigators/auth_navigator.dart';
import '../../core/configs/router/router_provider.dart';
import '../../core/configs/router/router_provider.gr.dart';

class AppAuthNavigator implements AuthNavigator {
  AppAuthNavigator();

  @override
  void goToHome(BuildContext context) {
    autoRouterReplace(context, HomeRoute());
  }

  @override
  void goToLogin(BuildContext context) {
    autoRouterReplace(context, login_router.LoginRoute());
  }

  @override
  Future<void> navigateAfterAuth(BuildContext context) async {
    goToHome(context);
  }
}


Router de la app
// router_provider.dart
  
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:package_login/core/configs/router/router_provider.gr.dart'; // ← IMPORTA del package
import '../../../presentation/screens/login.dart';
import 'router_provider.gr.dart';

part 'app_router.dart';

final appRouter = AppRouter();

void autoRouterReplace(BuildContext context, PageRouteInfo route) {
  context.router.replace(route);
}

// app_router.dart
part of 'router_provider.dart';

@AutoRouterConfig(replaceInRouteName: 'Screen,Route')
class AppRouter extends RootStackRouter {
  @override
  RouteType get defaultRouteType =>
      CustomRouteType(transitionsBuilder: TransitionsBuilders.fadeIn);

  @override
  List<AutoRoute> get routes => [
    // Estas 2 vienen de package_login
    AutoRoute(page: SplashRoute.page, initial: true),
    AutoRoute(page: LoginRoute.page),

    // Esta LA CREAS tú en login.dart
    AutoRoute(page: HomeRoute.page),
  ];
}
️
  
  
  
Configuración de Flavors
// flavors.dart
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


//build.gradle.tks
plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.example.ssays_bitacora"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.ssays_bitacora"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    flavorDimensions += "environment"

    productFlavors {
        create("dev") {
            dimension = "environment"
            applicationIdSuffix = ".dev"
            resValue("string", "app_name", "Bitácora SSAYS Dev")
        }
        create("prod") {
            dimension = "environment"
            resValue("string", "app_name", "Bitácora SSAYS")
        }
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}

flutter {
    source = "../.."
}


️Build configuration
// pubspec.yaml
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
  hive: ^2.2.3
  hive_flutter: ^1.1.0

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

//makefile
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
	$(FLUTTER) run -t lib/main_dev.dart --flavor dev

run-prod:
	$(FLUTTER) run -t lib/main_prod.dart --flavor prod

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
