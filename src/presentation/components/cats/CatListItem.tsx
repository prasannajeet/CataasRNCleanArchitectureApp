import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {CatModel} from '../../../domain/entities/Cat';
import {ImageComponent} from '../common/ImageComponent';
import {TagDisplay} from '../common/TagDisplay';
import {COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY} from '../../styles/theme';
import {listItemStyles} from '../../styles/commonStyles';

interface CatListItemProps {
  /**
   * The cat data to display
   */
  cat: CatModel;
  
  /**
   * Callback when the item is pressed
   */
  onPress?: (cat: CatModel) => void;
  
  /**
   * Custom style for the container
   */
  style?: ViewStyle;
}

/**
 * A component to display a cat item in a list
 */
export const CatListItem: React.FC<CatListItemProps> = ({
  cat,
  onPress,
  style
}) => {
  const tagProps = cat.tags.map(tag => ({
    label: tag,
    id: tag,
  }));

  const handlePress = () => {
    if (onPress) {
      onPress(cat);
    }
  };


  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <ImageComponent
          source={{uri: cat.thumbnailUrl}}
          width="100%"
          height="100%"
          resizeMode="cover"
          containerStyle={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.id} numberOfLines={1} ellipsizeMode="tail">
          ID: {cat.id}
        </Text>
        
        <Text style={styles.date}>
          Created at: {cat.formattedCreationDate}
        </Text>
        
        {cat.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <TagDisplay
              tags={tagProps}
              tagStyle={styles.tag}
              tagTextStyle={styles.tagText}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...listItemStyles.container,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.regular,
    overflow: 'hidden',
  },
  image: {
    borderRadius: BORDER_RADIUS.regular,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.medium,
    justifyContent: 'center',
  },
  id: {
    fontSize: TYPOGRAPHY.size.regular,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.tiny,
  },
  owner: {
    fontSize: TYPOGRAPHY.size.regular,
    color: COLORS.text.secondary,
    marginBottom: SPACING.tiny,
  },
  date: {
    fontSize: TYPOGRAPHY.size.small,
    color: COLORS.text.tertiary,
    marginBottom: SPACING.tiny,
  },
  size: {
    fontSize: TYPOGRAPHY.size.small,
    color: COLORS.text.tertiary,
    marginBottom: SPACING.tiny,
  },
  tagsContainer: {
    marginTop: SPACING.tiny,
  },
  tag: {
    backgroundColor: COLORS.secondary,
    marginRight: SPACING.tiny,
    marginBottom: SPACING.tiny,
    paddingVertical: SPACING.tiny / 2,
    paddingHorizontal: SPACING.small,
  },
  tagText: {
    fontSize: TYPOGRAPHY.size.small,
    color: COLORS.primary,
  },
}); 