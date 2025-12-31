import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen, Button } from '../components';
import { colors, spacing, typography, borderRadius } from '../theme';

const { width } = Dimensions.get('window');

const tutorialData = [
  {
    id: '1',
    emoji: '🎓',
    title: 'Welcome to QBox',
    description: 'An anonymous Q&A platform designed for interactive classroom sessions where students can ask questions freely without hesitation.',
  },
  {
    id: '2',
    emoji: '🙋',
    title: 'Students: Ask Anonymously',
    description: 'Join a room with a code, ask questions anonymously, upvote questions you find interesting, and see answers in real-time.',
  },
  {
    id: '3',
    emoji: '👨‍🏫',
    title: 'Lecturers: Engage Better',
    description: 'Create rooms, see all questions, identify popular topics through upvotes, and provide answers that everyone can see instantly.',
  },
  {
    id: '4',
    emoji: '📱',
    title: 'Share with iPhone Users',
    description: 'QBox is available for Android on Play Store. iPhone users can access the full web version at qbox-web.vercel.app',
  },
];

export const TutorialScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < tutorialData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hasSeenTutorial', 'true');
    navigation.replace('Onboarding');
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {/* Skip Button */}
        {currentIndex < tutorialData.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Tutorial Slides */}
        <FlatList
          ref={flatListRef}
          data={tutorialData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.flatList}
        />

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {tutorialData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Next/Get Started Button */}
        <Button
          title={currentIndex === tutorialData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  skipText: {
    fontSize: typography.md,
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width: width - spacing.lg * 2,
    marginHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  emoji: {
    fontSize: 80,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.md,
    paddingHorizontal: spacing.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  button: {
    marginBottom: spacing.lg,
    marginHorizontal: spacing.lg,
  },
});

export default TutorialScreen;
