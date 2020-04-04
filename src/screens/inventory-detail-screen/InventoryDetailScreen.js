import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getInventoryDetailByInventory} from '@redux/actions/inventory';
import {InventoryType, NavigationType} from 'types';
import InventoryDetailItem from './InventoryDetailItem';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import colors from 'Constants/colors';
import ListItem from 'Components/ListItem';
import {textStyle} from 'Constants/textStyles';

type PropsType = {
  navigation: NavigationType,
};

const InventoryDetailScreen = ({navigation}: PropsType) => {
  const inventoryDetailList = useSelector(
    (state) => state.inventory.inventoryDetailList,
  );
  const isLoading = useSelector((state) => state.inventory.isLoading);
  const inventoryId = useSelector((state) => state.inventory.selectedId);
  const inventory: InventoryType = useSelector((state) =>
    state.inventory.inventoryList.find((item) => item._id === inventoryId),
  );
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      getInventoryDetailByInventory(dispatch)({inventoryId});
    }
    setRefresh(false);
  }, [refresh]);

  const detailData = [
    {label: 'Name', value: inventory.name},
    {label: 'Address', value: inventory.address},
    {label: 'Describe', value: inventory.describe},
  ];

  const renderKey = (item, index) => index.toString();

  const renderItem = ({item}) => {
    return <InventoryDetailItem inventoryDetail={item} />;
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
          <Text style={textStyle.bodyTextBold}>LIST PRODUCTS</Text>
        </View>
        {readyState()}
      </View>
    </View>
  );
};

export default InventoryDetailScreen;

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
