import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import tw from 'twrnc';
import SingleMemberAttendence from '../components/SingleMemberAttendence';

type Props = {};
const fetchAllMembers = async () => {
  const response = await axios.get(
    'http://192.168.1.4:4000/api/v1/allMembers',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};

const MarkAttendence = (props: Props) => {
  const {data, isLoading, isError, isSuccess, error} = useQuery(
    'allMembers',
    fetchAllMembers,
  );
  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>error</Text>}
      {isSuccess && (
        <FlatList
          data={data.data}
          keyExtractor={item => item._id}
          renderItem={({item}) => <SingleMemberAttendence name={item.name} />}
        />
      )}
    </View>
  );
};

export default MarkAttendence;
