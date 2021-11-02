import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Input(props) {
  return (
    <View>
      <TextInput
        {...props}
        clearButtonMode='while-editing'
        style={[styles.textInput, props.error, props.style]}
      />
      {props.errorText && (
        <Text>{props.errorText}</Text>
      )}
    </View>
  );
}

const styles = {
  textInput: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 16
  },
};