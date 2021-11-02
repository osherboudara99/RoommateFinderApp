import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Controller } from 'react-hook-form'

const Question = ({ name, question, defaultValue, display, control, rules, render }) => {

  return (
    <View style={{ display: display ? 'flex' : 'none' }}>
      <Text
        style={styles.description}
      >
        {question}
      </Text>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={render}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 15,
    fontSize: 18
  }
})

export default Question