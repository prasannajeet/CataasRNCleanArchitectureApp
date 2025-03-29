import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {CatDetailView} from '../components/cats/CatDetailView';
import {COLORS} from '../styles/theme';
import {layoutStyles} from '../styles/commonStyles';
import {useRoute, RouteProp} from '@react-navigation/native';
import {ScreenList} from '../navigation/AppNavigator';
import {useCatDetailsViewModel} from '../hooks/useCatDetailsViewModel';
import {LoadingIndicator} from '../components/common/LoadingIndicator';
import {ErrorDisplay} from '../components/common/ErrorDisplay';

type CatDetailScreenRouteProp = RouteProp<ScreenList, 'CatDetailScreen'>;

/**
 * Screen component that displays detailed information about a cat
 */
export const CatDetailScreen: React.FC = () => {
  const route = useRoute<CatDetailScreenRouteProp>();
  const { catId } = route.params;
  const { cat, loading, error, refetch } = useCatDetailsViewModel(catId);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ErrorDisplay
            message={error.message}
            onRetry={refetch}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!cat) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ErrorDisplay
            message="Cat not found"
            onRetry={refetch}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CatDetailView
          cat={cat}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    ...layoutStyles.container,
    flex: 1,
  },
  detailContainer: {
    flex: 1,
  },
}); 