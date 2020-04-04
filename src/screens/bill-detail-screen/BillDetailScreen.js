import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  NavigationType,
  BillType,
  BillDetailType,
  InventoryDetailType,
} from 'types';
import {useSelector, useDispatch} from 'react-redux';
import {
  getBillDetailByBill,
  addBillDetail,
  saveChange,
  getAllBill,
} from '@redux/actions/bill';
import {getProduct} from '@redux/actions/product';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import colors from 'Constants/colors';
import {textStyle} from 'Constants/textStyles';
import ListItem from 'Components/ListItem';
import moment from 'moment';
import BillDetailItem from './BillDetailItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Plus} from 'Assets/svgs';
import AddModal from './AddModal';
import {
  getInventoryDetailByInventory,
  updateInventoryDetail,
  createInventoryDetail,
} from '@redux/actions/inventory';
import {Button} from 'react-native-elements';

type PropsType = {
  navigation: NavigationType,
};

const BillDetailScreen = ({navigation}: PropsType) => {
  const [refresh, setRefresh] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false);

  const billDetailList = useSelector((state) => state.bill.billDetail);
  const inventoryDetailList: [InventoryDetailType] = useSelector(
    (state) => state.inventory.inventoryDetailList,
  );
  const productList = useSelector((state) => state.product.productList);
  const isLoading = useSelector((state) => state.bill.isLoading);
  const isProductLoading = useSelector((state) => state.product.isLoading);
  const isInventoryLoading = useSelector((state) => state.inventory.isLoading);
  const dispatch = useDispatch();
  const billId = useSelector((state) => state.bill.selectedId);
  const bill: BillType = useSelector((state) =>
    state.bill.billList.find((item) => item._id === billId),
  );

  useEffect(() => {
    if (refresh) {
      getBillDetailByBill(dispatch)({billId});
      getInventoryDetailByInventory(dispatch)({
        inventoryId: bill.inventory._id,
      });
    }
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    getProduct(dispatch)();
  }, []);

  const createdDate = moment(bill.createdAt).format('MMMM Do, YYYY');

  const detailData = [
    {label: 'Type', value: bill.type === 1 ? 'Export' : 'Import'},
    {label: 'Inventory', value: bill.inventory.name},
    {label: 'Created Date', value: createdDate},
    {label: 'Employee', value: bill.employee.fullname},
    // {label: 'Total', value: bill.totalAmount},
  ];

  const renderKey = (item, index) => index.toString();

  const renderItem = ({item}) => {
    return <BillDetailItem billDetail={item} />;
  };

  const handleAddProduct = (data) => {
    const detail = inventoryDetailList.find(
      (item) => item.product._id === data.product,
    );
    let quantity = 0;
    if (detail) {
      quantity =
        bill.type === 0
          ? detail.quantity + data.quantity
          : detail.quantity - data.quantity;
    }
    addBillDetail(dispatch)(
      {
        productId: data.product,
        quantity: data.quantity,
        billId: billId,
      },
      {
        onSuccess() {
          if (bill.type === 0 && typeof detail === 'undefined') {
            createInventoryDetail(dispatch)(
              {
                inventory: bill.inventory._id,
                product: data.product,
                quantity: data.quantity,
              },
              {
                onSuccess() {
                  Alert.alert('Success', 'Added successfully!', [
                    {text: 'OK', onPress: () => setRefresh(true)},
                  ]);
                },
                onFailure() {
                  Alert.alert('Error', 'Something wrong here!');
                },
              },
            );
          } else {
            updateInventoryDetail(dispatch)(
              {id: detail._id, quantity},
              {
                onSuccess() {
                  Alert.alert('Success', 'Added successfully!', [
                    {text: 'OK', onPress: () => setRefresh(true)},
                  ]);
                },
                onFailure() {
                  Alert.alert('Error', 'Something wrong here!');
                },
              },
            );
          }
        },
        onFailure() {
          Alert.alert('Error', 'Something wrong here!');
        },
      },
    );
  };

  const handleSaveChange = () => {
    Alert.alert('Are you sure?', 'You will not edit this bill in the future?', [
      {text: 'No', onPress: () => {}},
      {
        text: 'Yes',
        onPress: () => {
          saveChange(dispatch)(
            {
              id: bill._id,
            },
            {
              onSuccess() {
                Alert.alert('Alert', 'Saved!', [
                  {text: 'OK', onPress: () => getAllBill(dispatch)()},
                ]);
              },
              onFailure() {
                Alert.alert('Error', 'Something wrong here!');
              },
            },
          );
        },
      },
    ]);
  };

  const readyState = () => {
    if (isLoading || isProductLoading || isInventoryLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{paddingLeft: scaleHor(24)}}>
          <FlatList
            data={billDetailList}
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
          <Text style={textStyle.bodyTextBold}>LIST PRODUCT</Text>
          {bill.editable && (
            <TouchableOpacity
              onPress={() => setIsAddMode(true)}
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                borderRadius: 5,
                borderColor: '#ccc',
                borderWidth: 1,
                paddingHorizontal: scaleHor(5),
                paddingVertical: scaleVer(3),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.plusIcon}>
                  <Plus fill={colors.dark20} />
                </View>
                <Text
                  style={[
                    textStyle.bodyTextBold,
                    {marginHorizontal: scaleHor(5)},
                  ]}>
                  ADD
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        {readyState()}
      </View>
      {bill.editable && (
        <View
          style={{
            width: '100%',
            paddingTop: scaleVer(10),
            backgroundColor: colors.white,
          }}>
          <Button title="SAVE" raised onPress={handleSaveChange} />
        </View>
      )}
      <AddModal
        visible={isAddMode}
        onClose={() => setIsAddMode(false)}
        onSubmit={handleAddProduct}
        productList={productList}
        inventoryDetail={inventoryDetailList}
        type={bill.type}
      />
    </View>
  );
};

export default BillDetailScreen;

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
