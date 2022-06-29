import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert, Pressable} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import tw from 'twrnc';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import {useMutation} from 'react-query';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';

type FormData = {
  firstName: string;
  phonenumber: number;
  joiningdate: Date;
  feestatus: string;
};

const AddMember = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    console.log('date of joining', date);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: 'joe',
      phonenumber: 'rogan',
      joiningdate: '22',
      feestatus: 'due',
    },
  });

  const fee = [
    {
      label: 'paid',
    },
    {
      label: 'due',
    },
  ];
  const mutation = useMutation((newMember: any) => {
    return axios.post('http://localhost:4000/api/v1/createMember', newMember);
  });
  // http://localhost:4000/api/v1/createMember
  const onSubmit = (data: any) => {
    // console.log(data.firstName);
    // console.log(data.phonenumber);
    mutation.mutate({
      name: data.firstName,
      phonenumber: data.phonenumber,
      feestatus: data.feestatus,
      dateofjoining: data.joiningdate,
    });
  };
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <Text>Full name</Text>
            <TextInput
              style={tw`border-gray-900 border-2 mb-4`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 10,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <Text>Enter phone number</Text>
            <TextInput
              style={tw`border-gray-900 border-2 mb-4`}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
        name="phonenumber"
      />
      {errors.phonenumber && <Text>should be equal to 10.</Text>}
      {/* for date picker */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <>
            <Pressable
              onPress={showDatePicker}
              style={tw`p-4 mb-4 bg-red-800 rounded`}>
              <Text>Choose Date of joining</Text>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={date => onChange(date)}
              onCancel={hideDatePicker}
            />
          </>
        )}
        name="joiningdate"
      />
      {errors.joiningdate && <Text>*Please select the date of joining.</Text>}
      {/* for radio buttons */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <>
            <RadioButtonRN
              data={fee}
              selectedBtn={(e: any) => onChange(e.label)}
              // icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
            />
          </>
        )}
        name="feestatus"
      />
      {errors.feestatus && <Text>*set fee status</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      {mutation.isSuccess ? <Text>member added!</Text> : null}
      {mutation.isError ? <Text>An error occurred</Text> : null}
      {mutation.isLoading ? <Text>Loading...</Text> : null}
    </View>
  );
};

export default AddMember;
