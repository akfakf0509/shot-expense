# 📸 찰칵가계부 (Shot Expense)

[![CI](https://github.com/akfakf0509/shot-expense/actions/workflows/ci.yml/badge.svg)](https://github.com/akfakf0509/shot-expense/actions/workflows/ci.yml)
[![Deploy](https://github.com/akfakf0509/shot-expense/actions/workflows/deploy.yml/badge.svg)](https://github.com/akfakf0509/shot-expense/actions/workflows/deploy.yml)

[Korean](#한국어) | [English](#english)

---

## 한국어

### 소개
찰칵가계부는 빠른 입력에 최적화된 모바일 가계부 앱입니다. React + Capacitor로 제작되어 웹과 네이티브 앱 모두에서 사용 가능합니다.

### 주요 기능
- ⚡ 초고속 지출/수입 입력
- 📱 네이티브 Android 앱 지원
- 💾 오프라인 데이터 저장
- 🎨 깔끔하고 직관적인 UI
- 📊 카테고리별 분류

### 기술 스택
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Mobile**: Capacitor 5
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Storage**: Capacitor Preferences
- **Date**: date-fns

### 시작하기

#### 필수 요구사항
- Node.js 18 이상
- pnpm 8 이상
- JDK 17 (Android 빌드용)
- Android SDK Command Line Tools (Android 빌드용)

#### 설치

1. 리포지토리 클론
```bash
git clone https://github.com/akfakf0509/shot-expense.git
cd shot-expense
```

2. 의존성 설치
```bash
pnpm install
```

3. 개발 서버 실행
```bash
pnpm dev
```

브라우저에서 http://localhost:5173 접속

#### 프로덕션 빌드
```bash
pnpm build
```

### Android 앱 빌드

#### 1. Android SDK 설치 (Android Studio 없이)

**Windows:**
```bash
# JDK 17 설치
# https://adoptium.net/ 에서 다운로드

# Android Command Line Tools 다운로드
# https://developer.android.com/studio#command-tools

# 환경 변수 설정
setx ANDROID_HOME "C:\Android\sdk"
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17"
```

**macOS/Linux:**
```bash
# Homebrew 사용
brew install openjdk@17
brew install --cask android-commandlinetools

# 환경 변수 (~/.zshrc 또는 ~/.bashrc에 추가)
export ANDROID_HOME=$HOME/Library/Android/sdk
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### 2. SDK 패키지 설치
```bash
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
sdkmanager --licenses
```

#### 3. Android 플랫폼 추가
```bash
pnpm run cap:add:android
```

#### 4. APK 빌드

**디버그 APK (테스트용):**
```bash
pnpm run cap:android
```
생성 위치: `android/app/build/outputs/apk/debug/app-debug.apk`

**릴리즈 APK (배포용):**
```bash
pnpm run cap:android:release
```

**AAB (Google Play Store용):**
```bash
pnpm run cap:android:bundle
```

#### 5. 서명 설정 (릴리즈 빌드용)

키스토어 생성:
```bash
cd android
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

`android/gradle.properties`에 추가:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-password
MYAPP_RELEASE_KEY_PASSWORD=your-password
```

⚠️ **주의**: `.gitignore`에 키스토어와 비밀번호 추가 필수!

### 프로젝트 구조
```
shot-expense/
├── src/
│   ├── components/        # React 컴포넌트
│   ├── store/            # Zustand 상태 관리
│   ├── utils/            # 유틸리티 함수
│   ├── types/            # TypeScript 타입
│   └── App.tsx           # 메인 앱
├── public/               # 정적 파일
├── android/              # Android 네이티브 프로젝트 (자동 생성)
├── capacitor.config.ts   # Capacitor 설정
└── package.json          # 프로젝트 설정
```

### 개발 워크플로우
1. 웹 브라우저에서 개발: `pnpm dev`
2. 변경사항 빌드: `pnpm build`
3. Capacitor 동기화: `pnpm run cap:sync`
4. Android에서 테스트: `pnpm run cap:android`

### CI/CD
이 프로젝트는 GitHub Actions를 사용한 자동화된 CI/CD 파이프라인을 포함합니다:

#### CI 워크플로우 (`.github/workflows/ci.yml`)
- **트리거**: `main`, `develop` 브랜치로의 푸시 및 풀 리퀘스트
- **작업**:
  - TypeScript 타입 체크 (`pnpm lint`)
  - 프로젝트 빌드 (`pnpm build`)
  - 빌드 아티팩트 업로드 (7일 보관)
- **Node.js 버전**: 18.x, 20.x (매트릭스 빌드)

#### 배포 워크플로우 (`.github/workflows/deploy.yml`)
- **트리거**: `main` 브랜치로의 푸시 또는 수동 실행
- **작업**:
  - 프로젝트 빌드
  - GitHub Pages에 자동 배포
- **배포 URL**: GitHub Pages 활성화 시 자동 생성

> **참고**: GitHub Pages 배포를 활성화하려면 저장소 설정에서 Pages를 활성화해야 합니다.

### 라이센스
MIT License

---

## English

### Introduction
Shot Expense (찰칵가계부) is a mobile-first expense tracking app optimized for fast input. Built with React + Capacitor, it works as both a web app and native mobile app.

### Features
- ⚡ Lightning-fast expense/income input
- 📱 Native Android app support
- 💾 Offline data storage
- 🎨 Clean and intuitive UI
- 📊 Category-based organization

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Mobile**: Capacitor 5
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Storage**: Capacitor Preferences
- **Date**: date-fns

### Getting Started

#### Prerequisites
- Node.js 18+
- pnpm 8+
- JDK 17 (for Android builds)
- Android SDK Command Line Tools (for Android builds)

#### Installation

1. Clone the repository
```bash
git clone https://github.com/akfakf0509/shot-expense.git
cd shot-expense
```

2. Install dependencies
```bash
pnpm install
```

3. Start development server
```bash
pnpm dev
```

Open http://localhost:5173 in your browser

#### Production Build
```bash
pnpm build
```

### Building for Android

#### 1. Install Android SDK (without Android Studio)

**Windows:**
```bash
# Install JDK 17
# Download from https://adoptium.net/

# Download Android Command Line Tools
# https://developer.android.com/studio#command-tools

# Set environment variables
setx ANDROID_HOME "C:\Android\sdk"
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17"
```

**macOS/Linux:**
```bash
# Using Homebrew
brew install openjdk@17
brew install --cask android-commandlinetools

# Set environment variables (add to ~/.zshrc or ~/.bashrc)
export ANDROID_HOME=$HOME/Library/Android/sdk
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### 2. Install SDK Packages
```bash
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
sdkmanager --licenses
```

#### 3. Add Android Platform
```bash
pnpm run cap:add:android
```

#### 4. Build APK

**Debug APK (for testing):**
```bash
pnpm run cap:android
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

**Release APK (for distribution):**
```bash
pnpm run cap:android:release
```

**AAB (for Google Play Store):**
```bash
pnpm run cap:android:bundle
```

#### 5. Signing Configuration (for release builds)

Generate keystore:
```bash
cd android
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Add to `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-password
MYAPP_RELEASE_KEY_PASSWORD=your-password
```

⚠️ **Important**: Add keystore and passwords to `.gitignore`!

### Project Structure
```
shot-expense/
├── src/
│   ├── components/        # React components
│   ├── store/            # Zustand state management
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   └── App.tsx           # Main app
├── public/               # Static files
├── android/              # Android native project (auto-generated)
├── capacitor.config.ts   # Capacitor configuration
└── package.json          # Project configuration
```

### Development Workflow
1. Develop in browser: `pnpm dev`
2. Build changes: `pnpm build`
3. Sync with Capacitor: `pnpm run cap:sync`
4. Test on Android: `pnpm run cap:android`

### CI/CD
This project includes automated CI/CD pipelines using GitHub Actions:

#### CI Workflow (`.github/workflows/ci.yml`)
- **Triggers**: Push and pull requests to `main` and `develop` branches
- **Tasks**:
  - TypeScript type checking (`pnpm lint`)
  - Project build (`pnpm build`)
  - Upload build artifacts (7-day retention)
- **Node.js versions**: 18.x, 20.x (matrix build)

#### Deployment Workflow (`.github/workflows/deploy.yml`)
- **Triggers**: Push to `main` branch or manual dispatch
- **Tasks**:
  - Build project
  - Automatic deployment to GitHub Pages
- **Deployment URL**: Auto-generated when GitHub Pages is enabled

> **Note**: To enable GitHub Pages deployment, activate Pages in repository settings.

### License
MIT License

---

Made with ❤️ by akfakf0509
