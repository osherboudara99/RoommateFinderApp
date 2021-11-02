
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const Button = ({ title, style, ...props }) => {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button, style]}
      {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#009387',
    alignContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 75,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 500
  }
})

export default Button