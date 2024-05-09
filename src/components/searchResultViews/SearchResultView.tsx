import { FlatList } from 'react-native';
import React from 'react';
import { SearchResultItemView } from '..';
import styles from './SearchResultView.style';
import {
  PassioIDEntityType,
  PassioSDK,
  type PassioFoodDataInfo,
  type PassioFoodItem,
} from '@passiolife/nutritionai-react-native-sdk-v3';

interface SearchResultViewProps {
  searchResult: Array<PassioFoodDataInfo>;
  handleLoadMore: () => void;
  onPressSearchResult: (item: PassioFoodItem) => void;
}

const SearchResultView = (props: SearchResultViewProps) => {
  const { searchResult, handleLoadMore, onPressSearchResult } = props;

  const renderSearchResult = ({ item }: { item: PassioFoodDataInfo }) => {
    return (
      <SearchResultItemView
        onPressSearchResult={async () => {
          const attr = await PassioSDK.fetchFoodItemForDataInfo(item);
          if (attr) {
            onPressSearchResult(attr);
          }
        }}
        passioID={item.iconID ?? ''}
        imageName={item.iconID ?? ''}
        name={item.foodName}
        brandName={item.brandName}
        entityType={PassioIDEntityType.group}
      />
    );
  };

  return (
    <FlatList
      data={searchResult}
      keyExtractor={(_item: PassioFoodDataInfo, index: number) =>
        index.toString()
      }
      renderItem={renderSearchResult}
      initialNumToRender={10}
      onEndReachedThreshold={0.02}
      onEndReached={handleLoadMore}
      contentContainerStyle={styles.contentContainerStyle}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default SearchResultView;
