import {StyleSheet} from 'react-native';
import {COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY} from './theme';

/**
 * Common styles that can be reused across components
 */

// Card styles for containers
export const cardStyles = StyleSheet.create({
  default: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.regular,
    padding: SPACING.regular,
    ...SHADOWS.medium,
  },
  flat: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.regular,
    padding: SPACING.regular,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  compact: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.regular,
    padding: SPACING.medium,
    ...SHADOWS.small,
  },
});

// Text styles
export const textStyles = StyleSheet.create({
  title: {
    fontSize: TYPOGRAPHY.size.title,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.medium,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.large,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.small,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.size.medium,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    paddingBottom: SPACING.small,
  },
  body: {
    fontSize: TYPOGRAPHY.size.regular,
    color: COLORS.text.secondary,
    marginBottom: SPACING.regular,
  },
  label: {
    fontSize: TYPOGRAPHY.size.regular,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: SPACING.tiny,
  },
  caption: {
    fontSize: TYPOGRAPHY.size.small,
    color: COLORS.text.tertiary,
  },
});

// Button styles
export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.small,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.regular,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.small,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.regular,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.regular,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: COLORS.text.inversePrimary,
    fontWeight: '600',
    fontSize: TYPOGRAPHY.size.regular,
  },
  secondaryText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: TYPOGRAPHY.size.regular,
  },
  linkText: {
    color: COLORS.text.link,
    fontSize: TYPOGRAPHY.size.regular,
  },
});

// Layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  column: {
    flexDirection: 'column',
  },
  padding: {
    padding: SPACING.regular,
  },
  marginBottom: {
    marginBottom: SPACING.regular,
  },
});

// Form styles
export const formStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: SPACING.regular,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: BORDER_RADIUS.small,
    paddingHorizontal: SPACING.medium,
    fontSize: TYPOGRAPHY.size.regular,
    color: COLORS.text.primary,
    backgroundColor: COLORS.white,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.size.small,
    marginTop: SPACING.tiny,
  },
});

// List item styles
export const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.regular,
    marginHorizontal: SPACING.regular,
    marginVertical: SPACING.small,
    padding: SPACING.medium,
    ...SHADOWS.small,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.tiny,
  },
});
