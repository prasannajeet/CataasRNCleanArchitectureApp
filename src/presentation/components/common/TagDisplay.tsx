import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS} from '../../styles/theme';

/**
 * Properties for an individual tag
 */
export interface TagProps {
  /**
   * Tag text/label
   */
  label: string;
  
  /**
   * Optional identifier for the tag
   */
  id?: string | number;
  
  /**
   * Optional value for the tag
   */
  value?: any;
}

interface TagDisplayProps {
  /**
   * Array of tag data
   */
  tags: TagProps[];
  
  
  /**
   * Custom style for the container
   */
  containerStyle?: ViewStyle;
  
  /**
   * Custom style for individual tags
   */
  tagStyle?: ViewStyle;
  
  /**
   * Custom style for tag text
   */
  tagTextStyle?: TextStyle;
  
  /**
   * Whether the tag container should be scrollable
   * @default true
   */
  scrollable?: boolean;
  
  /**
   * Whether the tags should wrap to multiple lines
   * (has no effect if scrollable is true)
   * @default false
   */
  wrap?: boolean;

}

/**
 * A reusable component to display a collection of tags with various configurations
 */
export const TagDisplay: React.FC<TagDisplayProps> = ({
  tags,
  containerStyle,
  tagStyle,
  tagTextStyle,
  scrollable = true,
  wrap = false,
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  const renderTag = (tag: TagProps, index: number) => {
    const uniqueKey = tag.id?.toString() || `tag-${tag.label}-${index}`;
    
    const tagComponent = (
      <View
        style={[styles.tag, tagStyle]}>
        <Text style={[styles.tagText, tagTextStyle]}>{tag.label}</Text>
      </View>
    );
    
    return (
      <View key={uniqueKey}>
        {tagComponent}
      </View>
    );
  };

  const tagsContent = (
    <View style={[
      styles.container, 
      wrap ? styles.wrapContainer : styles.rowContainer, 
      containerStyle
    ]}>
      {tags.map(renderTag)}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {tagsContent}
      </ScrollView>
    );
  }

  return tagsContent;
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: SPACING.tiny,
  },
  container: {
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.pill,
    paddingVertical: SPACING.tiny,
    paddingHorizontal: SPACING.medium,
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  },
  tagText: {
    fontSize: TYPOGRAPHY.size.small,
    color: COLORS.primary,
  },
  moreTag: {
    backgroundColor: COLORS.divider,
  },
  moreTagText: {
    color: COLORS.text.secondary,
  },
}); 