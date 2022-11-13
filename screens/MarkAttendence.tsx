import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
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
import {useMutation} from 'react-query';

type Props = {
  name: string;
  item: any;
};

// console.log('Mark attendence  rendered');

const MarkAttendence = (props: Props) => {
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
  const {
    onSubmit,
    Message,
    // successMutate,
    MarkMemberAttendence,
    memberPresent,
    showDatePicker,
    hideDatePicker,
    isDatePickerVisible,
    setDateOfAttendence,
    dateOfAttendence,
    onCancel,
  } = useMarkAttendence();

  //giving the reference to button, because it was causing to re-render
  //the whole Markattendence screen, will further results in re-redering of useMarkAttendence hook
  const handleSubmit = useRef(onSubmit);

  //calling handleClick function with referenece to onSubmit function from  useMarkAttendence hook
  const handleClick = () => {
    console.log('handleClick');

    handleSubmit.current();
  };

  //fect
  const {data, isLoading, isError, isSuccess, error} = useQuery(
    'allMembers',
    fetchAllMembers,
  );
  const [showAlert, setShowAlert] = useState(false);
  const {
    mutate,
    mutateAsync,
    isLoading: lodingMutate,
    isError: errorMutate,
    isSuccess: successMutate,
    error: ErrorMutate,
  } = useMutation((newMember: any): any =>
    axios.post(
      'http://ec2-43-204-107-0.ap-south-1.compute.amazonaws.com:4000/api/v1/markAttendence',
      newMember,
    ),
  );
  // const onSubmit = (): any => {
  //   console.log('onsubmit', memberPresent);
  //   mutate(
  //     {
  //       // date: dateOfAttendence,
  //       // memberAttendence: memberPresent,
  //       date: '2-03-2022',
  //       memberAttendence: {
  //         date: '2-03-2022',
  //         memberAttendence: [
  //           {name: 'Rahul', markAs: 'present'},
  //           {name: 'Rahul2', markAs: 'present'},
  //         ],
  //       },
  //     },
  //     {
  //       onError: (err: any) => {
  //         // setMessage(err.response.data);
  //         console.log('error', err.response.data);
  //       },
  //       onSuccess: (res: any) => {
  //         console.log(res.data.message);
  //         // setMessage(res.data.message);
  //       },
  //     },
  //   );
  // };
  return (
    //TODO: save button should be enable only when new checkbox is checked apart from useQuery's data,
    //TODO: useMutate to update the database with save button,
    //TODO: useQuery to fetch the data from the database for checkbox to be prechecked,
    //TODO: i have draggged onSubmit funtion from useMarkAttendence to this file, but it is not working, error:to many re-renders why?
    <>
      <View>{isLoading && <ActivityIndicator size="large" />}</View>
      {isError && <Text>error</Text>}
      {/*
      {errorMutate && <Text> {Message} </Text>}
      {lodingMutate && <Text>Updating Attendence... </Text>} */}
      {successMutate && (
        <Text style={tw`text-black p-2 absolute text-2xl`}>
          <AlertForOk
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            title={Message}
            onConfirmPressed={setShowAlert(false)}
            showCancelButton={false}
            message={Message}
          />
        </Text>
      )}
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
          // onChange={date => setNewDate(date)}
          onConfirm={date => {
            setDateOfAttendence(moment(date).format('DD-MM-YYYY'));
            hideDatePicker();
          }}
          onCancel={hideDatePicker}
        />
        <Text>Total present today: {memberPresent.length}</Text>
      </View>

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
                memberPresent={memberPresent}
              />
            )}
          />
        )}
      </View>

      {memberPresent.length > 0 && (
        <View
          style={tw`absolute bottom-0 flex-row justify-between w-full px-2 bg-white rounded py-2`}>
          <Pressable style={tw`border py-2 px-5 rounded`} onPress={onCancel}>
            <Text style={tw`text-black text-lg `}>Cancel</Text>
          </Pressable>
          <Pressable
            // ref={handleSubmit}
            style={tw`bg-cyan-600 py-2 px-3  rounded `}
            onPress={() => handleClick()}>
            <Text style={tw`text-black text-center text-white text-lg `}>
              Mark Present
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default MarkAttendence;
