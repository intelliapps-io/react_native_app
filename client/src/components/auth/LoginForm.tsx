import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Layout, Input, Icon, Button } from "@ui-kitten/components";
import { PageLayout } from "../../pages/PageLayout";
import { useLoginMutation, useMeQuery } from "../../lib/codegen";
import { ApolloError } from "apollo-client";
import { useNavigation } from "@react-navigation/native";

interface LoginFormProps {

}

export const LoginForm: React.FC<LoginFormProps> = props => {
  // nav state
  const navState = useNavigation()

  // form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<null | string>(null)

  // login mutation
  const [login] = useLoginMutation()
  const [didLogin, setDidLogin] = useState(false)

  // user query
  const meQuery = useMeQuery({ skip: !didLogin })

  function onLogin() {
    console.log('pressed')
    login({ variables: { email, password } })
      .then(() => {
        // user logged in
        setDidLogin(true)
        console.log('User Logged In Successfully!')
        navState.navigate('Home')
      })
      .catch((err: ApolloError) => {
        // login error
        setError(err.message)
      })
  }

  return (
    <PageLayout level='1' useFlex={true}>
      <Input
        placeholder="Email"
        accessoryLeft={_props => <Icon {..._props} name='email-outline' />}
        value={email}
        onChangeText={value => setEmail(value)}
        style={styles.input}
      />

      <Input
        placeholder="Password"
        accessoryLeft={_props => <Icon {..._props} name='lock-outline' />}
        value={password}
        onChangeText={value => setPassword(value)}
        style={styles.input}
      />

      {error && <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>}

      <Button onPress={onLogin} style={styles.button}>Login</Button>
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