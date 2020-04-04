import React, {useState} from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import ModalContainer from 'Components/ModalContainer';
import {ProductType, InventoryDetailType} from 'types';
import colors from 'Constants/colors';
import {dimension} from 'Constants';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import {Button, Input} from 'react-native-elements';
import {textStyle} from 'Constants/textStyles';

type PropsType = {
  productList: [ProductType],
  visible: Boolean,
  onClose: () => void,
  onSubmit: () => void,
  inventoryDetail: [InventoryDetailType],
  type: Number,
};

const AddModal = ({
  visible,
  onClose,
  onSubmit,
  productList,
  inventoryDetail,
  type,
}: PropsType) => {
  const [selProduct, setSelProduct] = useState('0');
  const [quantity, setQuantity] = useState('');

  const onCancel = () => {
    setSelProduct('0');
    setQuantity('');
    onClose();
  };

  const handleSubmit = () => {
    if (!quantity || selProduct === 0) {
      alert('Required fields cannot be empty!');
      return;
    }
    if (type === 1 && parseInt(quantity) > getInStock()) {
      alert('Quantity must not be greater than in-stock!');
      return;
    }
    onSubmit({product: selProduct, quantity: parseInt(quantity)});
    setQuantity('');
    setSelProduct('0');
    onClose();
  };

  const renderItem = () => {
    if (type === 0) {
      return productList.map((item) => (
        <Picker.Item key={item._id} label={item.name} value={item._id} />
      ));
    }
    return inventoryDetail.map((item) => (
      <Picker.Item
        key={item.product._id}
        label={item.product.name}
        value={item.product._id}
      />
    ));
  };

  const getInStock = () => {
    const detail = inventoryDetail.find(
      (item) => item.product._id === selProduct,
    );
    return detail.quantity;
  };

  return (
    <ModalContainer
      modalVisible={visible}
      onClose={onClose}
      animationType="slide"
      position="center">
      <View style={styles.container}>
        <View>
          <View style={styles.formGroup}>
            <Text style={textStyle.bodyTextBold}>Product:</Text>
            <View style={styles.pickerFormContainer}>
              <Picker
                style={styles.pickerForm}
                selectedValue={selProduct}
                onValueChange={(itemValue, itemIndex) =>
                  setSelProduct(itemValue)
                }>
                <Picker.Item key={999999} label="<Choose Product>" value="0" />
                {renderItem()}
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={textStyle.bodyTextBold}>
            Quantity:
            {type === 1 && selProduct !== '0' && (
              <Text style={{color: colors.error}}>
                {' '}
                (In-stock: {getInStock()})
              </Text>
            )}
          </Text>
          <Input
            placeholder="Input Quantity"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            keyboardType="number-pad"
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
