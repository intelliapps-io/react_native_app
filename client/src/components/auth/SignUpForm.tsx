import React, { useState } from "react";
import { Text, Input, Icon, Button, Select, SelectItem, IndexPath, Divider } from "@ui-kitten/components";
import { PageLayout } from "../../pages/PageLayout";
import { StyleSheet, View } from "react-native";
import { CreateAccountInput, AccountType, useCreateStudentAccountMutation, useCreateParentAccountMutation } from "../../lib/codegen";
import { ApolloError } from "apollo-client";
import { useNavigation } from "@react-navigation/native";

interface SignUpFormProps {

}

type FormFields = CreateAccountInput & { gradeLevel: string }

export const SignUpForm: React.FC<SignUpFormProps> = props => {
  const formState = useState<FormFields>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    gradeLevel: ''
  })

  const [accountType, setAccountType] = React.useState<'Student' | 'Parent'>('Student');
  const [error, setError] = React.useState<null | string>(null)

  const [createStudentAccount] = useCreateStudentAccountMutation()
  const [createParentAccount] = useCreateParentAccountMutation()

  const setFieldValue = (key: keyof FormFields, value: any) => formState[1]({ ...formState[0], [key]: value })

  const navState = useNavigation()

  function onCreateAccount() {
    const keys = Object.keys(formState[0])

    for (let i = 0; i < keys.length; i++) {
      // @ts-ignore
      const key = keys[i], val = formState[0][key]
      if (val.length <= 0)
        return setError(`You must provide ${key}`)
      if (key === 'gradeLevel')
        if (parseInt(val) > 12 || parseInt(val) < 1)
          return setError('grade must be 1 - 12')
    }

    setError(null)

    const input = { ...formState[0] }
    // @ts-ignore
    if (input.gradeLevel) input.gradeLevel = parseInt(input.gradeLevel)

    if (accountType === 'Student') {
      createStudentAccount({
        // @ts-ignore
        variables: { input }
      }).then(() => {
        navState.navigate('Login')
      }).catch((err: ApolloError) => {
        setError(err.message)
      })
    } else {
      createParentAccount({
        // @ts-ignore
        variables: { input }
      }).then(() => {
        navState.navigate('Login')
      }).catch((err: ApolloError) => {
        setError(err.message)
      })
    }
  }

  return (
    <PageLayout level='1' useFlex={true} style={{ padding: 20 }}>

      <Select
        label="Account Type"
        value={accountType}
        onSelect={(index) => {
          const { row } = index as IndexPath
          const items = ['Student', 'Parent']
          setAccountType(items[row] as any)
        }}
        style={{ width: '100%', ...styles.input }}
      >
        <SelectItem title='Student' />
        <SelectItem title='Parent' />
      </Select>

      <Input
        placeholder="First Name"
        accessoryLeft={_props => <Icon {..._props} name='person-outline' />}
        value={formState[0]['firstName']}
        onChangeText={value => setFieldValue('firstName', value)}
        style={styles.input}
      />

      <Input
        placeholder="Last Name"
        accessoryLeft={_props => <Icon {..._props} name='person-outline' />}
        value={formState[0]['lastName']}
        onChangeText={value => setFieldValue('lastName', value)}
        style={styles.input}
      />

      <Input
        placeholder="Email"
        accessoryLeft={_props => <Icon {..._props} name='email-outline' />}
        value={formState[0]['email']}
        onChangeText={value => setFieldValue('email', value)}
        style={styles.input}
      />

      <Input
        placeholder="Phone"
        accessoryLeft={_props => <Icon {..._props} name='person-outline' />}
        value={formState[0]['phone'] + ''}
        onChangeText={value => setFieldValue('phone', value)}
        style={styles.input}
      />

      {accountType === 'Student' && <Input
        placeholder="Grade Level"
        accessoryLeft={_props => <Icon {..._props} name='person-outline' />}
        value={formState[0]['gradeLevel'] + ''}
        onChangeText={value => {
          if (value.length <= 0)
            return setFieldValue('gradeLevel', '')
          try {
            const nums = parseInt(value)
            setFieldValue('gradeLevel', nums)
          } catch (err) {
            setFieldValue('gradeLevel', '')
          }
        }}
        style={styles.input}
      />}

      <Input
        placeholder="Password"
        accessoryLeft={_props => <Icon {..._props} name='lock-outline' />}
        value={formState[0]['password']}
        onChangeText={value => setFieldValue('password', value)}
        style={styles.input}
      />

      {error && <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>}

      <Button onPress={onCreateAccount} style={styles.button}>Create Account</Button>

    </PageLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20
  },
  button: {
  }
})