import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import colors from 'Constants/colors';
import {Button} from 'react-native-elements';
import AddInventoryModal from './AddInventoryModal';
import {
  getInventoryList,
  addInventory,
  deleteInventory,
  setSelectedInventory,
} from '@redux/actions/inventory';
import InventoryItem from './InventoryItem';
import {NavigationType} from 'types';

type PropsType = {
  navigation: NavigationType,
};

const InventoryScreen = ({navigation}: PropsType) => {
  const inventoryList = useSelector((state) => state.inventory.inventoryList);
  const isLoading = useSelector((state) => state.inventory.isLoading);
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    if (refresh) {
      getInventoryList(dispatch)();
    }
    setRefresh(false);
  }, [refresh]);

  const renderKey = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <InventoryItem
      inventory={item}
      onDelete={handleDeleteItem}
      goToDetail={goToDetail}
    />
  );

  const handleSubmit = (data) => {
    addInventory(dispatch)(data, {
      onSuccess() {
        Alert.alert('Success', 'Added successfully!', [
          {text: 'OK', onPress: () => setRefresh(true)},
        ]);
      },
      onFailure() {
        Alert.alert('Error', 'Something wrong here!');
      },
    });
  };

  const goToDetail = (id) => {
    setSelectedInventory(dispatch)(id);
    navigation.navigate('InventoryDetailScreen');
  };

  const handleDeleteItem = (id) => {
    deleteInventory(dispatch)(id, {
      onSuccess() {
        Alert.alert('Success', 'Deleted successfully!', [
          {
            text: 'OK',
            onPress: () => {
              setRefresh(true);
            },
          },
        ]);
      },
      onFailure() {
        Alert.alert('Error', 'Something wrong here!');
      },
    });
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
        data={inventoryList}
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
      <AddInventoryModal
        visible={isAddMode}
        onClose={() => setIsAddMode(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default InventoryScreen;

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
