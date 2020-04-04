import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TestScreen from './testScreen/TestScreen';
import BillScreen from './bill-screen/BillScreen';
import BillDetailScreen from './bill-detail-screen/BillDetailScreen';
import ProductScreen from './product-screen/ProductScreen';
import ProductDetailScreen from './product-detail-screen/ProductDetailScreen';
import InventoryScreen from './inventory-screen/InventoryScreen';
import InventoryDetailScreen from './inventory-detail-screen/InventoryDetailScreen';
import ProfileScreen from './profile-screen/ProfileScreen';
import LoginScreen from './login-screen/LoginScreen';
import AuthScreen from './auth-screen/AuthScreen';
import colors from 'Constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BillStack = createStackNavigator(
  {
    BillScreen: {
      screen: BillScreen,
      navigationOptions: {
        title: 'Bills',
        headerTitleAlign: 'center',
      },
    },
    BillDetailScreen: {
      screen: BillDetailScreen,
      navigationOptions: {
        title: 'Bill Detail',
        headerTitleAlign: 'center',
      },
    },
  },
  // {
  //   headerMode: 'none',
  // },
);

const ProductStack = createStackNavigator(
  {
    ProductScreen: {
      screen: ProductScreen,
      navigationOptions: {
        title: 'Products',
        headerTitleAlign: 'center',
      },
    },
    ProductDetailScreen: {
      screen: ProductDetailScreen,
      navigationOptions: {
        title: 'Product Detail',
        headerTitleAlign: 'center',
      },
    },
  },
  // {headerMode: 'none'},
);

const InventoryStack = createStackNavigator(
  {
    InventoryScreen: {
      screen: InventoryScreen,
      navigationOptions: {
        title: 'Inventories',
        headerTitleAlign: 'center',
      },
    },
    InventoryDetailScreen: {
      screen: InventoryDetailScreen,
      navigationOptions: {
        title: 'Inventory Detail',
        headerTitleAlign: 'center',
      },
    },
  },
  // {
  //   headerMode: 'none',
  // },
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
        headerTitleAlign: 'center',
      },
    },
  },
  // {
  //   headerMode: 'none',
  // },
);

const MainApp = createBottomTabNavigator(
  {
    BillStack: {
      screen: BillStack,
      navigationOptions: {
        title: 'Bills',
      },
    },
    ProductStack: {
      screen: ProductStack,
      navigationOptions: {
        title: 'Products',
      },
    },
    InventoryStack: {
      screen: InventoryStack,
      navigationOptions: {
        title: 'Inventories',
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        title: 'Profile',
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'BillStack') {
          iconName = 'md-paper';
        } else if (routeName === 'ProductStack') {
          iconName = 'md-bulb';
        } else if (routeName === 'InventoryStack') {
          iconName = 'md-home';
        } else if (routeName === 'ProfileStack') {
          iconName = 'md-contact';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.secondary,
      inactiveTintColor: colors.dark40,
      labelStyle: {
        fontSize: 12,
      },
    },
    lazy: false,
  },
);

const AuthStack = createStackNavigator(
  {
    LoginScreen,
  },
  {
    headerMode: 'none',
  },
);

const MainSwitch = createSwitchNavigator({
  AuthScreen,
  AuthStack,
  MainApp,
});

const App = createAppContainer(MainSwitch);
export default App;
