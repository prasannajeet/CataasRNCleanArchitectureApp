import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {CatModel} from '../../../domain/entities/Cat';
import {ImageComponent} from '../common/ImageComponent';
import {TagDisplay, TagProps} from '../common/TagDisplay';
import {COLORS, SPACING, TYPOGRAPHY} from '../../styles/theme';
import {textStyles, cardStyles, layoutStyles} from '../../styles/commonStyles';

interface CatDetailViewProps {
  cat: CatModel;
}

/**
 * A component to display detailed information about a cat
 */
export const CatDetailView: React.FC<CatDetailViewProps> = ({
  cat,
}) => {
  const {height: windowHeight} = useWindowDimensions();
  const imageHeight = windowHeight * 0.4;
  
  // Convert tags to TagProps format
  const tagProps: TagProps[] = cat.tags.map(tag => ({
    label: tag,
    id: tag,
  }));
  

  return (
    <ScrollView 
      style={[styles.container]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      
      <View style={styles.imageContainer}>
          <ImageComponent
            source={{uri: cat.imageUrl}}
            width="100%"
            height={imageHeight}
            resizeMode="contain"
            containerStyle={styles.image}
          />
      </View>
      
      <View style={styles.infoContainer}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID:</Text>
            <Text style={styles.infoValue}>{cat.id}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created:</Text>
            <Text style={styles.infoValue}>{cat.formattedCreationDate}</Text>
          </View>

          {cat.tags.length > 0 && (
            <TagDisplay
              tags={tagProps}
              scrollable={false}
              wrap={true}
              containerStyle={styles.tagsContainer}
              tagStyle={styles.tag}
              tagTextStyle={styles.tagText}
            />
        )}
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layoutStyles.container,
  },
  contentContainer: {
    paddingBottom: SPACING.large,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
  },
  image: {
    backgroundColor: COLORS.white,
  },
  infoContainer: {
    padding: SPACING.regular,
  },
  section: {
    ...cardStyles.default,
    marginBottom: SPACING.regular,
  },
  sectionTitle: {
    ...textStyles.sectionTitle,
  },
  infoRow: {
    ...layoutStyles.row,
    marginBottom: SPACING.small,
  },
  infoLabel: {
    ...textStyles.label,
    width: 70,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.size.regular,
    color: COLORS.text.primary,
    flex: 1,
  },
  urlText: {
    color: COLORS.text.link,
  },
  tagsContainer: {
    marginTop: SPACING.small,
  },
  tag: {
    backgroundColor: COLORS.secondary,
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  },
  tagText: {
    color: COLORS.primary,
  },
}); 