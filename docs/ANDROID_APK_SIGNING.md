# Android APK 설치 문제 해결 가이드

## 문제 설명

Android 기기에서 APK 파일을 설치할 때 "신뢰할 수 없는 출처" 또는 "알 수 없는 출처"라는 오류가 발생하는 경우가 있습니다. 이는 APK가 올바르게 서명되지 않았거나, Android 기기의 보안 설정이 활성화되어 있기 때문입니다.

## 해결 방법

### 1. APK 서명 설정 (개발자용)

APK를 빌드하기 전에 올바른 서명 설정이 필요합니다:

```bash
# Android 플랫폼 추가 (최초 1회)
pnpm run cap:add:android

# 디버그 키스토어 생성 (최초 1회)
bash scripts/generate-android-keystore.sh

# APK 빌드
pnpm run cap:android
```

생성된 APK 위치: `android/app/build/outputs/apk/debug/app-debug.apk`

### 2. Android 기기에서 설치 허용 (사용자용)

APK를 설치하려는 사용자는 다음 설정을 활성화해야 합니다:

#### Android 8.0 이상
1. 설정 → 생체 인식 및 보안 (또는 보안)
2. "알 수 없는 출처에서 설치" 항목 찾기
3. APK를 설치할 앱(파일 관리자 또는 브라우저)에 대해 권한 허용

#### Android 7.1 이하
1. 설정 → 보안
2. "알 수 없는 출처" 옵션 활성화

### 3. 기술적 배경

#### 서명이 중요한 이유
- Android는 보안을 위해 모든 APK에 디지털 서명을 요구합니다
- 서명은 APK가 변조되지 않았음을 보증합니다
- 동일한 서명을 가진 APK만 앱을 업데이트할 수 있습니다

#### 디버그 vs 릴리즈 서명
- **디버그 서명**: 개발 및 테스트용, 고정된 비밀번호 사용
- **릴리즈 서명**: 프로덕션 배포용, 개발자가 관리하는 키스토어 사용

이 프로젝트는 디버그 키스토어를 사용하여 APK에 일관된 서명을 제공합니다.

## CI/CD 자동화

GitHub Actions 워크플로우는 자동으로 키스토어를 생성하고 APK에 서명합니다:
- CI 워크플로우: PR 빌드 시 자동 서명
- 릴리즈 워크플로우: main 브랜치 푸시 시 서명된 APK 릴리즈

## 문제 해결

### 키스토어가 없다는 오류
```bash
bash scripts/generate-android-keystore.sh
```

### 이미 다른 서명으로 설치된 앱이 있는 경우
1. 기존 앱 제거
2. 새 APK 설치

### Play Store 배포
Play Store에 배포하려면 별도의 릴리즈 키스토어를 생성하고 사용해야 합니다:
```bash
keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
```

⚠️ **중요한 보안 주의사항**:
- 릴리즈 키스토어는 **반드시 강력하고 고유한 비밀번호**를 사용해야 합니다
- 키스토어와 비밀번호를 **안전한 장소에 백업**하세요
- 키스토어를 잃어버리면 앱을 업데이트할 수 없습니다
- 키스토어 파일과 비밀번호를 **절대 공개 리포지토리에 커밋하지 마세요**
- 비밀번호는 환경 변수나 보안 볼트에 저장하세요

---

# Android APK Installation Issue Resolution Guide

## Problem Description

When installing an APK file on Android devices, you may encounter an "untrusted source" or "unknown source" error. This occurs because the APK is not properly signed or Android security settings are enabled.

## Solutions

### 1. APK Signing Setup (For Developers)

Before building the APK, proper signing configuration is required:

```bash
# Add Android platform (first time only)
pnpm run cap:add:android

# Generate debug keystore (first time only)
bash scripts/generate-android-keystore.sh

# Build APK
pnpm run cap:android
```

Generated APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### 2. Allow Installation on Android Device (For Users)

Users installing the APK need to enable this setting:

#### Android 8.0 and above
1. Settings → Biometrics and security (or Security)
2. Find "Install unknown apps"
3. Allow permission for the app installing the APK (File Manager or Browser)

#### Android 7.1 and below
1. Settings → Security
2. Enable "Unknown sources" option

### 3. Technical Background

#### Why Signing Matters
- Android requires all APKs to be digitally signed for security
- Signing ensures the APK has not been tampered with
- Only APKs with the same signature can update an app

#### Debug vs Release Signing
- **Debug signing**: For development and testing, uses fixed password
- **Release signing**: For production distribution, uses developer-managed keystore

This project uses a debug keystore to provide consistent signing for APKs.

## CI/CD Automation

GitHub Actions workflows automatically generate keystore and sign APKs:
- CI workflow: Auto-signs on PR builds
- Release workflow: Signs and releases APK on main branch push

## Troubleshooting

### Keystore not found error
```bash
bash scripts/generate-android-keystore.sh
```

### App already installed with different signature
1. Uninstall existing app
2. Install new APK

### Play Store Distribution
For Play Store distribution, generate and use a separate release keystore:
```bash
keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
```

⚠️ **Critical Security Notes**:
- Release keystore **must use strong, unique passwords**
- **Backup your keystore and passwords** in a secure location
- If you lose your keystore, you cannot update your app
- **Never commit** keystore files or passwords to public repositories
- Store passwords in environment variables or secure vaults
