# Android 빌드 서명 구성 (Build Signing Configuration)

이 문서는 안드로이드 앱의 릴리즈 빌드를 위한 서명 구성에 대해 설명합니다.

## 서명 스키마 (Signing Schemes)

이 프로젝트는 다음의 APK 서명 스키마를 사용합니다:
- **v1 (JAR Signing)**: Android 1.0 이상 호환
- **v2 (APK Signature Scheme)**: Android 7.0 이상 최적화
- **v3 (APK Signature Scheme v3)**: Android 9.0 이상, 키 로테이션 지원
- **v4 (APK Signature Scheme v4)**: Android 11 이상, 스트리밍 설치 최적화

## 키스토어 정보

프로젝트에는 기본 개발용 키스토어가 포함되어 있습니다:
- **파일**: `android/release.keystore`
- **Alias**: `shot-expense-release`
- **알고리즘**: RSA 2048-bit
- **유효기간**: 10,000일

⚠️ **중요**: 이 키스토어는 **개발/테스트 용도로만** 사용해야 합니다. 프로덕션 배포 시에는 반드시 새로운 키스토어를 생성하세요.

## 프로덕션 키스토어 생성

실제 배포용 키스토어를 생성하려면:

```bash
cd android
keytool -genkey -v \
  -keystore your-app-release.keystore \
  -alias your-app-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

## 보안 구성

### 1. 키스토어 파일 보호
키스토어 파일은 절대 Git에 커밋하지 마세요:
```bash
# .gitignore에 이미 포함됨
android/*.keystore
android/*.jks
```

### 2. 비밀번호 관리

**방법 1: 로컬 gradle.properties (권장)**
```bash
cp android/gradle.properties.example android/gradle.properties.local
# gradle.properties.local 파일을 수정하여 실제 비밀번호 입력
```

**방법 2: 환경 변수**
```bash
export RELEASE_STORE_PASSWORD=your-password
export RELEASE_KEY_PASSWORD=your-password
```

**방법 3: 시스템 gradle.properties**
`~/.gradle/gradle.properties`에 추가:
```properties
RELEASE_STORE_FILE=/path/to/release.keystore
RELEASE_KEY_ALIAS=your-alias
RELEASE_STORE_PASSWORD=your-password
RELEASE_KEY_PASSWORD=your-password
```

### 3. CI/CD 환경

GitHub Actions나 다른 CI/CD 환경에서는:
1. 키스토어를 Base64로 인코딩
2. Secret으로 저장
3. 빌드 시 디코딩하여 사용

```bash
# 인코딩
base64 release.keystore > release.keystore.b64

# 디코딩 (CI/CD 스크립트에서)
echo $KEYSTORE_BASE64 | base64 -d > release.keystore
```

## 빌드 명령어

### 디버그 빌드 (서명 불필요)
```bash
pnpm run cap:android
```

### 릴리즈 APK (서명됨, v1-v4)
```bash
pnpm run cap:android:release
```
출력: `android/app/build/outputs/apk/release/app-release.apk`

### 릴리즈 AAB (Google Play용, 서명됨)
```bash
pnpm run cap:android:bundle
```
출력: `android/app/build/outputs/bundle/release/app-release.aab`

## 서명 확인

APK의 서명을 확인하려면:

```bash
# 서명 정보 확인
jarsigner -verify -verbose -certs app-release.apk

# 서명 스키마 버전 확인
apksigner verify --verbose app-release.apk
```

v4 서명이 올바르게 적용되었는지 확인:
```bash
apksigner verify --print-certs app-release.apk
```

## 문제 해결

### 서명 오류
```
Execution failed for task ':app:packageRelease'
```
→ `gradle.properties`의 비밀번호 확인

### 키스토어를 찾을 수 없음
```
java.io.FileNotFoundException: release.keystore
```
→ 키스토어 파일이 `android/` 디렉토리에 있는지 확인

### v4 서명 미지원
```
enableV4Signing requires API level 30
```
→ Android Gradle Plugin 버전 확인 (7.0 이상 필요)

## 참고 자료

- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
- [APK Signature Scheme v4](https://source.android.com/docs/security/features/apksigning/v4)
- [Capacitor Android Configuration](https://capacitorjs.com/docs/android/configuration)
