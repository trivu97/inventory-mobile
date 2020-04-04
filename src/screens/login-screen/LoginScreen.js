import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image, Input, Button} from 'react-native-elements';
import colors from 'Constants/colors';
import {scaleVer, scaleHor} from 'Constants/dimensions';
import {shadowStyle} from 'Constants';
import {login} from '@redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationType} from 'types';

type PropsType = {
  navigation: NavigationType,
};

const LoginScreen = ({navigation}: PropsType) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const handleLogin = () => {
    login(dispatch)(
      {username, password},
      {
        onSuccess() {
          navigation.navigate('AuthScreen');
        },
        onFailure() {
          alert('Wrong username or password!');
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.itemContainer,
          {
            borderRadius: 25,
            borderWidth: 1,
            borderColor: colors.dark90,
            backgroundColor: colors.white,
            ...shadowStyle.ELEVATION_3,
          },
        ]}>
        <Input
          label="Username"
          labelStyle={{alignSelf: 'center'}}
          value={username}
          onChangeText={(text) => setUsername(text)}
          disabled={isLoading}
        />
        <Input
          label="Password"
          value={password}
          labelStyle={{alignSelf: 'center'}}
          onChangeText={(text) => setPassword(text)}
          containerStyle={{marginVertical: scaleVer(18)}}
          disabled={isLoading}
          secureTextEntry
        />
        <Button
          title="LOGIN"
          type="outline"
          raised
          containerStyle={{width: '90%', marginVertical: scaleVer(29)}}
          onPress={handleLogin}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: scaleHor(25),
    paddingVertical: scaleVer(80),
  },
  image: {
    width: scaleHor(80),
    height: scaleVer(80),
  },
  itemContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
