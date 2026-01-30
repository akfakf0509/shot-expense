# Android 빌드 문제 해결 가이드

## 문제 요약

Capacitor 8.0.2는 Android 프로젝트 생성 시 존재하지 않는 Android Gradle Plugin 버전을 참조하는 버그가 있습니다. 이로 인해 Android 빌드가 실패합니다.

## 발견된 문제

### Android Gradle Plugin 버전 문제

**문제:**
- Capacitor 8.0.2가 생성하는 Android 프로젝트가 **존재하지 않는** Android Gradle Plugin 버전 **8.13.0**을 참조합니다.
- 이는 Capacitor 패키지 자체의 버그입니다 (`node_modules/@capacitor/android/capacitor/build.gradle:24` 참조).
- AGP 8.13.0은 2026년 1월 현재 존재하지 않으며, 이로 인해 Gradle이 의존성을 해결할 수 없어 빌드가 실패합니다.

**오류 메시지:**
```
Could not resolve com.android.tools.build:gradle:8.13.0.
Could not GET 'https://dl.google.com/dl/android/maven2/...'
```

## 해결 방법

Android 플랫폼 추가 후 `android/build.gradle` 파일을 수동으로 수정해야 합니다.

### 단계별 가이드

1. **Android 플랫폼 추가**
   ```bash
   pnpm run cap:add:android
   ```

2. **build.gradle 수정**
   
   `android/build.gradle` 파일을 열고 다음 라인을 찾습니다:
   ```gradle
   classpath 'com.android.tools.build:gradle:8.13.0'
   classpath 'com.google.gms:google-services:4.4.4'
   ```
   
   다음과 같이 수정합니다:
   ```gradle
   classpath 'com.android.tools.build:gradle:8.7.3'
   classpath 'com.google.gms:google-services:4.4.2'
   ```

3. **빌드 실행**
   ```bash
   pnpm run cap:android
   ```

### 자동 수정 스크립트

편의를 위해 다음 스크립트를 사용할 수 있습니다:

```bash
# Android 플랫폼 추가
pnpm run cap:add:android

# build.gradle 자동 수정 (Unix/Linux/macOS)
sed -i.bak 's/gradle:8.13.0/gradle:8.7.3/g' android/build.gradle
sed -i.bak 's/google-services:4.4.4/google-services:4.4.2/g' android/build.gradle

# build.gradle 자동 수정 (Windows PowerShell)
# (Get-Content android/build.gradle) -replace 'gradle:8.13.0','gradle:8.7.3' | Set-Content android/build.gradle
# (Get-Content android/build.gradle) -replace 'google-services:4.4.4','google-services:4.4.2' | Set-Content android/build.gradle
```

## 빌드 방법

### 필수 요구사항

- Node.js 24 이상
- pnpm 10 이상
- JDK 17
- Android SDK Command Line Tools

### 빌드 명령어

```bash
# 의존성 설치
pnpm install

# 웹 앱 빌드
pnpm build

# Android 플랫폼 추가
pnpm run cap:add:android

# build.gradle 수정 (위의 해결 방법 참조)
# 수동으로 수정하거나 sed 명령어 사용

# Capacitor 동기화
npx cap sync android

# Android 디버그 APK 빌드
cd android && ./gradlew assembleDebug
```

### 빌드 출력

디버그 APK는 다음 위치에 생성됩니다:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 알려진 제약사항

### Capacitor 8.0.2의 버그

현재 사용 중인 Capacitor 8.0.2는 Android 프로젝트 생성 시 잘못된 Gradle 플러그인 버전을 설정하는 버그가 있습니다.
이 문제는 Capacitor 팀이 수정할 때까지 위의 해결 방법을 사용해야 합니다.

**참고:**
- Capacitor의 향후 버전에서 이 문제가 해결될 수 있습니다.
- AGP 8.13.0이 출시되면 이 문제는 자동으로 해결됩니다.

## 향후 업그레이드 시 주의사항

Capacitor를 새 버전으로 업그레이드할 때:

1. Capacitor 릴리스 노트에서 AGP 버전 관련 수정사항 확인
2. `cap add android` 실행 후 `android/build.gradle`의 버전 확인
3. 필요시 위의 해결 방법 적용

### AGP 버전 확인 방법

```bash
cat android/build.gradle | grep "com.android.tools.build:gradle"
```

올바른 버전 (2026년 1월 기준):
- AGP 8.7.x 또는 8.8.x (8.13.0이 아직 존재하지 않음)

## 추가 정보

### 왜 android/ 디렉토리가 Git에 없나요?

Capacitor 프로젝트에서는 일반적으로 `android/` 디렉토리를 gitignore하고 개발자가 `cap add android`로 생성하도록 합니다. 이는:
- 네이티브 프로젝트가 Capacitor에 의해 관리되므로
- 각 개발자가 자신의 환경에 맞게 생성할 수 있도록
- 불필요한 네이티브 파일의 커밋을 방지하기 위함입니다.

다만, 이번 Capacitor 버그로 인해 매번 수동 수정이 필요한 불편함이 있습니다.

## 참고 자료

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Gradle Plugin Release Notes](https://developer.android.com/studio/releases/gradle-plugin)
- [Capacitor GitHub Issues](https://github.com/ionic-team/capacitor/issues)
