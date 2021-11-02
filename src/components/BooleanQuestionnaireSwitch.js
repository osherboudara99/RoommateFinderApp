import React, { useEffect, useState } from 'react'
import { Switch, Text, View } from 'react-native'

const BooleanQuestionnaireSwitch = ({ value, trueLabel, falseLabel, ...props }) => {
  const [isYes, setIsYes] = useState(value)

  const boolToLabel = (boolVal) => {
    return boolVal ? trueLabel : falseLabel
  }

  var message = boolToLabel(isYes)

  const toggleIsYes = () => {
    setIsYes((currentVal) => !currentVal)
  }

  useEffect(() => {
    message = boolToLabel(isYes)
  }, [message, isYes])

  return (
    <View>
      <Switch
        onValueChange={toggleIsYes}
        value={isYes}
        {...props}
      />
      <Text {...props}>{message}</Text>
    </View>
  )
}

export default BooleanQuestionnaireSwitch