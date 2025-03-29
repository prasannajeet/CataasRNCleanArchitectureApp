import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS} from '../../styles/theme';
import {buttonStyles, textStyles, cardStyles} from '../../styles/commonStyles';

interface ErrorDisplayProps {
  /**
   * The error message to display
   */
  message: string;
  
  /**
   * Optional error details (e.g. technical info)
   */
  details?: string;
  
  /**
   * Callback function when retry button is pressed
   */
  onRetry?: () => void;
  
  /**
   * Custom text for retry button
   * @default 'Try Again'
   */
  retryText?: string;
  
  /**
   * Custom styles for container
   */
  style?: ViewStyle;
  
  /**
   * Optional title for the error
   * @default 'Something went wrong'
   */
  title?: string;
}

/**
 * A reusable error display component with optional retry functionality
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  details,
  onRetry,
  retryText = 'Try Again',
  style,
  title = 'Something went wrong',
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {details ? (
        <Text style={styles.details}>{details}</Text>
      ) : null}
      
      {onRetry ? (
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={onRetry}
          activeOpacity={0.7}>
          <Text style={styles.retryText}>{retryText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.large,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.regular,
    borderWidth: 1,
    borderColor: COLORS.error + '20', // 20% opacity version of error color
    margin: SPACING.small,
    alignItems: 'center',
  },
  title: {
    ...textStyles.subtitle,
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  message: {
    ...textStyles.body,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  details: {
    ...textStyles.caption,
    marginBottom: SPACING.regular,
    textAlign: 'center',
  },
  retryButton: {
    ...buttonStyles.primary,
    backgroundColor: COLORS.error,
    marginTop: SPACING.small,
  },
  retryText: {
    ...buttonStyles.primaryText,
  },
}); 