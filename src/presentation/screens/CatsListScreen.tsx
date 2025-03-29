import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {CatList} from '../components/cats/CatList';
import {useCatsListViewModel} from '../hooks/useCatsListViewModel';
import {CatModel} from '../../domain/entities/Cat';
import {COLORS, SPACING} from '../styles/theme';
import {layoutStyles, textStyles} from '../styles/commonStyles';
import {ApiError} from '../../core/network/ApiError';
import {cataasLogger} from '../../core/logger/setupLogger';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenList} from '../navigation/AppNavigator';

type CatsListScreenNavigationProp = StackNavigationProp<
  ScreenList,
  'CatsListScreen'
>;

/**
 * Screen to display a list of cats
 */
export const CatsListScreen: React.FC = () => {
  const navigation = useNavigation<CatsListScreenNavigationProp>();
  
  const limit = 10;
  
  const {cats, loading, error, refetch} = useCatsListViewModel(limit);
  
  const onSelectCat = useCallback((cat: CatModel) => {
    cataasLogger.info(`Selected cat: ${cat.id}`);
    navigation.navigate('CatDetailScreen', { catId: cat.id });
  }, [navigation]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CatList
          cats={cats}
          loading={loading}
          error={error as ApiError}
          onRefresh={refetch}
          onSelectCat={onSelectCat}
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
  },
  title: {
    ...textStyles.title,
    color: COLORS.text.inversePrimary,
    marginBottom: SPACING.tiny,
  },
  subtitle: {
    ...textStyles.caption,
    color: COLORS.text.inverseSecondary,
    marginBottom: SPACING.small,
  },
  listContainer: {
    flex: 1,
  },
}); 