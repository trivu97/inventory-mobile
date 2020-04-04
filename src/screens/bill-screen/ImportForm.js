import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Picker,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {InventoryType} from 'types';
import ModalContainer from 'Components/ModalContainer';
import {dimension} from 'Constants';
import colors from 'Constants/colors';
import {scaleHor, scaleVer} from 'Constants/dimensions';
import {Button} from 'react-native-elements';
import {textStyle} from 'Constants/textStyles';

type PropsType = {
  onCancel: () => void,
  onAddBill: () => void,
  inventories: [InventoryType],
  visible: Boolean,
};

const ImportForm = ({onAddBill, onCancel, inventories, visible}: PropsType) => {
  const [type, setType] = useState(-1);
  const [inventoryId, setInventoryId] = useState(-1);

  const onClose = () => {
    setInventoryId(-1);
    setType(-1);
    onCancel();
  };

  const handleSubmit = () => {
    if (type === -1 || inventoryId === -1) {
      alert('Please choose inventory and type!');
      return;
    }
    onAddBill({type, inventoryId});
    setInventoryId(-1);
    setType(-1);
    onCancel();
  };

  return (
    <ModalContainer
      modalVisible={visible}
      onClose={onClose}
      animationType="slide"
      position="center">
      <View style={styles.container}>
        <View>
          <Text style={textStyle.bodyTextBold}>Inventory:</Text>
          <View style={styles.pickerFormContainer}>
            <Picker
              style={styles.pickerForm}
              selectedValue={inventoryId}
              onValueChange={(itemValue, itemIndex) =>
                setInventoryId(itemValue)
              }>
              <Picker.Item key={999999} label="<Choose Inventory>" value={-1} />
              {inventories.map((item) => (
                <Picker.Item
                  key={item._id}
                  label={item.name}
                  value={item._id}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={textStyle.bodyTextBold}>Type</Text>
          <View style={styles.pickerFormContainer}>
            <Picker
              style={styles.pickerForm}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="<Choose type>" value="-1" />
              <Picker.Item label="Import" value="0" />
              <Picker.Item label="Export" value="1" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: scaleVer(20),
          }}>
          <Button
            title="Cancel"
            type="clear"
            onPress={onClose}
            buttonStyle={styles.button}
          />
          <Button
            title="Add"
            type="solid"
            onPress={handleSubmit}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ImportForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: dimension.SCREEN_WIDTH * 0.9,
    paddingHorizontal: scaleHor(16),
    paddingVertical: scaleVer(16),
    borderRadius: 15,
    height: scaleVer(280),
  },
  button: {
    width: scaleHor(120),
  },
  formGroup: {
    marginVertical: scaleVer(10),
  },
  pickerFormContainer: {
    borderColor: colors.dark80,
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: scaleVer(5),
  },
});
