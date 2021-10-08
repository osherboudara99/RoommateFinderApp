import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state=({ 

      isDateTimePickerVisible: false,
      selecteddate:''
    })
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (pickeddate) => {
    day   = pickeddate.getDate();
    month = pickeddate.getMonth();
    year  = pickeddate.getFullYear();
    console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    exdate= day + '-' + month + '-' + year
    this._hideDateTimePicker();
  };

  onFocus = () => {
    this._handleDatePicked();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextInput 
        placeholder="placeholder..."
        onClick={ () => this._showDateTimePicker() }
        value={this.state.selecteddate}
        />
        {/* //--------------------------------------DateTimePicker */}
        <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      mode={'date'}
                      datePickerModeAndroid={'spinner'}

                    />
            {/* //-------------------------------------- */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});