import React, { useState } from "react";
import { Text, Input, Icon, Button } from "@ui-kitten/components";
import { PageLayout } from "../../pages/PageLayout";
import { SignUpInput, UserRole } from "../../lib/codegen";
import { StyleSheet } from "react-native";

interface SignUpFormProps {

}

type FormFields = SignUpInput & {confirmPassword: string }

export const SignUpForm: React.FC<SignUpFormProps> = props => {
  const formState = useState<FormFields>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: UserRole['Student']
  })

  const setFieldValue = (key: keyof FormFields, value: any) => formState[1]({ ...formState[0], [key]: value })

  return (
    <PageLayout level='1' useFlex={true} style={{ padding: 20 }}>

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