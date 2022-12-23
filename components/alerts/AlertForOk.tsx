import {View, Text} from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

type Props = {
  showAlert: boolean;
  setShowAlert: any;
  title: string;
  message: string;
  onConfirmPressed: any;
  showCancelButton: boolean;
};

const AlertForOk = ({
  showAlert,
  setShowAlert,
  title,
  onConfirmPressed,
  message,
  showCancelButton,
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
        showCancelButton={showCancelButton}
        showConfirmButton={true}
        cancelText="cancel"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={onConfirmPressed}
      />
    </View>
  );
};

export default React.memo(AlertForOk);
