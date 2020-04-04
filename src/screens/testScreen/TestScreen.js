import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This screen is default screen.</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
