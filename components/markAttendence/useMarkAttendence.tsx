import {View, Text} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';
import moment from 'moment';
import {useQuery} from 'react-query';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

type Props = {
  Membername: string;
  name: string;
  member: any;
  contactno: number;
};

const useMarkAttendence = () => {
  const [Message, setMessage] = useState('');
  const [memberPresent, setMemberPresent] = useState<any>([]);
  const [dateOfAttendence, setDateOfAttendence] = useState<string>(
    moment().format('DD-MM-YYYY'),
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const MarkMemberAttendence = ({contactno, name}: Props) => {
    if (memberPresent.some((member: any) => member.contact === contactno)) {
      setMemberPresent(
        memberPresent.filter((member: any) => member.contact !== contactno),
      );
    } else {
      setMemberPresent([
        ...memberPresent,
        {name: name, contact: contactno, markAs: 'present'},
      ]);
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  //to get attendence
  const getAttendence = async () => {
    const response = await axios.post(
      'http://ec2-43-204-107-0.ap-south-1.compute.amazonaws.com:4000/api/v1/getAttendence',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        date: moment(dateOfAttendence, 'DD-MM-YYYY')
          .utcOffset('+05:30')
          .toDate(),
      },
    );
    response.data.memberAttendence
      ? setMemberPresent([...response.data.memberAttendence])
      : setMemberPresent([]); //adding values even after not clicked

    return response;
  };
  const {
    refetch: refetchgetAttendence,
    data: getAttendenceData,
    isLoading: getAttendenceLoading,
    isError: getAttendenceError,
    isSuccess: getAttendenceSuccess,
  } = useQuery(['getAttendence', dateOfAttendence], getAttendence, {
    cacheTime: 0,
    // enabled: dateOfAttendence,
  });
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
    mutate(
      {
        date: moment(dateOfAttendence, 'DD-MM-YYYY')
          .utcOffset('+05:30')
          .toDate(), //moment cannot figure out type of date magically,need to give input manually
        memberAttendence: memberPresent,
      },
      {
        onError: (err: any) => {
          console.log('error', err);

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
  const onCancelUpdate = (): any => {
    console.log(
      'on cancel update',
      memberPresent.filter((member: any) =>
        getAttendenceData?.data.memberAttendence.some(
          (item: any) => member.contact === item.contact,
        ),
      ),
    );

    setMemberPresent(
      memberPresent.filter((member: any) =>
        getAttendenceData?.data.memberAttendence.some(
          (item: any) => member.contact === item.contact,
        ),
      ),
    );
  };
  console.log('after cancel update:', memberPresent);

  return {
    refetchgetAttendence,
    onSubmit,
    successMutate,
    errorMutate,
    lodingMutate,
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
    getAttendenceData,
    onCancelUpdate,
  };
};

export default useMarkAttendence;
