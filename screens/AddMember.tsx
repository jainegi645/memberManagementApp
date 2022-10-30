import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import tw from 'twrnc';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import {useMutation} from 'react-query';
import axios from 'axios';
import moment from 'moment';
import bgimg from '../style/Images/bgpattern.png';
import calender from '../style/Images/calender.png';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

// import Icon from 'react-native-vector-icons/FontAwesome';

type FormData = {
  firstName: string;
  contact: number;
  joiningdate: Date;
  feeStatus: string;
};
type Props = {
  navigation: any;
};

const AddMember = ({navigation}: Props) => {
  const currentDate = moment(new Date()).format('DD-MM-YYYY');
  const stagingUrl = process.env.REACT_APP_Staging_url;
  console.log('staging url: ', stagingUrl);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Message, setMessage] = useState('');
  const [defaultDate, setNewDate] = useState<any>(currentDate);

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

  // }
  const {mutate, data, isLoading, isError, isSuccess, error} = useMutation(
    (newMember: any) =>
      axios.post(
        `http://ec2-43-204-107-0.ap-south-1.compute.amazonaws.com:4000/api/v1/createMember`,
        newMember,
      ),
  );
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSubmit = (data: any) => {
    console.log(data.joiningdate);

    mutate(
      {
        name: data.firstName,
        contact: data.contact,
        feeStatus: data.feeStatus,
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
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={tw`px-3  pt-4 `}>
          <View>
            <Text style={tw`text-lg z-1 text-zinc-600`}>add new</Text>
            <Text style={tw`text-5xl z-1 text-zinc-800`}>Member .</Text>
            <Text
              style={tw`text-base pb-4 z-100 pt-2 pb-8 text-zinc-500 leading-5`}>
              Fill the below details to add a new member to the club
            </Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text style={tw`text-lg text-zinc-700 `}>Full name</Text>
                <TextInput
                  style={tw` border-gray-600 border-b mb-4 rounded p-1`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Joe Rogan"
                  value={value}
                />
              </>
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text style={tw`text-red-500`}>*please enter your name</Text>
          )}
          <Controller
            control={control}
            rules={{
              minLength: 10,
              maxLength: 10,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text style={tw`text-lg text-zinc-700`}>
                  Enter phone number
                </Text>
                <TextInput
                  style={tw`border-gray-600 border-b mb-4 rounded p-1`}
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="9876543210"
                  value={value}
                />
              </>
            )}
            name="contact"
          />
          {errors.contact && (
            <Text style={tw`text-red-500 pb-2`}>
              *should be equal to 10 or cannot be empty field.
            </Text>
          )}
          {/* for date picker */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <>
                <Text style={tw`text-lg text-zinc-700`}>
                  Choose date of joining
                </Text>

                <Pressable
                  onPress={showDatePicker}
                  style={tw`p-2 mb-4  w-80  rounded flex-row justify-between border-gray-600 border-b`}>
                  <Text>{defaultDate}</Text>
                  <Image source={calender} style={tw`  w-5 h-5`} />
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
          {errors.joiningdate && (
            <Text style={tw`text-red-500`}>
              *Please select the date of joining.
            </Text>
          )}
          {/* for radio buttons */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <>
                <Text style={tw`text-lg text-zinc-700`}>
                  {' '}
                  Select fee status
                </Text>
                <RadioButtonRN
                  data={fee}
                  // boxStyle={tw`rounded border-gray-600 border-b-2`}
                  textStyle={tw` text-lg text-zinc-700`}
                  style={tw``}
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
          {errors.feeStatus && (
            <Text style={tw`text-red-500`}>*set fee status</Text>
          )}
          <View style={tw`flex-row justify-between mt-10`}>
            <Pressable
              style={tw`p-4 border rounded`}
              onPress={() => navigation.goBack()}>
              <Text style={tw`px-6 rounded`}> Cancel</Text>
            </Pressable>
            <Pressable
              style={tw`p-4 bg-cyan-600 rounded`}
              onPress={handleSubmit(onSubmit)}>
              <Text style={tw`px-6 text-white`}>Submit</Text>
            </Pressable>
          </View>

          {isSuccess ? <Text>{Message}</Text> : null}
          {isError ? <Text> {Message} </Text> : null}
          {isLoading ? <Text>Loading... </Text> : null}
        </View>
      </ScrollView>
    </>
  );
};

export default AddMember;
