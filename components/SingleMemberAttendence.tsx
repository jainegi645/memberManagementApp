import {View, Text} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Checkbox from 'expo-checkbox';

type Props = {
  name: string;
};

const SingleMemberAttendence = (props: Props) => {
  const [Present, setPresent] = useState(false);

  return (
    <View style={tw`border-2 border-sky-500 mt-2 flex`}>
      <Text style={tw`text-xl pt-4`}>{props.name}</Text>
      <Checkbox
        style={tw`mt-2`}
        value={Present}
        onValueChange={setPresent}
        color={Present ? '#4630EB' : undefined}
      />
    </View>
  );
};

export default SingleMemberAttendence;
