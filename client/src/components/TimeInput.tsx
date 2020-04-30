import React, { useState } from 'react'
import { Layout, Text, InputProps } from '@ui-kitten/components'
import { NumberInput } from './NumberInput'
import { StyleProp, ViewStyle } from 'react-native'
import moment from "moment"

interface TimeInputProps {
  value?: number
  label?: string
  onChangeText: (value: number) => void
  style?: StyleProp<ViewStyle>
}

export const TimeInput: React.FC<TimeInputProps> = props => {
  const [date, setDate] = useState(moment().startOf('day').add(props.value, 'minutes'))
  
  const [hour, _setHour] = useState(date.clone().diff(date.clone().startOf('day'), 'hours'))
  const [min, _setMin] = useState(parseInt(date.format('m')))

  const handleChange = (type: 'hour' | 'min', value?: number) => {
    if (value)
      switch (type) {
        case 'hour':
          if (value >= 0 && value <= 23) {
            _setHour(value)
            setDate(date.set('hour', value))
          }
          break
        case 'min':
          if (value >= 0 && value <= 59) {
            _setMin(value)
            setDate(date.set('minute', value))
          }
          break
      }
    props.onChangeText(date.clone().diff(date.clone().startOf('day'), 'minutes'))
  }

  return <Layout style={props.style}>
    <Text style={{ fontSize: 12, color: '#8f9bb3', marginBottom: 5 }}>{props.label}</Text>
    <Layout
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
      }]}
    >
      <NumberInput
        value={hour as any}
        onChangeText={(value: number | undefined) => handleChange('hour', value)}
      />
      <Text style={{ marginLeft: 10, marginRight: 10 }}>:</Text>
      <NumberInput
        value={min as any}
        onChangeText={(value: number | undefined) => handleChange('min', value)}
      />
    </Layout>
  </Layout>
}