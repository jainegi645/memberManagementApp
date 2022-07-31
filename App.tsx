import React, {useEffect} from 'react';
import {SafeAreaView, Text, StatusBar, View, Button} from 'react-native';
import tw from 'twrnc';
import {QueryClient, QueryClientProvider} from 'react-query';
import AddMember from './screens/AddMember';
import AllMembers from './screens/AllMembers';
import {NavigationContainer} from '@react-navigation/native';
import ScreenNavigation from './navigation/ScreenNavigation ';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    // <SafeAreaView>
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        {/* <View style={tw`p-4  android:pt-2 dark:bg-black`}> */}
        <ScreenNavigation />
        {/* </View> */}
      </QueryClientProvider>
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default App;
