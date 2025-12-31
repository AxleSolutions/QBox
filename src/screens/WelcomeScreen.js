import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, typography } from '../theme';

const logo = require('../../assets/Logo/QBox logo png.png');

export const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Check if first time user and navigate after 3 seconds
    const timer = setTimeout(async () => {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();

      // Wait for fade out to complete
      setTimeout(async () => {
        const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTutorial');
        
        if (hasSeenTutorial === 'true') {
          // Returning user - go to onboarding
          navigation.replace('Onboarding');
        } else {
          // First time user - go to tutorial
          navigation.replace('Tutorial');
        }
      }, 600);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image 
          source={logo} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>QBox</Text>
        <Text style={styles.slogan}>Ask Freely, Learn Better</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: spacing.xl,
  },
  appName: {
    fontSize: typography.xxxl + 10,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  slogan: {
    fontSize: typography.lg,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
