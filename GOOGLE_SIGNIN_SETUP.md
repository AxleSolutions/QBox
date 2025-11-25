# Google Sign-In Setup Guide

## Step 1: Create Google Cloud Project

1. Go to: **https://console.cloud.google.com/**
2. Click **"Select a project"** → **"New Project"**
3. Name: `QBox`
4. Click **"Create"**

## Step 2: Enable Google Sign-In API

1. In the project, go to **APIs & Services** → **Library**
2. Search for **"Google Sign-In"** or **"Google+ API"**
3. Click **"Enable"**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **"External"** (for public use)
3. Click **"Create"**
4. Fill in:
   - **App name**: `QBox`
   - **User support email**: `axlesolutionsinfo@gmail.com`
   - **Developer contact**: `axlesolutionsinfo@gmail.com`
5. Click **"Save and Continue"**
6. **Scopes**: Skip this, click **"Save and Continue"**
7. **Test users**: Skip this, click **"Save and Continue"**
8. Click **"Back to Dashboard"**

## Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Select **"Web application"**
4. Name: `QBox Web Client`
5. **Authorized redirect URIs**: Leave empty for now
6. Click **"Create"**
7. **Copy the Client ID** (looks like: `123456789-abc.apps.googleusercontent.com`)

## Step 5: Create Android OAuth Client

1. Click **"Create Credentials"** → **"OAuth client ID"** again
2. Select **"Android"**
3. Name: `QBox Android`
4. **Package name**: `com.qbox.anonymousqa`
5. **SHA-1 certificate fingerprint**: You'll get this from EAS Build

### Getting SHA-1 from EAS Build:

Run this command:
```bash
eas credentials
```

Select:
- Platform: **Android**
- Select: **Keystore** → **View keystore details**
- Copy the **SHA1 Fingerprint**

OR get it from your build:
```bash
cd d:\Projects\QBox\QBox
npx expo fetch:android:hashes
```

6. Paste the SHA-1 into Google Cloud Console
7. Click **"Create"**
8. **Copy the Client ID** (Android)

## Step 6: Add Client IDs to Your App

You'll need TWO Client IDs:
1. **Web Client ID** - For backend verification
2. **Android Client ID** - For the app

Add to `app.json`:
```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json",
      "config": {
        "googleSignIn": {
          "apiKey": "YOUR_ANDROID_CLIENT_ID"
        }
      }
    }
  }
}
```

Add to backend `.env` (Render):
```
GOOGLE_CLIENT_ID=YOUR_WEB_CLIENT_ID
```

## Step 7: Test Google Sign-In

1. Rebuild the app: `eas build --platform android --profile preview`
2. Install on your device
3. Try **"Sign in with Google"**
4. Should see Google account picker
5. After selecting account, you're logged in!

## Troubleshooting

### "Sign in failed" error
- Check if SHA-1 is correct in Google Console
- Make sure package name matches: `com.qbox.anonymousqa`
- Verify OAuth consent screen is configured

### "Invalid client" error
- Check Web Client ID is added to backend
- Make sure Android Client ID is in app.json

### Can't see Google account picker
- Reinstall the app
- Check Google Play Services is updated on device
- Clear app data and try again

## Summary

You need:
- ✅ Google Cloud project created
- ✅ OAuth consent screen configured
- ✅ Web OAuth client (for backend)
- ✅ Android OAuth client (with SHA-1)
- ✅ Client IDs added to app and backend

After setup, users can sign in with one tap using their Google account!
