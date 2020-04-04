import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {NavigationType, ProductType} from 'types';
import {useSelector, useDispatch} from 'react-redux';
import {getInventoryListByProduct} from '@redux/actions/inventory';
import ListItem from 'Components/ListItem';
import ProductDetailItem from './ProductDetailItem';
import {scaleHor, scaleVer} from 'Constants/dimensions';
import colors from 'Constants/colors';
import {textStyle} from 'Constants/textStyles';

type PropsType = {
  navigation: NavigationType,
};

const ProductDetailScreen = ({navigation}: PropsType) => {
  const inventoryDetailList = useSelector(
    (state) => state.inventory.inventoryDetailList,
  );
  const isLoading = useSelector((state) => state.inventory.isLoading);
  const productId = useSelector((state) => state.product.selectedId);
  const product: ProductType = useSelector((state) =>
    state.product.productList.find((item) => item._id === productId),
  );
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      getInventoryListByProduct(dispatch)({productId});
    }
    setRefresh(false);
  }, [refresh]);

  const detailData = [
    {label: 'Name', value: product.name},
    {label: 'Price', value: `$${product.price}`},
    {label: 'Describe', value: product.describe},
  ];

  const renderKey = (item, index) => index.toString();

  const renderItem = ({item}) => {
    return <ProductDetailItem inventoryDetail={item} />;
  };

  const readyState = () => {
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{paddingLeft: scaleHor(24)}}>
          <FlatList
            data={inventoryDetailList}
            renderItem={renderItem}
            keyExtractor={renderKey}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'stretch',
          marginBottom: scaleVer(12),
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}>
        <View>
          <Text style={textStyle.bodyTextBold}>DETAIL</Text>
        </View>
        <View style={{paddingLeft: scaleHor(24)}}>
          {detailData.map((item, index) => (
            <ListItem
              type="detail"
              key={index.toString()}
              label={item.label}
              detail={item.value}
              pressable={false}
              showSeparator={index !== detailData.length - 1}
            />
          ))}
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={textStyle.bodyTextBold}>LIST INVENTORIES</Text>
        </View>
        {readyState()}
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleVer(16),
    backgroundColor: colors.white,
    paddingHorizontal: scaleHor(20),
  },
  itemContainer: {
    flex: 1,
    width: '100%',
  },
  plusIcon: {
    width: 16,
    height: 16,
  },
});
