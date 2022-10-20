import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import tw from 'twrnc';

type Props = {};

// use 192.168.1.2:4000 for android emulator, got it from  `ipconfig` in cmd

const fetchAllMembers = async () => {
  const response = await axios.get(
    'http://192.168.1.2:4000/api/v1/allMembers',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};

const AllMembers = (props: Props) => {
  const {data, isLoading, isError, isSuccess, error} = useQuery(
    'allMembers',
    fetchAllMembers,
  );
  return (
    <View>
      <Text>hey this is all AllMembers</Text>

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>error</Text>}
      {isSuccess && (
        <FlatList
          data={data.data}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={tw`border-2 border-sky-500 mt-2`}>
              <Text style={tw`text-xl pt-4`}>{item.name}</Text>
              <Text style={tw`text-lg`}>{item.dateofjoining}</Text>
              <Text style={tw`text-lg`}>{item.feeStatus}</Text>
              <Text style={tw`text-lg`}>{item.contact}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AllMembers;
