import React, {useEffect} from 'react';
import {View} from 'react-native';

import {connect, useSelector} from 'react-redux';

import {NavigationType, UserType} from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const AuthScreen = ({navigation}: PropTypes) => {
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      navigation.navigate('MainApp');
    } else {
      navigation.navigate('AuthStack');
    }
  }, []);

  return <View />;
};

export default AuthScreen;
