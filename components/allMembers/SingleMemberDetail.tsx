import {View, Text, Pressable, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import calender from '../../style/Images/calender.png';
import RadioButtonRN from 'radio-buttons-react-native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
// import Alert from '../../components/alerts/AlertBox';
import AlertForDelete from '../alerts/AlertForDelete';
import AlertForOk from '../alerts/AlertForOk';
import AlertForMessage from '../alerts/AlertForMessage';
import Loader from '../Helper/Loader';
import Calender from '../Helper/Calender';
import useGetAttendenceByContact from './useGetAttendenceByContact';

type Props = {
  name: string;
  id: number;
  feeStatus: string;
  contact: number;
  dateofjoining: number;
  params: any;
  route: any;
  navigation: any;
};

const SingleMemberDetail = (Props: Props) => {
  const dateofjoining = moment(Props.route.params.dateofjoining).format(
    'DD-MM-YYYY',
  );
  const [edit, setEdit] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlertOk, setShowAlertOk] = useState<boolean>(false);
  const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false);

  const {
    getAttendenceByContactData,
    getAttendenceByContactLoading,
    getAttendenceByContactError,
    getAttendenceByContactSuccess,
  } = useGetAttendenceByContact(Props.route.params.contact);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    hideDatePicker();
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      contact: '',
      joiningdate: '',
      feeStatus: '',
    },
  });

  const fee = [
    {
      label: 'Paid',
    },
    {
      label: 'Due',
    },
  ];
  const {mutate, data, isLoading, isError, isSuccess, error} = useMutation(
    (newMember: any) =>
      axios.post(
        'http://ec2-43-204-107-0.ap-south-1.compute.amazonaws.com:4000/api/v1/updateMember',
        newMember,
      ),
  );
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSubmit = (data: any) => {
    setEdit(false);
    setShowAlertMessage(true);
    mutate(
      {
        name: data.firstName === '' ? Props.route.params.name : data.firstName,
        contact: Props.route.params.contact,
        feeStatus:
          data.feeStatus === '' ? Props.route.params.feeStatus : data.feeStatus,
        dateofjoining:
          data.joiningdate === ''
            ? Props.route.params.dateofjoining
            : data.joiningdate,
      },
      {
        onError: (err: any) => {
          setMessage(err.response.data);
        },
        onSuccess: (res: any) => {
          setMessage(res.data);
        },
      },
    );
  };
  const deleteBtnHandler = () => {
    setShowAlert(true);
  };
  const deleteMember = async () => {
    const response = await axios
      .post('http://localhost:4000/api/v1/deleteMember', {
        contact: Props.route.params.contact,
      })
      .then(res => {
        if (res.data === 'Member Successfully Deleted') {
          setMessage(res.data);
          setTitle('Member Deleted!');
          setShowAlertOk(true);
        }
      })
      .catch(err => {
        setTitle('An Error Occure!');
        setMessage(err.response.data);
        setShowAlertOk(true);
        console.log('err: ', err.response.data);
      });
    // return response;
  };
  //Todo:handle promise here in delete function

  const onAlertConfirmPressed = () => {
    console.log('reached alert comfirm');

    setShowAlert(false);
    setTimeout(() => {
      deleteMember();
    }, 500);
  };

  //TODO: Reload when 'edit member' is succesfull

  return (
    <View style={tw`px-2`}>
      <Text style={tw`pt-4 text-2xl text-zinc-800`}> Full details</Text>
      <Text style={tw`text-sm text-zinc-600 pl-1 pb-4`}>
        Click on edit to change fee status. Click on submit to save changes.
        contact can not be changed, delete and add new member.
      </Text>
      <View style={tw`flex-row py-4  justify-between`}>
        <Text style={tw`text-lg`}> Name</Text>
        {edit ? (
          <View>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    style={tw` border-gray-600 border-b   rounded p-1`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Joe Rogan"
                    value={value}
                  />
                </>
              )}
              name="firstName"
            />
          </View>
        ) : (
          <Text style={tw`text-lg capitalize `}>{Props.route.params.name}</Text>
        )}
      </View>
      <View style={tw`flex-row py-2  justify-between`}>
        <Text style={tw`text-lg`}> Contact</Text>

        <Text style={tw`text-lg capitalize `}>
          {Props.route.params.contact}
        </Text>
      </View>
      <View style={tw`flex-row py-4  justify-between`}>
        <Text style={tw`text-lg`}> Date of joining</Text>
        {edit ? (
          <>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
              render={({field: {onChange, value}}) => (
                <>
                  <Pressable
                    onPress={showDatePicker}
                    style={tw`p-2 w-25  rounded flex-row  border-b`}>
                    <Text>{dateofjoining} </Text>

                    <Image source={calender} style={tw`w-5  h-5`} />
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    // onChange={date => setNewDate(date)}
                    onConfirm={date => {
                      onChange(date);
                      // setNewDate(date);
                    }}
                    onCancel={hideDatePicker}
                  />
                </>
              )}
              name="joiningdate"
            />
          </>
        ) : (
          <Text style={tw`text-lg capitalize `}>{dateofjoining}</Text>
        )}
      </View>
      <View style={tw`flex-row py-4  justify-between`}>
        <Text style={tw`text-lg`}> Fee status</Text>
        {edit ? (
          <>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
              render={({field: {onChange, value}}) => (
                <>
                  <RadioButtonRN
                    data={fee}
                    // boxStyle={tw`rounded border-gray-600 border-2`}
                    textStyle={tw` text-lg  pl-2 `}
                    style={tw` w-24 justify-between border-red-500  -mt-5`}
                    circleSize={12}
                    box={false}
                    duration={100}
                    animationTypes={['shake']}
                    selectedBtn={(e: any) => onChange(e.label)}
                    // icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
                  />
                </>
              )}
              name="feeStatus"
            />
          </>
        ) : (
          <Text style={tw`text-lg capitalize `}>
            {Props.route.params.feeStatus}
          </Text>
        )}
      </View>
      {edit ? null : (
        <View style={tw`pb-4 `}>
          <Calender DateOfPresent={getAttendenceByContactData?.data} />
        </View>
      )}

      {edit ? (
        <View style={tw`flex-row -bottom-10 justify-between`}>
          <Pressable
            style={tw`border rounded-lg`}
            onPress={() => setEdit(false)}>
            <Text style={tw` px-8 py-3 `}>Cancel</Text>
          </Pressable>
          <Pressable
            style={tw`rounded bg-green-600`}
            onPress={handleSubmit(onSubmit)}>
            <Text style={tw` px-8 py-3 text-white`}>Submit</Text>
          </Pressable>
        </View>
      ) : (
        <View style={tw`flex-row  justify-between`}>
          <Pressable style={tw`border rounded-lg`} onPress={deleteBtnHandler}>
            <Text style={tw` px-8 py-3 `}>Delete</Text>
          </Pressable>
          <Pressable
            style={tw`rounded bg-cyan-600`}
            onPress={() => setEdit(true)}>
            <Text style={tw` px-8 py-3 text-white`}>Edit</Text>
          </Pressable>
        </View>
      )}
      <AlertForDelete
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        onConfirmPressed={() => onAlertConfirmPressed()}
        message="Are you sure you want to delete this member?"
        title="Delete member!"
      />
      <AlertForOk
        showAlert={showAlertOk}
        setShowAlert={setShowAlertOk}
        onConfirmPressed={() => {
          setShowAlertOk(false);
          Props.navigation.goBack();
        }}
        showCancelButton={false}
        message={Message}
        title={title}
      />

      {isSuccess ? (
        <AlertForMessage
          showAlert={showAlertMessage}
          setShowAlert={setShowAlertMessage}
          onConfirmPressed={() => setShowAlertMessage(false)}
          showCancelButton={false}
          message="Member Updated successfully"
          title="Member Updated!"
        />
      ) : null}
      {isError ? (
        <AlertForMessage
          showAlert={showAlertMessage}
          setShowAlert={setShowAlertMessage}
          onConfirmPressed={() => setShowAlertMessage(false)}
          showCancelButton={false}
          message={Message}
          title="An Error Occured!"
        />
      ) : null}
      {isLoading && <Loader />}
    </View>
  );
};

export default SingleMemberDetail;
