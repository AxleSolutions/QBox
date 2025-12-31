import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, Alert } from 'react-native';
import { Screen, Button } from '../components';
import { colors, spacing, typography, borderRadius } from '../theme';

const logo = require('../../assets/Logo/QBox logo png.png');

export const OnboardingScreen = ({ navigation }) => {
  const handleWebLinkPress = async () => {
    try {
      await Share.share({
        message: '🎓 QBox - Anonymous Q&A Platform\n\nQBox is available for Android on Google Play Store.\n\niPhone users can access QBox Web:\nhttps://qbox-web.vercel.app/\n\nAsk freely, learn better! 📚',
        title: 'Share QBox with iPhone users'
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share at this moment');
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={logo} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>QBox</Text>
        </View>

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>Ask Freely, Learn Better</Text>
          <Text style={styles.subtitle}>
            Anonymous Q&A platform for interactive classroom sessions
          </Text>
        </View>

        {/* Web Access Link */}
        <View style={styles.webAccessContainer}>
          <Text style={styles.webAccessText}>
            Share QBox Web with iPhone users
          </Text>
          <TouchableOpacity onPress={handleWebLinkPress} activeOpacity={0.7}>
            <Text style={styles.webLink}>
              Share Link
            </Text>
          </TouchableOpacity>
        </View>

        
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Join Room"
          onPress={() => navigation.navigate('JoinRoom')}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />
        
        <Button
          title="Create Room"
          onPress={() => navigation.navigate('Login')}
          variant="outline"
          size="large"
          fullWidth
          style={styles.button}
        />

        <Text style={styles.footerText}>
          Create a room if you're an instructor, or join an existing room to ask questions
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Logo section
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: typography.xxxl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  
  // Tagline section
  taglineContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  tagline: {
    fontSize: typography.xl,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.md,
  },
  
  // Web access link
  webAccessContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primaryLighter,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  webAccessText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  webLink: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    textAlign: 'center',
  },
  
  // Illustration
  illustrationContainer: {
    marginVertical: spacing.xxl,
  },
  illustration: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  illustrationEmoji: {
    fontSize: 64,
  },
  
  // Buttons
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: spacing.md,
  },
  footerText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: typography.lineHeight.relaxed * typography.sm,
  },
});

export default OnboardingScreen;
