import {View, Text} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';
import moment from 'moment';

type Props = {
  Membername: string;
  name: string;
  member: any;
};

const useMarkAttendence = () => {
  const [Message, setMessage] = useState('');
  const [memberPresent, setMemberPresent] = useState<any>([]);
  const [dateOfAttendence, setDateOfAttendence] = useState<any>(
    moment().format('DD-MM-YYYY'),
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const MarkMemberAttendence = (Membername: String) => {
    if (memberPresent.some((member: any) => member.name === Membername)) {
      setMemberPresent(
        memberPresent.filter((member: any) => member.name !== Membername),
      );
    } else {
      setMemberPresent([
        ...memberPresent,
        {name: Membername, markAs: 'present'},
      ]);
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  console.log('in useAttendence rendered, member list', memberPresent);

  const {
    mutate,
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

  const onSubmit = (): any => {
    console.log('onsubmit', memberPresent);

    mutate(
      {
        date: dateOfAttendence,
        memberAttendence: memberPresent,
      },
      {
        onError: (err: any) => {
          setMessage(err.response.data);
        },
        onSuccess: (res: any) => {
          console.log(res.data.message);

          setMessage(res.data.message);
        },
      },
    );
  };
  const onCancel = (): any => {
    setMemberPresent([]);
    setDateOfAttendence(moment().format('DD-MM-YYYY'));
  };

  return {
    onSubmit,
    successMutate,
    Message,
    memberPresent,
    setMemberPresent,
    MarkMemberAttendence,
    showDatePicker,
    hideDatePicker,
    isDatePickerVisible,
    setDateOfAttendence,
    dateOfAttendence,
    onCancel,
  };
};

export default useMarkAttendence;
