import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';
import { Platform } from 'react-native';

const RATING_KEYS = {
  HAS_RATED: 'hasRatedApp',
  ROOMS_CREATED: 'roomsCreatedCount',
  LOGIN_COUNT: 'loginCount',
  LAST_PROMPT_DATE: 'lastRatingPromptDate',
  TIMES_DECLINED: 'ratingDeclinedCount',
};

// Configuration
const RATING_CONFIG = {
  MIN_ROOMS_CREATED: 1, // Ask after first room creation
  MIN_LOGINS: 2, // Or after second login
  DAYS_BETWEEN_PROMPTS: 30, // Don't ask again for 30 days if declined
  MAX_DECLINES: 2, // Stop asking after 2 declines
};

/**
 * Check if we should show the rating prompt
 */
export const shouldShowRatingPrompt = async () => {
  try {
    // Check if user already rated
    const hasRated = await AsyncStorage.getItem(RATING_KEYS.HAS_RATED);
    if (hasRated === 'true') {
      return false;
    }

    // Check how many times user declined
    const timesDeclined = parseInt(await AsyncStorage.getItem(RATING_KEYS.TIMES_DECLINED) || '0');
    if (timesDeclined >= RATING_CONFIG.MAX_DECLINES) {
      return false;
    }

    // Check last prompt date (don't spam)
    const lastPromptDate = await AsyncStorage.getItem(RATING_KEYS.LAST_PROMPT_DATE);
    if (lastPromptDate) {
      const daysSinceLastPrompt = Math.floor(
        (Date.now() - parseInt(lastPromptDate)) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceLastPrompt < RATING_CONFIG.DAYS_BETWEEN_PROMPTS) {
        return false;
      }
    }

    // Check if user has created enough rooms
    const roomsCreated = parseInt(await AsyncStorage.getItem(RATING_KEYS.ROOMS_CREATED) || '0');
    if (roomsCreated >= RATING_CONFIG.MIN_ROOMS_CREATED) {
      return true;
    }

    // Check if user has logged in enough times
    const loginCount = parseInt(await AsyncStorage.getItem(RATING_KEYS.LOGIN_COUNT) || '0');
    if (loginCount >= RATING_CONFIG.MIN_LOGINS) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking rating prompt:', error);
    return false;
  }
};

/**
 * Show the rating prompt
 */
export const showRatingPrompt = async () => {
  try {
    // Check if store review is available
    const isAvailable = await StoreReview.isAvailableAsync();
    
    if (isAvailable) {
      // Use native in-app review (Google Play on Android)
      await StoreReview.requestReview();
      
      // Mark as prompted
      await AsyncStorage.setItem(RATING_KEYS.LAST_PROMPT_DATE, Date.now().toString());
    } else {
      // Fallback: Open store directly (for dev builds)
      console.log('Store review not available - would open store URL in production');
      // In production build, you can use Linking.openURL with Play Store URL
    }
  } catch (error) {
    console.error('Error showing rating prompt:', error);
  }
};

/**
 * Mark that user has rated the app
 */
export const markAsRated = async () => {
  try {
    await AsyncStorage.setItem(RATING_KEYS.HAS_RATED, 'true');
  } catch (error) {
    console.error('Error marking as rated:', error);
  }
};

/**
 * Mark that user declined to rate
 */
export const markAsDeclined = async () => {
  try {
    const timesDeclined = parseInt(await AsyncStorage.getItem(RATING_KEYS.TIMES_DECLINED) || '0');
    await AsyncStorage.setItem(RATING_KEYS.TIMES_DECLINED, (timesDeclined + 1).toString());
    await AsyncStorage.setItem(RATING_KEYS.LAST_PROMPT_DATE, Date.now().toString());
  } catch (error) {
    console.error('Error marking as declined:', error);
  }
};

/**
 * Increment rooms created count
 */
export const incrementRoomsCreated = async () => {
  try {
    const current = parseInt(await AsyncStorage.getItem(RATING_KEYS.ROOMS_CREATED) || '0');
    await AsyncStorage.setItem(RATING_KEYS.ROOMS_CREATED, (current + 1).toString());
  } catch (error) {
    console.error('Error incrementing rooms:', error);
  }
};

/**
 * Increment login count
 */
export const incrementLoginCount = async () => {
  try {
    const current = parseInt(await AsyncStorage.getItem(RATING_KEYS.LOGIN_COUNT) || '0');
    await AsyncStorage.setItem(RATING_KEYS.LOGIN_COUNT, (current + 1).toString());
  } catch (error) {
    console.error('Error incrementing logins:', error);
  }
};

/**
 * Check and show rating prompt if appropriate
 */
export const checkAndShowRating = async () => {
  try {
    const shouldShow = await shouldShowRatingPrompt();
    if (shouldShow) {
      // Show after a short delay so it doesn't interrupt the user flow
      setTimeout(async () => {
        await showRatingPrompt();
        await markAsRated(); // Assume they rated (Google Play doesn't tell us)
      }, 2000);
    }
  } catch (error) {
    console.error('Error checking and showing rating:', error);
  }
};
