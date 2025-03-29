/**
 * Central theme configuration for consistent styling across the app
 */

// Color palette
export const COLORS = {
  // Primary colors
  primary: '#0066cc',
  primaryLight: '#3399ff',
  primaryDark: '#004c99',

  // Secondary colors
  secondary: '#e8f4fd',
  secondaryLight: '#f5faff',
  secondaryDark: '#cce4f7',

  // Accent colors
  accent: '#ff6b00',
  accentLight: '#ff9d4d',
  accentDark: '#cc5500',

  // Status colors
  success: '#2e7d32',
  error: '#d32f2f',
  warning: '#f57c00',
  info: '#0288d1',

  // Gray scale
  white: '#ffffff',
  background: '#f8f8f8',
  surface: '#ffffff',
  divider: '#f0f0f0',
  disabledBackground: '#f5f5f5',
  disabledText: '#b0b0b0',

  // Text colors
  text: {
    primary: '#333333',
    secondary: '#555555',
    tertiary: '#777777',
    inversePrimary: '#ffffff',
    inverseSecondary: '#f0f0f0',
    link: '#0066cc',
  },
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  size: {
    tiny: 10,
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 24,
    title: 28,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
};

// Spacing
export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 12,
  regular: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  xxxlarge: 40,
};

// Border radius
export const BORDER_RADIUS = {
  tiny: 2,
  small: 4,
  regular: 8,
  large: 12,
  xlarge: 16,
  pill: 100,
};

// Shadow depths
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
};

// Animation timing
export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

// Z-index values for controlling component stacking
export const Z_INDEX = {
  base: 0,
  card: 1,
  dialog: 10,
  popup: 20,
  toast: 30,
  modal: 40,
};
