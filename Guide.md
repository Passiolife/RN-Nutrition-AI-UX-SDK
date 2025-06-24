# Developer Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- Yarn package manager
- Xcode (for iOS development)
- Android Studio (for Android development)
- JDK 17 (required for Android development)
- CocoaPods (for iOS dependencies)

## Getting Started

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project root
cd project

# Install dependencies
yarn
```

Add `.env` at root `example` directory

```
ENV_PASSIO_KEY = YOUR_PASSIO_KEY
```

### Step 2: iOS Setup

1. Install iOS dependencies:

```bash
cd example/ios
pod install
cd ../..
```

2. Open the iOS project in Xcode:

```bash
cd example && xed ios
```

3. Build and run the project in Xcode


### Step 3: Android Setup

1. Open Android Studio
2. Navigate to `example/android` and open the project
3. Sync Gradle files
4. Build and run the project


### Project Structure

```
├── android/           # Android native code
├── ios/              # iOS native code
├── src/              # React Native bridge code
├── example/          # Example application
└── package.json      # Project configuration
```