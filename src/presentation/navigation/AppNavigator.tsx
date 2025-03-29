import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CatsListScreen } from '../screens/CatsListScreen';
import { CatDetailScreen } from '../screens/CatDetailScreen';
import { CatModel } from '../../domain/entities/Cat';
import { COLORS, TYPOGRAPHY } from '../styles/theme';

// Define the navigation parameters for type safety
export type ScreenList = {
  CatsListScreen: undefined;
  CatDetailScreen: { catId: string };
};

const Stack = createStackNavigator<ScreenList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="CatsListScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: TYPOGRAPHY.size.large,
          },
        }}
      >
        <Stack.Screen 
          name="CatsListScreen" 
          component={CatsListScreen} 
          options={{ title: 'Cats Cats Cats!!!' }} 
        />
        <Stack.Screen 
          name="CatDetailScreen" 
          component={CatDetailScreen}
          options={({ route }) => ({ 
            title: `Cat Details` 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 