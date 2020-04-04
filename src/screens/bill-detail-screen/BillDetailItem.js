import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BillDetailType} from 'types';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import {dimension} from 'Constants';
import {textStyle} from 'Constants/textStyles';

type PropType = {
  billDetail: BillDetailType,
};

const BillDetailItem = ({billDetail}: PropType) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          textStyle.bodyText,
          {marginBottom: scaleVer(5), alignSelf: 'center'},
        ]}>
        {billDetail.product.name.toUpperCase()}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: scaleHor(5),
          paddingBottom: scaleVer(5),
        }}>
        <Text style={textStyle.label}>Quantity: {billDetail.quantity}</Text>
        <Text style={textStyle.label}>
          Price: ${billDetail.product.price * billDetail.quantity}
        </Text>
      </View>
    </View>
  );
};

export default BillDetailItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: scaleVer(15),
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
