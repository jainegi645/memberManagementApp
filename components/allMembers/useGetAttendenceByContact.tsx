import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

type Props = {
  contact: number;
};

const useGetAttendenceByContact = (contact: Props) => {
  const getAttendenceByContact = async () => {
    const response = await axios.post(
      'http://localhost:4000/api/v1/getAttendenceByContact',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        contact: contact,
      },
    );

    return response;
  };
  const {
    data: getAttendenceByContactData,
    isLoading: getAttendenceByContactLoading,
    isError: getAttendenceByContactError,
    isSuccess: getAttendenceByContactSuccess,
  } = useQuery('getAttendenceByContact', getAttendenceByContact, {
    cacheTime: 0,
    // enabled: dateOfAttendence,
  });
  console.log('in use :');

  return {
    getAttendenceByContactData,
    getAttendenceByContactLoading,
    getAttendenceByContactError,
    getAttendenceByContactSuccess,
  };
};

export default useGetAttendenceByContact;
