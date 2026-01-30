# Android 빌드 문제 해결 가이드

## 문제 요약

이 프로젝트의 Android 빌드가 실패하는 주요 원인과 해결 방법을 설명합니다.

## 발견된 문제들

### 1. Node.js 버전 문제

**문제:**
- 프로젝트가 Node.js 24 이상을 요구했지만, Capacitor CLI는 실제로 Node.js 22 이상만 필요합니다.
- 불필요하게 높은 버전 요구사항으로 인해 많은 환경에서 빌드가 실패했습니다.

**해결:**
- `package.json`의 `engines.node`를 `>=24.13.0`에서 `>=22.0.0`로 변경
- `README.md`의 요구사항을 Node.js 24+에서 22+로 업데이트

### 2. Android Gradle Plugin 버전 문제

**문제:**
- Capacitor 8.0.2가 생성하는 Android 프로젝트가 존재하지 않는 Android Gradle Plugin 버전 8.13.0을 참조합니다.
- 이는 Capacitor 패키지 자체의 버그입니다 (`node_modules/@capacitor/android/capacitor/build.gradle` 참조).
- AGP 8.13.0은 존재하지 않으며, 이로 인해 Gradle 빌드가 실패합니다.

**해결:**
- `android/build.gradle`의 AGP 버전을 8.13.0에서 8.7.3으로 변경
- Google Services Plugin 버전을 4.4.4에서 4.4.2로 변경
- Android 디렉토리를 Git에 포함하여 수정사항이 유지되도록 설정

### 3. .gitignore 설정 문제

**문제:**
- 기본적으로 `android/` 디렉토리가 `.gitignore`에 포함되어 있어, 위의 수정사항이 저장되지 않습니다.
- 사용자가 `cap add android`를 실행할 때마다 잘못된 버전의 build.gradle이 생성됩니다.

**해결:**
- `.gitignore`에서 `android/` 라인을 주석 처리
- 빌드 아티팩트만 제외하도록 설정 추가:
  - `android/.gradle/`
  - `android/.idea/`
  - `android/build/`
  - `android/app/build/`
  - `android/local.properties`
  - `android/*.iml`

## 빌드 방법

### 필수 요구사항

- Node.js 22 이상
- pnpm 10 이상
- JDK 17
- Android SDK Command Line Tools

### 빌드 명령어

```bash
# 의존성 설치
pnpm install

# 웹 앱 빌드
pnpm build

# Capacitor 동기화
npx cap sync android

# Android 디버그 APK 빌드
cd android && ./gradlew assembleDebug

# 또는 프로젝트 루트에서
pnpm run cap:android
```

### 빌드 출력

디버그 APK는 다음 위치에 생성됩니다:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 알려진 제약사항

### Capacitor 8.0.2의 버그

현재 사용 중인 Capacitor 8.0.2는 Android 프로젝트 생성 시 잘못된 Gradle 플러그인 버전을 설정하는 버그가 있습니다. 
이 문제는 Capacitor 팀이 수정할 때까지 이 저장소에 수정된 Android 프로젝트를 포함하여 해결했습니다.

## 향후 업그레이드 시 주의사항

Capacitor를 새 버전으로 업그레이드할 때:

1. `cap sync`를 실행하기 전에 `android/build.gradle`을 백업하세요
2. 동기화 후 AGP 버전이 올바른지 확인하세요
3. 필요시 AGP 버전을 다시 수정하세요

### AGP 버전 확인 방법

```bash
cat android/build.gradle | grep "com.android.tools.build:gradle"
```

올바른 버전 (2026년 1월 기준):
- AGP 8.7.x 또는 8.8.x (8.13.0이 아님)

## 참고 자료

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Gradle Plugin Release Notes](https://developer.android.com/studio/releases/gradle-plugin)
