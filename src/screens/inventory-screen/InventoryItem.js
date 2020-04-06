import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Image} from 'react-native-elements';
import {InventoryType} from 'types';
import {textStyle} from 'Constants/textStyles';
import {Trash} from 'Assets/svgs';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import {shadowStyle} from 'Constants';
import colors from 'Constants/colors';

type PropsType = {
  inventory: InventoryType,
  onDelete: () => void,
  goToDetail: () => void,
};

const InventoryItem = ({inventory, onDelete, goToDetail}: PropsType) => {
  const handleGoToDetal = () => {
    goToDetail(inventory._id);
  };

  const handleDeleteItem = () => {
    Alert.alert('Confirm', `You want to remove ${inventory.name}`, [
      {text: 'No', onPress: () => {}},
      {text: 'Yes', onPress: () => onDelete(inventory._id)},
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={handleGoToDetal}>
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri:
                'https://f1.pngfuel.com/png/634/639/717/warehouse-cartoon-factory-building-industrial-architecture-industry-manufacturing-commercial-building-chimney-png-clip-art.png',
            }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={textStyle.widgetItem}>{inventory.name}</Text>
            <Text style={[textStyle.labelRegular, styles.address]}>
              {inventory.address}
            </Text>
            <Text style={[textStyle.label]}>{inventory.describe}</Text>
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

export default InventoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: scaleVer(5),
    backgroundColor: colors.white,
    width: '100%',
    height: scaleVer(110),
    borderRadius: 15,
    alignItems: 'center',
    ...shadowStyle.ELEVATION_3,
    paddingHorizontal: scaleHor(5),
  },
  infoContainer: {
    width: '68%',
    marginHorizontal: scaleHor(10),
  },
  image: {
    width: scaleHor(60),
    height: scaleVer(60),
  },
  address: {
    alignSelf: 'flex-start',
    marginVertical: scaleVer(5),
  },
  trash: {
    width: 20,
    height: 20,
  },
});
