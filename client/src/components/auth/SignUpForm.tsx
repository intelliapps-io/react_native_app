import React, { useState } from "react";
import { Text, Input, Icon, Button, Select, SelectItem, IndexPath, Divider } from "@ui-kitten/components";
import { PageLayout } from "../../pages/PageLayout";
import { SignUpInput, UserRole } from "../../lib/codegen";
import { StyleSheet, View } from "react-native";

interface SignUpFormProps {

}

type FormFields = SignUpInput & { confirmPassword: string, parentsEmail: string[], studentsEmail: string[] }

export const SignUpForm: React.FC<SignUpFormProps> = props => {
  const formState = useState<FormFields>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    parentsEmail: [],
    studentsEmail: [],
    role: UserRole['Student']
  })

  const [accountType, setAccountType] = React.useState<'Student' | 'Parent'>('Student');

  const setFieldValue = (key: keyof FormFields, value: any) => formState[1]({ ...formState[0], [key]: value })

  console.log(formState[0].parentsEmail)

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
        placeholder="Password"
        accessoryLeft={_props => <Icon {..._props} name='lock-outline' />}
        value={formState[0]['password']}
        onChangeText={value => setFieldValue('password', value)}
        style={styles.input}
      />

      <Input
        placeholder="Confirm Password"
        accessoryLeft={_props => <Icon {..._props} name='lock-outline' />}
        value={formState[0]['confirmPassword']}
        onChangeText={value => setFieldValue('confirmPassword', value)}
        style={styles.input}
      />

      <Button style={styles.button}>Create Account</Button>
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