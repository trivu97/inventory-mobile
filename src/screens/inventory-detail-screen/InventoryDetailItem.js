import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InventoryDetailType} from 'types';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import {dimension} from 'Constants';
import {textStyle} from 'Constants/textStyles';
import colors from 'Constants/colors';

type PropType = {
  inventoryDetail: InventoryDetailType,
};

const InventoryDetailItem = ({inventoryDetail}: PropType) => {
  return (
    <View style={[styles.container]}>
      <View>
        <Text
          style={[
            textStyle.bodyTextBold,
            {fontWeight: 'bold', marginBottom: scaleVer(5)},
          ]}>
          {inventoryDetail.product.name}
        </Text>
        <Text
          style={[
            textStyle.labelRegular,
            {paddingLeft: scaleHor(10)},
            styles.price,
          ]}>
          ${inventoryDetail.product.price}
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

export default InventoryDetailItem;

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
  price: {
    backgroundColor: colors.dark40,
    color: colors.white,
    borderRadius: 5,
    paddingHorizontal: scaleHor(9),
    paddingVertical: scaleVer(3),
    alignSelf: 'flex-start',
  },
});
