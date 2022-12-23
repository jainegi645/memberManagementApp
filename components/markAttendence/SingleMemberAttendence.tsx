import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import Checkbox from 'expo-checkbox';
type Props = {
  name: string;
  clickHandler: any;
  memberPresent: any;
  contact: number;
  prevAttendene: boolean;
};

const SingleMemberAttendence = ({
  name,
  clickHandler,
  contact,
  prevAttendene,
  memberPresent,
}: Props) => {
  const [checked, setChecked] = useState(
    memberPresent.some((item: any) => item.contact === contact),
  );
  const onCheckPress = (contactno: number) => {
    setChecked(!checked);
    clickHandler({contactno, name});
  };
  useEffect(() => {
    console.log('use effect ran');

    memberPresent.some((item: any) => item.contact === contact)
      ? setChecked(true)
      : setChecked(false);
  }, [contact, memberPresent]);

  return (
    //TODO: useQuery to fetch the data from the database for checkbox to be prechecked,
    <>
      <View
        style={tw`border rounded-md border-slate-500 py-4 mt-2 flex-row justify-between px-2 mb-4 mx-2 items-center`}>
        <Text style={tw`text-xl capitalize`}>{name}</Text>

        <Checkbox
          value={checked}
          onValueChange={() => onCheckPress(contact)}
          color={checked ? '#4630EB' : undefined}
        />
      </View>
    </>
  );
};

export default React.memo(SingleMemberAttendence);
