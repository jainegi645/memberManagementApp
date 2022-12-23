import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../style/Stylesheet/Styles';

type Props = {};

const Loader = (props: Props) => {
  const [show, setShow] = useState(true);
  return (
    <View>
      <Spinner
        visible={show}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

export default Loader;
