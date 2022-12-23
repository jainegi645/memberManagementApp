import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import tw from 'twrnc';
import arrowGray from '../style/Images/arrow-right-gray.png';
import {useNavigation} from '@react-navigation/native';
import styles from '../style/Stylesheet/Styles';
import Loader from '../components/Helper/Loader';
type Props = {
  navigation: any;
};

// use 192.168.1.2:4000 for android emulator, got it from  `ipconfig` in cmd

const fetchAllMembers = async () => {
  const response = await axios.get(
    'http://ec2-43-204-107-0.ap-south-1.compute.amazonaws.com:4000/api/v1/allMembers',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};

const AllMembers = (props: Props) => {
  const navigation = useNavigation();

  const {data, isLoading, isError, isSuccess, error, refetch} = useQuery(
    'allMembers',
    fetchAllMembers,
    {
      refetchOnWindowFocus: 'always',
      cacheTime: 0,
    },
  );

  //TODO: Reload when navigate from single membe detail (after deleting member) to all members
  return (
    <View style={tw`px-2`}>
      <View style={tw` `}>
        <Text style={tw`pt-4  text-2xl z-1 text-zinc-800`}>
          See full details
        </Text>
        <Text style={tw`text-sm text-zinc-600 pl-2 pb-4`}>
          Click on any member to see full details
        </Text>
      </View>

      {isLoading && <Loader />}
      {isError && <Text>error</Text>}
      {isSuccess && (
        <View style={tw`mb-44`}>
          <FlatList
            data={data.data}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <Pressable
                onPress={() =>
                  props.navigation.navigate('MemberDetail', {
                    id: item._id,
                    name: item.name,
                    feeStatus: item.feeStatus,
                    contact: item.contact,
                    dateofjoining: item.dateofjoining,
                  })
                }>
                <View
                  style={tw` border rounded-md border-slate-500 py-4 mt-2 flex-row justify-between px-2 mb-4`}>
                  <Text style={tw`text-xl capitalize`}>{item.name}</Text>
                  <View style={tw` flex-row justify-evenly`}>
                    <Text style={tw`text-lg capitalize `}>
                      <View style={tw`capitalize`}>
                        {item.feeStatus === 'Due' ? (
                          <View style={tw`bg-red-500 w-3 h-3  rounded-full`} />
                        ) : (
                          <View style={tw`bg-green-500 w-3 h-3 rounded-full`} />
                        )}
                      </View>
                      {item.feeStatus}
                      <Image source={arrowGray} />
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default AllMembers;
