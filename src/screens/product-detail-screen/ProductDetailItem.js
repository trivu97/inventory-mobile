import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InventoryDetailType} from 'types';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import {dimension} from 'Constants';
import {textStyle} from 'Constants/textStyles';

type PropType = {
  inventoryDetail: InventoryDetailType,
};

const ProductDetailItem = ({inventoryDetail}: PropType) => {
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[textStyle.bodyTextBold, {fontWeight: 'bold'}]}>
          {inventoryDetail.inventory.name}
        </Text>
        <Text style={[textStyle.labelRegular, {paddingLeft: scaleHor(10)}]}>
          {inventoryDetail.inventory.address}
        </Text>
      </View>
      <View>
        <Text style={textStyle.widgetItem}>
          <Text style={textStyle.label}>Qty: </Text>
          {inventoryDetail.quantity}
        </Text>
      </View>
    </View>
  );
};

export default ProductDetailItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: scaleVer(15),
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: scaleVer(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
