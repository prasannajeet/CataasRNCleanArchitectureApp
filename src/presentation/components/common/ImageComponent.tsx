import React, {useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ViewStyle,
  ImageSourcePropType,
  ImageResizeMode,
} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS} from '../../styles/theme';
import {textStyles, layoutStyles} from '../../styles/commonStyles';

interface ImageComponentProps {
  /**
   * Source URI for the image
   */
  source: ImageSourcePropType;
  
  /**
   * Width of the image
   */
  width: number | string;
  
  /**
   * Height of the image
   */
  height: number | string;
  
  /**
   * Custom style for the image
   */
  imageStyle?: ImageStyle;
  
  /**
   * Custom style for the container
   */
  containerStyle?: ViewStyle;
  
  /**
   * Resize mode for the image
   * @default 'cover'
   */
  resizeMode?: ImageResizeMode;
  
  /**
   * Loading indicator color
   * @default theme primary color
   */
  loadingColor?: string;
  
  /**
   * Error text to display when image loading fails
   * @default 'Failed to load image'
   */
  errorText?: string;
  
  /**
   * Placeholder image to show before loading
   */
  placeholderSource?: ImageSourcePropType;
  
  /**
   * Whether to show loading indicator
   * @default true
   */
  showLoading?: boolean;
}

/**
 * A reusable image component that handles loading, error states,
 * and provides placeholder functionality
 */
export const ImageComponent: React.FC<ImageComponentProps> = ({
  source,
  width,
  height,
  imageStyle,
  containerStyle,
  resizeMode = 'cover',
  loadingColor = COLORS.primary,
  errorText = 'Failed to load image',
  placeholderSource,
  showLoading = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const baseStyle: ImageStyle = {
    width,
    height,
  };

  return (
    <View
      style={[
        styles.container,
        {width, height},
        containerStyle,
      ]}>
      {/* Main Image */}
      {!hasError && (
        <Image
          source={source}
          style={[baseStyle, imageStyle]}
          resizeMode={resizeMode}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
      )}

      {/* Placeholder Image (shown if there's an error and a placeholder is provided) */}
      {hasError && placeholderSource && (
        <Image
          source={placeholderSource}
          style={[baseStyle, imageStyle]}
          resizeMode={resizeMode}
        />
      )}

      {/* Error Text (shown if there's an error and no placeholder) */}
      {hasError && !placeholderSource && (
        <View style={[styles.errorContainer, baseStyle]}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}

      {/* Loading Indicator */}
      {isLoading && showLoading && (
        <View style={[styles.loadingContainer, baseStyle]}>
          <ActivityIndicator color={loadingColor} size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...layoutStyles.centered,
    backgroundColor: 'rgba(240, 240, 240, 0.7)',
  },
  errorContainer: {
    ...layoutStyles.centered,
    backgroundColor: COLORS.background,
  },
  errorText: {
    ...textStyles.caption,
    color: COLORS.text.secondary,
    textAlign: 'center',
    padding: SPACING.small,
  },
}); 