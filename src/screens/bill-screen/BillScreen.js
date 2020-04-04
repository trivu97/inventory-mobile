import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {NavigationType} from 'types';
import ImportForm from './ImportForm';
import {useSelector, useDispatch} from 'react-redux';
import {BillType, InventoryType} from 'types';
import {getAllBill, addBillItem, setSelectedId} from '@redux/actions/bill';
import BillItem from './BillItem';
import {getInventoryList} from '@redux/actions/inventory';
import ViewContainer from 'Components/ViewContainer';
import {shadowStyle} from 'Constants';
import {Button, Header} from 'react-native-elements';
import colors from 'Constants/colors';

type PropsType = {
  navigation: NavigationType,
};

const BillScreen = ({navigation}: PropsType) => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      getAllBill(dispatch)({});
    }
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    getInventoryList(dispatch)();
  }, []);

  const billList: [BillType] = useSelector((state) => state.bill.billList);
  const isLoading = useSelector((state) => state.bill.isLoading);
  const isInventoryLoading = useSelector((state) => state.inventory.isLoading);
  const inventoriesList = useSelector((state) => state.inventory.inventoryList);

  const dispatch = useDispatch();

  const onRenderItem = ({item}: BillType) => (
    <BillItem bill={item} onItemPress={handleItemPress} />
  );
  const onRenderKey = (item, index) => index.toString();

  const handleItemPress = (id) => {
    setSelectedId(dispatch)(id);
    navigation.navigate('BillDetailScreen');
  };

  const addBillHandler = (data) => {
    setIsAddMode(false);
    addBillItem(dispatch)(
      {
        inventory: data.inventoryId,
        type: data.type,
      },
      {
        onSuccess() {
          Alert.alert('Success', 'Your bill is added successfully!', [
            {text: 'OK', onPress: () => setRefresh(true)},
          ]);
        },
        onFailure() {
          alert('Something wrong here!!');
        },
      },
    );
  };

  if (isLoading || isInventoryLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={billList}
          renderItem={onRenderItem}
          keyExtractor={onRenderKey}
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <Button
          title="ADD NEW"
          type="solid"
          onPress={() => setIsAddMode(true)}
          raised
        />
      </View>
      <ImportForm
        onAddBill={addBillHandler}
        onCancel={() => setIsAddMode(false)}
        inventories={inventoriesList}
        visible={isAddMode}
      />
    </View>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.dark95,
  },
  listContainer: {
    // backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    padding: 10,
  },
  bottomButtonContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    height: 90,
  },
});
