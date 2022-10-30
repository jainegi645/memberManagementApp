import {View, Text} from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

type Props = {
  showAlert: boolean;
  setShowAlert: any;
  title: string;
  message: string;
  onConfirmPressed: any;
};

const AlertForDelete = ({
  showAlert,
  setShowAlert,
  title,
  onConfirmPressed,
  message,
}: Props) => {
  return (
    <View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="cancel"
        // confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={onConfirmPressed}
      />
    </View>
  );
};

export default AlertForDelete;
