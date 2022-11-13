import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
// import useMarkAttendence from './useMarkAttendence';
type Props = {
  name: string;
  clickHandler: any;
  memberPresent: any;
};

//!TODO:vector icons are not rendering in the checkbox, even after  react-native-paper checkbox

const SingleMemberAttendence = ({name, clickHandler, memberPresent}: Props) => {
  const [checked, setChecked] = useState(false);
  const onCheckPress = (memberName: String) => {
    setChecked(!checked);
    clickHandler(memberName);
  };
  console.log('single member attendene component rendered');

  return (
    //TODO: useQuery to fetch the data from the database for checkbox to be prechecked,
    <>
      <View
        style={tw`border rounded-md border-slate-500 py-4 mt-2 flex-row justify-between px-2 mb-4 mx-2 items-center`}>
        <Text style={tw`text-xl capitalize`}>{name}</Text>

        <Checkbox
          // style={styles.checkbox}
          value={checked}
          onValueChange={() => onCheckPress(name)}
          color={checked ? '#4630EB' : undefined}
        />
      </View>
    </>
  );
};

export default React.memo(SingleMemberAttendence);
