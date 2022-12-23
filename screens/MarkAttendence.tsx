import {View, Text, FlatList, Pressable, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import tw from 'twrnc';
import SingleMemberAttendence from '../components/markAttendence/SingleMemberAttendence';
import useMarkAttendence from '../components/markAttendence/useMarkAttendence';
import calender from '../style/Images/calender.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AlertForOk from '../components/alerts/AlertForOk';
import styles from '../style/Stylesheet/Styles';
import Loader from '../components/Helper/Loader';

type Props = {
  name: string;
  item: any;
};

const MarkAttendence = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  //to fectch all members
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
  //getting data from useMarkAttendence HOOK
  const {
    refetchgetAttendence,
    onSubmit,
    Message,
    successMutate,
    errorMutate,
    lodingMutate,
    MarkMemberAttendence,
    memberPresent,
    showDatePicker,
    hideDatePicker,
    isDatePickerVisible,
    setDateOfAttendence,
    dateOfAttendence,
    onCancel,
    getAttendenceData,
    onCancelUpdate,
  } = useMarkAttendence();

  //to get attendence on selected date

  //handling on click event on submit button
  const handleSubmit = () => {
    onSubmit();
    setShowAlert(true);
  };

  //fetch
  const {data, isLoading, isError, isSuccess, error} = useQuery(
    ['allMembers', dateOfAttendence],
    fetchAllMembers,
    {
      refetchOnWindowFocus: true,
      cacheTime: 0,
    },
  );

  return (
    //TODO: useQuery to fetch the data from the database for checkbox to be prechecked,
    <>
      <View>
        {isLoading && (
          <View>
            <Loader />
          </View>
        )}
        {isError && (
          <AlertForOk
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            title="Error Fetching Data"
            onConfirmPressed={() => setShowAlert(false)}
            showCancelButton={false}
            message={Message}
          />
        )}

        {errorMutate && (
          <AlertForOk
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            title="Error!"
            onConfirmPressed={() => setShowAlert(false)}
            showCancelButton={false}
            message={Message}
          />
        )}
        {lodingMutate && (
          <View>
            <Loader />
          </View>
        )}
        {successMutate && (
          <AlertForOk
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            title="Success"
            onConfirmPressed={() => setShowAlert(false)}
            showCancelButton={false}
            message={Message}
          />
        )}
      </View>
      <Text style={tw`pt-4 text-2xl z-1 text-zinc-800 mx-2`}>
        Mark Attendence of members
      </Text>
      <Text style={tw`text-sm text-zinc-600 pl-2 pb-4`}>
        Click on checkbox corresponding to member name to mark attendence.Choose
        your date
      </Text>
      <View style={tw`flex-row  justify-between mx-2 py-4  rounded`}>
        <Pressable
          onPress={showDatePicker}
          style={tw`mx-2 w-25  rounded flex-row  border-b`}>
          <Image source={calender} style={tw`w-5  h-5`} />
          <Text> {dateOfAttendence}</Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={date => {
            setDateOfAttendence(moment(date).format('DD-MM-YYYY'));
            hideDatePicker();
          }}
          onCancel={hideDatePicker}
        />
        <Text>Total present today: {memberPresent.length}</Text>
      </View>

      <View style={tw`mb-60`}>
        {isSuccess && (
          <FlatList
            data={data.data}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <SingleMemberAttendence
                name={item.name}
                clickHandler={MarkMemberAttendence}
                memberPresent={memberPresent}
                contact={item.contact}
                prevAttendene={
                  getAttendenceData?.data.memberAttendence
                    ? getAttendenceData.data.memberAttendence
                        .map((elem: any) => elem.contact === item.contact)
                        .some((elem: any) => elem === true)
                    : false
                }
              />
            )}
          />
        )}
      </View>

      {memberPresent.length > 0 &&
        (getAttendenceData?.data.memberAttendence ? (
          <View
            style={tw`absolute bottom-0 flex-row justify-between w-full px-2 bg-white rounded py-2`}>
            <Pressable
              style={tw`border py-2 px-5 rounded`}
              onPress={() => onCancelUpdate()}>
              <Text style={tw`text-black text-lg `}>Cancel</Text>
            </Pressable>
            <Pressable
              style={tw`bg-green-600 py-2 px-3  rounded `}
              onPress={() => handleSubmit()}>
              <Text style={tw`text-black text-center text-white text-lg `}>
                Update Attendence
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={tw`absolute bottom-0 flex-row justify-between w-full px-2 bg-white rounded py-2`}>
            <Pressable
              style={tw`border py-2 px-5 rounded`}
              onPress={() => onCancel()}>
              <Text style={tw`text-black text-lg `}>Cancel</Text>
            </Pressable>
            <Pressable
              style={tw`bg-cyan-600 py-2 px-3  rounded `}
              onPress={() => handleSubmit()}>
              <Text style={tw`text-black text-center text-white text-lg `}>
                Mark Attendence
              </Text>
            </Pressable>
          </View>
        ))}
    </>
  );
};

export default MarkAttendence;
