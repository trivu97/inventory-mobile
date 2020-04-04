import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {ProductType} from 'types';
import {Image} from 'react-native-elements';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import colors from 'Constants/colors';
import {dimension, shadowStyle} from 'Constants';
import {textStyle} from 'Constants/textStyles';
import {Trash} from 'Assets/svgs';

type PropsType = {
  product: ProductType,
  onDelete: () => void,
  onDetail: () => void,
};

const ProductItem = ({product, onDelete, onDetail}: PropsType) => {
  const handleDeleteItem = () => {
    Alert.alert('Confirm', `You want to remove ${product.name}`, [
      {text: 'No', onPress: () => {}},
      {text: 'Yes', onPress: () => onDelete(product._id)},
    ]);
  };

  const handleGoToDetal = () => {
    onDetail(product._id);
  };

  return (
    <TouchableWithoutFeedback onPress={handleGoToDetal}>
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri:
                'https://pngimage.net/wp-content/uploads/2018/05/default-png-6.png',
            }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={textStyle.widgetItem}>{product.name}</Text>
            <Text style={[textStyle.bodyTextBold, styles.price]}>
              ${product.price}
            </Text>
            <Text style={[textStyle.label]}>{product.describe}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={handleDeleteItem}>
            <View style={styles.trash}>
              <Trash fill={colors.error} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductItem;

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
    paddingHorizontal: scaleHor(5),
  },
  infoContainer: {
    width: '70%',
    marginHorizontal: scaleHor(5),
  },
  image: {
    width: scaleHor(60),
    height: scaleVer(60),
  },
  price: {
    borderRadius: 5,
    backgroundColor: colors.dark60,
    fontWeight: '500',
    color: colors.white,
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginVertical: scaleVer(5),
  },
  trash: {
    width: 20,
    height: 20,
  },
});
