import React, { useState } from "react";
import { Input, StyledComponentClass, InputProps } from "@ui-kitten/components";

interface NumberInputProps extends Omit<Omit<StyledComponentClass<InputProps>, 'value'>, 'onChangeText'> {
  value: number | undefined
  onChangeText: (value: number | undefined) => void
}

export const NumberInput: React.FC<NumberInputProps> = props => {

  const [textValue, setTextValue] = useState(typeof props.value === 'number' && `${props.value}` !== 'NaN' ? props.value + '' : '')

  React.useEffect(() => {
    if (typeof props.value === 'number' && `${props.value}` !== 'NaN')
      if (`${props.value}` !== textValue)
        setTextValue(props.value + '')
  }, [props.value])

  const onEdit = (value: string) => {

    // empty field
    if (value.length <= 0) {
      setTextValue('')
      props.onChangeText(undefined)
    }

    // on field input
    try {
      const nums = parseFloat(value)
      if (`${nums}` !== 'NaN') {
        setTextValue(nums + '')
        props.onChangeText(nums)
      }
    } catch (err) {
      setTextValue('')
      props.onChangeText(undefined)
    }

  }

  return (
    <Input
      {...props}
      value={textValue}
      onChangeText={onEdit}
    />
  );
}