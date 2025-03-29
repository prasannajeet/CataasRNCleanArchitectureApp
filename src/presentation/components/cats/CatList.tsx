import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import {CatModel} from '../../../domain/entities/Cat';
import {CatListItem} from './CatListItem';
import {LoadingIndicator} from '../common/LoadingIndicator';
import {ErrorDisplay} from '../common/ErrorDisplay';
import {COLORS, SPACING} from '../../styles/theme';
import {layoutStyles, textStyles, listItemStyles} from '../../styles/commonStyles';
import { ApiError } from '../../../core/network/ApiError';
import { FlashList } from '@shopify/flash-list';

interface CatListProps {
  /**
   * Array of cats to display
   */
  cats: CatModel[];
  
  /**
   * Whether data is currently loading
   * @default false
   */
  loading?: boolean;
  
  /**
   * Error object if there was an error loading data
   */
  error?: ApiError | null;
  
  /**
   * Function to refresh the data
   */
  onRefresh?: () => void;
  
  /**
   * Function called when a cat item is selected
   */
  onSelectCat?: (cat: CatModel) => void;
}

/**
 * Component to display a list of cats with loading, error,
 * and empty states handled
 */
export const CatList: React.FC<CatListProps> = ({
  cats,
  loading = false,
  error = null,
  onRefresh,
  onSelectCat,
}) => {

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <LoadingIndicator text="Loading cats..." />
        </View>
      );
    }
    
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <ErrorDisplay
            message={error.message}
            onRetry={onRefresh}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No cat found</Text>
      </View>
    );
  };

  const estimatedItemSize: number = cats.length === 0 ? 10 : cats.length;

  return (
    <View style={[styles.container]}>
      <FlashList
        data={cats}
        renderItem={({ item }) => <CatListItem cat={item} onPress={onSelectCat} />}
        keyExtractor={item => item.id}
        estimatedItemSize={estimatedItemSize}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          ) : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layoutStyles.container,
  },
  flexGrow: {
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    ...layoutStyles.centered,
    padding: SPACING.large,
  },
  separator: {
    ...listItemStyles.separator,
  },
  emptyText: {
    ...textStyles.body,
    textAlign: 'center',
  },
});
