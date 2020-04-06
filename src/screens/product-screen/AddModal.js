import React, {useState} from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import ModalContainer from 'Components/ModalContainer';
import colors from 'Constants/colors';
import {dimension} from 'Constants';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import {Button, Input} from 'react-native-elements';
import {textStyle} from 'Constants/textStyles';

type PropsType = {
  visible: Boolean,
  onClose: () => void,
  onSubmit: () => void,
};

const AddModal = ({visible, onClose, onSubmit}: PropsType) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [describe, setDescribe] = useState('');

  const onCancel = () => {
    setName('');
    setPrice('');
    setDescribe('');
    onClose();
  };

  const handleSubmit = () => {
    if (!name || !describe || !price) {
      alert('Please input required fields.');
      return;
    }
    const iPrice = parseInt(price);
    if (iPrice <= 0) {
      alert('Price must be greater than 0');
      return;
    }
    onSubmit({name, price: iPrice, describe});
    setName('');
    setPrice('');
    setDescribe('');
    onClose();
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
            placeholder="Input Name"
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            placeholder="Input Price"
            value={price}
            label="Price"
            onChangeText={(text) => setPrice(text)}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            placeholder="Input Describe"
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

export default AddModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: dimension.SCREEN_WIDTH * 0.9,
    paddingHorizontal: scaleHor(16),
    paddingVertical: scaleVer(16),
    borderRadius: 15,
    height: scaleVer(400),
  },
  button: {
    width: scaleHor(120),
  },
  formGroup: {
    flex: 1,
    marginVertical: scaleVer(10),
  },
  pickerFormContainer: {
    borderColor: colors.dark80,
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: scaleVer(5),
  },
});
