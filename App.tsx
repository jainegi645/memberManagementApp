import React, {useEffect} from 'react';
import {SafeAreaView, Text, StatusBar, View, Button} from 'react-native';
import AddMember from './screens/AddMember';
import tw from 'twrnc';
import {QueryClient, QueryClientProvider} from 'react-query';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <StatusBar />
        <View style={tw`p-4 android:pt-2 dark:bg-black`}>
          <AddMember />
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
