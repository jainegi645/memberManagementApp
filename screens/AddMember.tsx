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
  contact: number;
  joiningdate: Date;
  feestatus: string;
};

const AddMember = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Message, setMessage] = useState('');

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
      firstName: 'joe',
      contact: '0987654321',
      joiningdate: '',
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

  // }
  const {mutate, data, isLoading, isError, isSuccess, error} = useMutation(
    (newMember: any) =>
      axios.post('http://192.168.1.4:4000/api/v1/createMember', newMember),
  );
  // http://localhost:4000/api/v1/createMember
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSubmit = (data: any) => {
    console.log(data.joiningdate);

    mutate(
      {
        name: data.firstName,
        contact: data.contact,
        feestatus: data.feestatus,
        dateofjoining: data.joiningdate,
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
          minLength: 10,
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
        name="contact"
      />
      {errors.contact && <Text>should be equal to 10.</Text>}
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
      {isSuccess ? <Text>{Message}</Text> : null}
      {isError ? <Text> {Message} </Text> : null}
      {isLoading ? <Text>Loading... </Text> : null}
    </View>
  );
};

export default AddMember;
