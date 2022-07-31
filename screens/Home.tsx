import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native';

type Props = {
  navigation: any;
};

const Home = (props: Props) => {
  return (
    <View>
      <Text> this is Home Screen</Text>
      <Button
        title="Go to All Members"
        onPress={() => props.navigation.navigate('AllMembers')}
      />
      <Button
        title="Go to AddMember"
        onPress={() => props.navigation.navigate('AddMember')}
      />
      <Button
        title="Go to Mark Attendence"
        onPress={() => props.navigation.navigate('MarkAttendence')}
      />
    </View>
  );
};

export default Home;
