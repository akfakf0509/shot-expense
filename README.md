# 📸 찰칵가계부 (Shot Expense)

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
- Node.js 24 이상
- pnpm 10 이상
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

#### 4. APK 서명 설정

APK를 Android 기기에 설치하려면 올바른 서명이 필요합니다. 아래 스크립트를 실행하여 디버그 키스토어를 생성하세요:

```bash
bash scripts/generate-android-keystore.sh
```

이 과정은 한 번만 실행하면 되며, 키스토어는 자동으로 `.gitignore`에 의해 제외됩니다.

#### 5. APK 빌드

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

⚠️ **주의**: 
- 생성된 APK는 개발자 서명이 포함되어 있어 "알 수 없는 출처" 경고가 표시될 수 있습니다
- Android 기기 설정에서 "알 수 없는 출처의 앱 설치 허용"을 활성화해야 합니다
- Play Store 배포용으로는 AAB 형식을 사용하세요

#### 6. 프로덕션 서명 (선택사항)

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

⚠️ **보안 주의사항**:
- 키스토어는 반드시 강력하고 고유한 비밀번호를 사용하세요
- 키스토어와 비밀번호를 안전한 장소에 백업하세요
- 키스토어 파일과 비밀번호를 절대 공개 리포지토리에 커밋하지 마세요

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

### 코드 품질

#### 린터 (ESLint)
프로젝트에 ESLint가 설정되어 있습니다.

**린트 검사:**
```bash
pnpm lint
```

**자동 수정:**
```bash
pnpm lint:fix
```

**타입 검사:**
```bash
pnpm typecheck
```

#### 권장 규칙
- JavaScript/TypeScript 권장 규칙
- React Hooks 규칙
- React Refresh 규칙

### 개발 워크플로우
1. 웹 브라우저에서 개발: `pnpm dev`
2. 변경사항 빌드: `pnpm build`
3. Capacitor 동기화: `pnpm run cap:sync`
4. Android에서 테스트: `pnpm run cap:android`

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
- Node.js 24+
- pnpm 10+
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

#### 4. APK Signing Setup

To install the APK on Android devices, proper signing is required. Run the following script to generate a debug keystore:

```bash
bash scripts/generate-android-keystore.sh
```

This only needs to be done once, and the keystore is automatically excluded by `.gitignore`.

#### 5. Build APK

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

⚠️ **Important**: 
- Generated APKs include developer signatures and may show "unknown source" warnings
- Enable "Install apps from unknown sources" in Android device settings
- Use AAB format for Play Store distribution

#### 6. Production Signing (Optional)

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

⚠️ **Security Notes**:
- Use strong, unique passwords for release keystores
- Backup your keystore and passwords securely
- Never commit keystore files or passwords to public repositories

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

### Code Quality

#### Linter (ESLint)
The project has ESLint configured.

**Run linting:**
```bash
pnpm lint
```

**Auto-fix issues:**
```bash
pnpm lint:fix
```

**Type checking:**
```bash
pnpm typecheck
```

#### Recommended Rules
- JavaScript/TypeScript recommended rules
- React Hooks rules
- React Refresh rules

### Development Workflow
1. Develop in browser: `pnpm dev`
2. Build changes: `pnpm build`
3. Sync with Capacitor: `pnpm run cap:sync`
4. Test on Android: `pnpm run cap:android`

### License
MIT License

---

Made with ❤️ by akfakf0509
