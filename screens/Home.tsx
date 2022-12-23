import {View, Text, TextBase, Pressable} from 'react-native';
import React from 'react';
import {Button, Image, ImageBackground, ScrollView} from 'react-native';
// import bgimgmen from '../style/Images/bgimgmen.png';
import styles from '../style/Stylesheet/Styles';
import Styles from '../style/Stylesheet/Styles';
import arrow from '../style/Images/arrow.png';
import pieChart from '../style/Images/pieChart.png';
import threeLines from '../style/Images/threeLines.png';
import tw from 'twrnc';
import PieChart from 'react-native-pie-chart';
import {Surface, Shape} from '@react-native-community/art';
// import {PieChart} from 'react-native-svg-charts';
type Props = {
  navigation: any;
};

const Home = (props: Props) => {
  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];
  // const screenHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Mark</Text>
          <Text style={styles.headerTitleSmall}> It .</Text>
        </View>

        <View style={styles.semiheaderTitleContainer}>
          <Text style={styles.semiheaderTitle}>Track Your</Text>
          <Text style={styles.semiheaderTitleBelow}>Members</Text>
        </View>
        <Image
          style={Styles.imgMen}
          source={require('../style/Images/bgimgmen.png')}
        />
        <ImageBackground
          source={require('../style/Images/bgpattern.png')}
          resizeMode="cover"
          style={Styles.image}
        />
      </View>

      {/* <View style={Styles.pressableContainer}> */}
      <ScrollView
        // style={Styles.pressableContainer}
        style={styles.scroll}
        contentContainerStyle={{flexGrow: 1}}>
        <Image style={tw`self-center mt-2`} source={threeLines} />
        <Pressable
          style={tw`px-2 py-2 mx-3 mb-4 mt-4 rounded-xl border border-gray-600 flex-row justify-between items-center`}
          onPress={() => props.navigation.navigate('AllMembers')}>
          <View>
            <Text style={tw`text-xl`}> All Members</Text>
            <Text style={tw`text-base`}>find details of all members here</Text>
          </View>
          <Image source={arrow} />
        </Pressable>
        <Pressable
          style={tw`px-2 py-2 mx-3 mb-4   rounded-xl border border-gray-600 flex-row justify-between items-center`}
          onPress={() => props.navigation.navigate('MarkAttendence')}>
          <View>
            <Text style={tw`text-xl`}> Mark Attendence</Text>
            <Text style={tw`text-base`}>mark attendence according to date</Text>
          </View>
          <Image source={arrow} />
        </Pressable>
        <Pressable
          style={tw`px-2 py-2 mx-3 mb-4  rounded-xl border border-gray-600 flex-row justify-between items-center`}
          onPress={() => props.navigation.navigate('AddMember')}>
          <View>
            <Text style={tw`text-xl`}> Add Member</Text>
            <Text style={tw`text-base`}>add a new member here</Text>
          </View>
          <Image source={arrow} />
        </Pressable>
        <View style={tw`border mx-3 mb-4  rounded-xl border-gray-500 z-10 p-6`}>
          {/* <Surface width={500} height={500}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
            />
            <Shape d={pieChart} stroke="#000" strokeWidth={1} />
          </Surface> */}

          <Image style={tw``} source={pieChart} />
        </View>
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

export default Home;
