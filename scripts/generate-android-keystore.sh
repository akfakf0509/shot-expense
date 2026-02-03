#!/bin/bash

# Generate debug keystore for Android APK signing
# This ensures APKs can be installed on devices
# 
# ⚠️  WARNING: This debug keystore uses standard Android debug credentials
# and should NEVER be used for production releases or Play Store distribution.
# For production, generate a separate release keystore with secure credentials.

set -e

ANDROID_DIR="android/app"
KEYSTORE_FILE="$ANDROID_DIR/debug.keystore"

if [ ! -d "$ANDROID_DIR" ]; then
    echo "Error: Android directory not found. Please run 'pnpm run cap:add:android' first."
    exit 1
fi

if [ -f "$KEYSTORE_FILE" ]; then
    echo "✓ Keystore already exists at $KEYSTORE_FILE"
    exit 0
fi

echo "Generating debug keystore for APK signing..."
echo "⚠️  Using standard debug credentials - NOT suitable for production!"
keytool -genkey -v \
    -keystore "$KEYSTORE_FILE" \
    -alias androiddebugkey \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass android \
    -keypass android \
    -dname "CN=Android Debug,O=Android,C=US"

echo "✓ Debug keystore generated successfully at $KEYSTORE_FILE"
echo ""
echo "The APK will now be properly signed and installable on Android devices."
echo "⚠️  For production releases, create a separate release keystore with secure credentials."
