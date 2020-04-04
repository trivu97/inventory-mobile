import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {BillType} from 'types';
import moment from 'moment';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import colors from 'Constants/colors';
import {shadowStyle} from 'Constants';
import {Image} from 'react-native-elements';
import {textStyle} from 'Constants/textStyles';

type PropsType = {
  bill: BillType,
  onItemPress: (string) => void,
};

const BillItem = ({bill, onItemPress}: PropsType) => {
  const checkType = () => {
    if (bill.type > 2 || bill.type < 0 || bill.type === null) {
      return 'Error';
    }
    return bill.type === 0 ? 'IMPORT' : 'EXPORT';
  };
  return (
    <TouchableWithoutFeedback onPress={() => onItemPress(bill._id)}>
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri:
                bill.type === 0
                  ? 'https://www.pngkey.com/png/full/88-880565_right-arrow-png-download-image-green-arrow-right.png'
                  : 'https://i.ya-webdesign.com/images/location-clipart-arrow-png-7.png',
            }}
            resizeMode="center"
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={[textStyle.widgetItem, {fontWeight: 'bold'}]}>
              {bill.inventory.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  textStyle.bodyTextBold,
                  styles.price,
                  {
                    backgroundColor:
                      bill.type === 1 ? colors.error : colors.secondary,
                    fontWeight: 'bold',
                  },
                ]}>
                {checkType()}
              </Text>
              <Text style={[textStyle.bodyTextBold, {color: colors.primary}]}>
                {moment(bill.createdAt).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BillItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: scaleVer(5),
    backgroundColor: colors.white,
    width: '100%',
    height: scaleVer(90),
    borderRadius: 15,
    alignItems: 'center',
    ...shadowStyle.ELEVATION_3,
    paddingHorizontal: scaleHor(15),
  },
  infoContainer: {
    width: '70%',
    marginHorizontal: scaleHor(20),
  },
  image: {
    width: scaleHor(60),
    height: scaleVer(60),
  },
  price: {
    borderRadius: 5,
    // backgroundColor: colors.dark60,
    fontWeight: '500',
    color: colors.white,
    paddingHorizontal: scaleHor(5),
    paddingVertical: scaleVer(3),
    alignSelf: 'flex-start',
    marginVertical: scaleVer(5),
  },
});
