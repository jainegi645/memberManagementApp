import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import arrow from '../../style/Images/arrow-right-black.png';
import Arrow from './Arrow';
import tw from 'twrnc';
import moment from 'moment';

type Props = {
  DateOfPresent: any;
};

const Calender = ({DateOfPresent}: Props) => {
  // const [dateOfCalender, setDateOfCalender] = useState<any>();
  const markedDate =
    DateOfPresent?.dates &&
    DateOfPresent?.dates.reduce((accumulator: any, value: any, index: any) => {
      return {
        ...accumulator,
        [moment(value).format('YYYY-MM-DD')]: {
          selected: true,
          selectedColor: 'green',
        },
      };
    }, {});

  return (
    <View style={tw`  `}>
      <Calendar
        // Initially visible month. Default = now
        initialDate={moment().format('YYYY-MM-DD')}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2021-11-20'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2023-11-20'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={direction => {
        //   <Arrow />;
        // }}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        // renderHeader={date => {
        //   <Text> {dateOfCalender}</Text>;
        // }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        style={{
          borderColor: 'gray',
          // height: 320,
          borderWidth: 1,
          borderRadius: 5,
        }}
        // theme={{
        //   arrowColor: 'white',
        //   'stylesheet.calendar.header': {
        //     week: {
        //       marginTop: 5,
        //       flexDirection: 'row',
        //       justifyContent: 'space-between',
        //     },
        //   },
        // }}
        markedDates={markedDate}
      />
    </View>
  );
};

export default Calender;

// {
//   '2022-11-16': {selected: true, selectedColor: 'red'},
//   '2022-11-17': {marked: true},
//   '2022-11-18': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2022-11-19': {disabled: true, disableTouchEvent: true},
// }
