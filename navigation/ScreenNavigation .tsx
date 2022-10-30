import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddMember from '../screens/AddMember';
import AllMembers from '../screens/AllMembers';
import MarkAttendence from '../screens/MarkAttendence';
import SingleMemberDetail from '../components/allMembers/SingleMemberDetail';

type Props = {};
const Stack = createNativeStackNavigator();
const Navigation = (props: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AddMember" component={AddMember} />
      <Stack.Screen name="AllMembers" component={AllMembers} />
      <Stack.Screen name="MarkAttendence" component={MarkAttendence} />
      <Stack.Screen name="MemberDetail" component={SingleMemberDetail} />
    </Stack.Navigator>
  );
};

export default Navigation;
