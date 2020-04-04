import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import {NavigationType, EmployeeType} from 'types';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, Button} from 'react-native-elements';
import colors from 'Constants/colors';
import ListItem from 'Components/ListItem';
import {getEmployee, logout} from '@redux/actions/user';
import {dimension} from 'Constants';
import {scaleHor, scaleVer} from 'Constants/dimensions';
import moment from 'moment';

type PropsType = {
  navigation: NavigationType,
};

const ProfileScreen = ({navigation}: PropsType) => {
  const employee: EmployeeType = useSelector((state) => state.user.employee);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    getEmployee(dispatch)();
  }, []);

  const detailData = [
    {label: 'Fullname', value: employee.fullname},
    {label: 'Gender', value: employee.gender},
    {
      label: 'Birthday',
      value: moment(employee.birthday).format('MMMM Do, YYYY'),
    },
  ];

  const handleLogout = () => {
    Alert.alert('Sign out', "You want to sign out, don't you?", [
      {text: 'No', onPress: () => {}},
      {
        text: 'Yes',
        onPress: () => {
          logout(dispatch);
          navigation.navigate('AuthScreen');
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.white,
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Avatar
          source={{
            uri:
              'https://www.kindpng.com/picc/m/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png',
          }}
          size="xlarge"
          rounded
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        {detailData.map((item) => (
          <ListItem
            type="detail"
            key={item.label}
            label={item.label}
            detail={item.value}
            pressable={false}
            showSeparator={true}
          />
        ))}
      </View>
      <View style={{width: '100%', marginVertical: scaleVer(20)}}>
        <Button
          title="Log out"
          type="solid"
          buttonStyle={{backgroundColor: colors.error}}
          raised={true}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: scaleHor(25),
  },
});
