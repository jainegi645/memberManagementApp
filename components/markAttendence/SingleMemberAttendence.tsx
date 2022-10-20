import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';
// import {CheckBox, Icon} from '@rneui/themed';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
type Props = {
  name: string;
  clickHandler: any;
  onChange: any;
  checked: boolean;
};

//!TODO:vector icons are not rendering in the checkbox, even after  react-native-paper checkbox

const log = (state: any) => {
  console.log('hello', state);
};
const SingleMemberAttendence = ({
  name,
  clickHandler,
  onChange,
  checked,
}: Props) => {
  const [state, setstate] = useState(0);
  const onCheckPress = () => {
    onChange(!checked);
    clickHandler(name);
  };

  const myIcon = <Ionicons name="rocket" size={30} color="#900" />;
  return (
    //TODO: useQuery to fetch the data from the database for checkbox to be prechecked,
    <>
      <View
        style={tw`border-2 border-sky-500 mt-2 flex-row justify-between px-5 py-4 mb-4 items-center`}>
        <Text style={tw`text-xl capitalize`}>{name}</Text>

        {/* <Pressable
          style={tw`border border-gray-600 w-6 h-6 rounded-full items-center justify-center`}
          onPress={onCheckPress}>
          {checked && (
            <Ionicons
              name="checkmark-circle"
              size={32}
              color="green"
              style={tw`text-center`}
            />
          )}
        </Pressable> */}

        {/* <CheckBox center checked={checked} onPress={onCheckPress} /> */}
        {/* <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={onCheckPress}
      /> */}
        {/* <FontAwesome5 name="git" size={24} color="green" /> */}
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={onCheckPress}
        />
      </View>
    </>
  );
};

export default SingleMemberAttendence;
