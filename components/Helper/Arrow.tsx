import {View, Text, Image} from 'react-native';
import React from 'react';
import arrow from '../../style/Images/arrow-right-black.png';
import styles from '../../style/Stylesheet/Styles';

type Props = {};

const Arrow = (props: Props) => {
  return <Image style={styles.arrow} source={arrow} />;
};

export default Arrow;
