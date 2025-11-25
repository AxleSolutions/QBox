# QBox Android Build Guide

## Prerequisites

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Create Expo Account**
   - Sign up at https://expo.dev/signup
   - Login: `eas login`

## Build Steps

### 1. Configure Project

Run this command in the QBox folder:
```bash
eas build:configure
```

This will link your project to EAS Build.

### 2. Build APK (for testing)

```bash
eas build --platform android --profile preview
```

This creates an APK that you can install on any Android device for testing.

### 3. Build AAB (for Play Store)

```bash
eas build --platform android --profile production
```

This creates an Android App Bundle (.aab) file required for Play Store submission.

## After Build Completes

1. Download the APK/AAB from the Expo dashboard
2. For APK: Install directly on Android device for testing
3. For AAB: Upload to Google Play Console

## Play Store Submission

### Step 1: Create Developer Account
- Go to https://play.google.com/console
- Pay one-time $25 registration fee
- Complete account setup

### Step 2: Create App
1. Click "Create App"
2. Fill in app details:
   - App name: QBox
   - Default language: English
   - App or game: App
   - Free or paid: Free

### Step 3: Upload AAB
1. Go to "Production" → "Create new release"
2. Upload the .aab file from EAS build
3. Fill in release notes

### Step 4: Complete Store Listing
Required information:
- **App name**: QBox
- **Short description**: Anonymous Q&A platform for students and lecturers
- **Full description**: 
  ```
  QBox is an interactive Q&A platform designed for educational environments. 
  Students can ask questions anonymously during lectures, while lecturers 
  can manage and respond to questions in real-time.
  
  Features:
  - Anonymous question submission
  - Real-time question updates
  - Upvote questions
  - Lecturer panel for managing Q&A sessions
  - Create and join rooms with unique codes
  ```
- **App icon**: 512x512px (use logo from assets/Logo/)
- **Feature graphic**: 1024x500px
- **Screenshots**: Minimum 2 (capture from app)
- **Category**: Education
- **Content rating**: Complete questionnaire
- **Privacy policy**: Required (create one)

### Step 5: Set Up App Content
1. Privacy Policy (required)
2. Target audience
3. Content rating
4. App access (all features accessible)

### Step 6: Review and Publish
1. Complete all sections
2. Click "Send for review"
3. Wait for Google Play review (1-7 days)

## Important Notes

- **Version updates**: Increment versionCode in app.json for each release
- **Testing**: Test APK thoroughly before submitting AAB to Play Store
- **Server URL**: Make sure your backend API URL is set correctly in production
- **Icons**: Ensure you have proper app icon (1024x1024px) in assets folder

## Build Profiles

- **preview**: Builds APK for testing
- **production**: Builds AAB for Play Store

## Troubleshooting

### Build fails
- Check if all dependencies are installed
- Verify app.json configuration
- Check EAS dashboard for error logs

### Icon issues
- Ensure icon is 1024x1024px PNG
- Place in assets/Logo/logo.png

### Version conflicts
- Increment version in app.json
- Increment versionCode for Android

## Commands Reference

```bash
# Login to Expo
eas login

# Configure project
eas build:configure

# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production

# Check build status
eas build:list

# Submit to Play Store (after AAB is ready)
eas submit --platform android
```

## Next Steps After Play Store Approval

1. Monitor reviews and ratings
2. Respond to user feedback
3. Plan updates and new features
4. Track crashes with error monitoring

---

For more help: https://docs.expo.dev/build/introduction/
