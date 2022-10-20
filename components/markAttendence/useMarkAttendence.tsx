import {View, Text} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';

type Props = {
  Membername: string;
  name: string;
};

const useMarkAttendence = (name: string) => {
  const [Message, setMessage] = useState('');
  const [memberPresent, setMemberPresent] = useState<any>([]);
  const [checked, onChange] = useState(false);

  const MarkMemberAttendence = (Membername: string) => {
    setMemberPresent([...memberPresent, {name: Membername, markAs: 'present'}]);
  };

  console.log('in useAttendence rendered, member list', memberPresent);

  const {
    mutate,
    isLoading: lodingMutate,
    isError: errorMutate,
    isSuccess: successMutate,
    error: ErrorMutate,
  } = useMutation((newMember: any): any =>
    axios.post('http://192.168.1.2:4000/api/v1/markAttendence', newMember),
  );

  const onSubmit = (): any => {
    console.log('onsubmit', memberPresent);

    mutate(
      {
        date: '2022-09-08',
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

  return {
    onSubmit,
    onChange,
    checked,
    successMutate,
    Message,
    memberPresent,
    setMemberPresent,
    MarkMemberAttendence,
  };
};

export default useMarkAttendence;
