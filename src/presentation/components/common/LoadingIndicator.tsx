import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text, ViewStyle} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '../../styles/theme';
import {layoutStyles, textStyles} from '../../styles/commonStyles';

interface LoadingIndicatorProps {
  /**
   * Optional text to display below the spinner
   */
  text?: string;
  
  /**
   * Size of the loading indicator
   * @default 'large'
   */
  size?: 'small' | 'large';
  
  /**
   * Color of the loading indicator
   * @default theme primary color
   */
  color?: string;
  
  /**
   * Custom style for the container
   */
  style?: ViewStyle;
  
  /**
   * Whether to show the loading indicator
   * @default true
   */
  isVisible?: boolean;
}

/**
 * A reusable loading indicator component that shows a spinner
 * and optional text message
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  text,
  size = 'large',
  color = COLORS.primary,
  style,
  isVisible = true,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layoutStyles.centered,
    padding: SPACING.large,
  },
  text: {
    ...textStyles.caption,
    marginTop: SPACING.medium,
    textAlign: 'center',
  },
}); 