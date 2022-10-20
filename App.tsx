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
import {Provider as PaperProvider} from 'react-native-paper';
import Styles from './style/Stylesheet/Styles';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <StatusBar />
          <ScreenNavigation />
        </PaperProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
