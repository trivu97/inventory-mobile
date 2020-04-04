import React, {useState} from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import ModalContainer from 'Components/ModalContainer';
import {textStyle} from 'Constants/textStyles';
import {Input, Button} from 'react-native-elements';
import colors from 'Constants/colors';
import {dimension} from 'Constants';
import {scaleHor, scaleVer} from 'Constants/dimensions';

type PropsType = {
  visible: Boolean,
  onClose: () => void,
  onSubmit: () => void,
};

const AddInventoryModal = ({visible, onClose, onSubmit}: PropsType) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [describe, setDescribe] = useState('');

  const onCancel = () => {
    setName('');
    setAddress('');
    setDescribe('');
    onClose();
  };

  const handleSubmit = () => {
    if (!name || !address || !describe) {
      alert('Please fill required fields!');
      return;
    }
    onSubmit({name, address, describe});
    onCancel();
  };
  return (
    <ModalContainer
      modalVisible={visible}
      onClose={onClose}
      animationType="slide"
      position="center">
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Input
            placeholder="Input name"
            value={name}
            label="Name"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            placeholder="Input address"
            value={address}
            label="Address"
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            placeholder="Input describe"
            value={describe}
            label="Describe"
            onChangeText={(text) => setDescribe(text)}
          />
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
            onPress={onCancel}
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

export default AddInventoryModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: dimension.SCREEN_WIDTH * 0.9,
    paddingHorizontal: scaleHor(16),
    paddingVertical: scaleVer(16),
    borderRadius: 15,
    height: scaleVer(349),
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
