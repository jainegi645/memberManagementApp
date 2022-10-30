import {View, Text, FlatList, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import tw from 'twrnc';
import SingleMemberAttendence from '../components/markAttendence/SingleMemberAttendence';
import useMarkAttendence from '../components/markAttendence/useMarkAttendence';

type Props = {
  name: string;
  item: any;
};

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

const MarkAttendence = (props: Props) => {
  const {
    onSubmit,
    Message,
    successMutate,
    MarkMemberAttendence,
    onChange,
    checked,
  } = useMarkAttendence('hey');

  const {data, isLoading, isError, isSuccess, error} = useQuery(
    'allMembers',
    fetchAllMembers,
  );

  return (
    //TODO: save button should be enable only when new checkbox is checked apart from useQuery's data,
    //TODO: useMutate to update the database with save button,

    <>
      <View style={tw`flex-row justify-between `}>
        {isLoading && <ActivityIndicator size="large" />}
      </View>
      {isError && <Text>error</Text>}
      {/*
      {errorMutate && <Text> {Message} </Text>}
      {lodingMutate && <Text>Updating Attendence... </Text>} */}
      {/* {successMutate && (
        <Text style={tw`text-black p-2 absolute text-2xl`}>
          <AlertBox />
        </Text>
      )} */}
      {successMutate && (
        <Text style={tw`text-black p-2 absolute text-2xl`}>{Message}</Text>
      )}
      <View style={tw`pb-16`}>
        {isSuccess && (
          <FlatList
            data={data.data}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <SingleMemberAttendence
                name={item.name}
                clickHandler={MarkMemberAttendence}
                checked={checked}
                onChange={onChange}
              />
            )}
          />
        )}
      </View>
      <View style={tw`bottom-16 `}>
        <Pressable style={tw`bg-sky-500 w-auto  `} onPress={onSubmit}>
          <Text style={tw`text-black text-center text-2xl p-4`}>
            Mark Present
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default MarkAttendence;
