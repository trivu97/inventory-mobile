import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {NavigationType, ProductType} from 'types';
import {useSelector, useDispatch} from 'react-redux';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import colors from 'Constants/colors';
import ProductItem from './ProductItem';
import {
  getProduct,
  addProduct,
  deleteProduct,
  setSelectedId,
} from '@redux/actions/product';
import {dimension} from 'Constants';
import {Button} from 'react-native-elements';
import AddModal from './AddModal';

type PropsType = {
  navigation: NavigationType,
};

const ProductScreen = ({navigation}: PropsType) => {
  const [refresh, setRefresh] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false);

  const productList = useSelector((state) => state.product.productList);
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refresh) {
      getProduct(dispatch)();
    }
    setRefresh(false);
  }, [refresh]);

  const renderKey = (item, index) => index.toString();

  const renderItem = ({item}: ProductType) => {
    return (
      <ProductItem
        product={item}
        onDelete={handleDeleteProduct}
        onDetail={goToDetail}
      />
    );
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(dispatch)(
      {id},
      {
        onSuccess() {
          Alert.alert('Success', 'Delete successfully!', [
            {text: 'OK', onPress: () => setRefresh(true)},
          ]);
        },
        onFailure() {
          Alert.alert('Error', 'Something wrong here!');
        },
      },
    );
  };

  const handleSubmit = (data) => {
    addProduct(dispatch)(data, {
      onSuccess() {
        Alert.alert('Success', 'Add product successfully!', [
          {text: 'OK', onPress: () => setRefresh(true)},
        ]);
      },
      onFailure(error) {
        Alert.alert('Error', 'Something wrong here!');
      },
    });
  };

  const goToDetail = (id) => {
    setSelectedId(dispatch)(id);
    navigation.navigate('ProductDetailScreen');
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        keyExtractor={renderKey}
        renderItem={renderItem}
        refreshing={refresh}
        onRefresh={() => setRefresh(true)}
      />
      <View style={styles.bottomButtonContainer}>
        <Button
          title="ADD NEW"
          type="solid"
          onPress={() => setIsAddMode(true)}
        />
      </View>
      <AddModal
        visible={isAddMode}
        onClose={() => setIsAddMode(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: scaleVer(16),
    backgroundColor: colors.dark95,
    paddingHorizontal: scaleHor(20),
  },
  bottomButtonContainer: {
    backgroundColor: '#fff',
    marginTop: scaleVer(16),
  },
});
