import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, typography } from '../theme';

// Import screens
import {
  WelcomeScreen,
  TutorialScreen,
  OnboardingScreen,
  LoginScreen,
  MyRoomsScreen,
  JoinRoomScreen,
  CreateRoomScreen,
  RoomFeedScreen,
  AskQuestionScreen,
  LecturerPanelScreen,
  ReportsScreen,
  SettingsScreen,
} from '../screens';

const Stack = createStackNavigator();

// Screen options for a clean, modern header
const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTintColor: colors.primary,
  headerTitleStyle: {
    fontWeight: typography.semibold,
    fontSize: typography.lg,
    color: colors.textPrimary,
  },
  headerBackTitleVisible: false,
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={defaultScreenOptions}
      >
        {/* Welcome & Tutorial Flow */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen}
          options={{ headerShown: false }}
        />
        
        {/* Onboarding Flow */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        
        {/* Authentication */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Welcome' }}
        />
        
        {/* My Rooms */}
        <Stack.Screen
          name="MyRooms"
          component={MyRoomsScreen}
          options={{ title: 'My Rooms' }}
        />
        
        {/* Join/Create Room */}
        <Stack.Screen
          name="JoinRoom"
          component={JoinRoomScreen}
          options={{ title: 'Join Room' }}
        />
        <Stack.Screen
          name="CreateRoom"
          component={CreateRoomScreen}
          options={{ title: 'Create Room' }}
        />
        
        {/* Student Flow */}
        <Stack.Screen
          name="RoomFeed"
          component={RoomFeedScreen}
          options={({ navigation }) => ({
            title: 'Q&A Feed',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings', { userType: 'student' })}
                style={{ marginRight: 16 }}
              >
                <Text style={{ fontSize: 24 }}>⚙️</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AskQuestion"
          component={AskQuestionScreen}
          options={{ title: 'Ask Question' }}
        />
        
        {/* Lecturer Flow */}
        <Stack.Screen
          name="LecturerPanel"
          component={LecturerPanelScreen}
          options={({ navigation }) => ({
            title: 'Lecturer Panel',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings', { userType: 'lecturer' })}
                style={{ marginRight: 16 }}
              >
                <Text style={{ fontSize: 24 }}>⚙️</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Reports"
          component={ReportsScreen}
          options={{ title: 'Reports' }}
        />
        
        {/* Settings */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Fix for settings button component
import { TouchableOpacity, Text } from 'react-native';

export default AppNavigator;
