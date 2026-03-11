# Mobile Quick Reference

## Search Commands

```bash
# Domain search
python3 skills/mobile/scripts/search.py "<query>" --domain <domain>

# Stack search
python3 skills/mobile/scripts/search.py "<query>" --stack <stack>

# Architecture system (for new projects)
python3 skills/mobile/scripts/search.py "<description>" --arch-system -p "ProjectName"
```

## Available Domains

| Domain         | Alias     | Description                                      |
| -------------- | --------- | ------------------------------------------------ |
| patterns       | pattern   | Design patterns (MVVM, BLoC, Clean Architecture) |
| packages       | package   | Popular mobile libraries and packages            |
| error-handling | error     | Error and crash handling strategies              |
| performance    | perf      | Mobile performance optimization techniques       |
| testing        | test      | Testing approaches (unit, widget, integration)   |
| security       | security  | Mobile security best practices                   |
| interfaces     | interface | UI/UX design guidelines                          |
| architecture   | arch      | Mobile application architecture patterns         |
| idioms         | idiom     | Dart/platform-specific conventions               |
| anti-patterns  | anti      | Common mobile development mistakes               |
| tooling        | tooling   | Mobile development tools                         |
| dependency     | dep       | Dependency management tools and practices        |

## Available Stacks

| Stack                | Description                      |
| -------------------- | -------------------------------- |
| flutter              | Flutter + Dart (default)         |
| react-native         | React Native + TypeScript        |
| swiftui              | SwiftUI (iOS native)             |
| jetpack-compose      | Jetpack Compose (Android native) |
| kotlin-multiplatform | Kotlin Multiplatform (KMP)       |
| capacitor            | Capacitor (web-to-native)        |
| expo                 | Expo (managed React Native)      |
| native-ios           | Native iOS (UIKit/Swift)         |
| native-android       | Native Android (Kotlin/XML)      |

## Example Searches

```bash
# Find MVVM patterns
python3 skills/mobile/scripts/search.py "mvvm viewmodel state" --domain pattern

# Find Flutter state management
python3 skills/mobile/scripts/search.py "riverpod provider state" --stack flutter

# Find security best practices
python3 skills/mobile/scripts/search.py "secure storage keychain" --domain security

# Generate full architecture for e-commerce app
python3 skills/mobile/scripts/search.py "e-commerce product catalog cart checkout" --arch-system -p "ShopApp"
```
