import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Divider } from "@ui-kitten/components";
import { PageLayout } from "../../pages/PageLayout";
import { useNavigation } from "@react-navigation/native";

const Spacer = () => <View style={{ height: 20 }} />

interface WelcomeLandingProps {

}

export const WelcomeLanding: React.FC<WelcomeLandingProps> = props => {
  const navigation = useNavigation()

  return (
    <PageLayout level='1' style={styles.layout}>
      <Text category='h1' style={{ textAlign: 'center' }}>Welcome to <Text category='h1' style={{ fontWeight: "bold" }}>Awesome App</Text></Text>
      <Spacer />
      <Divider />
      <Spacer />
      <Button style={styles.button} status='primary' activeOpacity={0.6} onPress={() => navigation.navigate('Login')}>Login</Button>
      <Button style={styles.button} status='success' activeOpacity={0.6} onPress={() => navigation.navigate('Sign Up')}>Sign Up</Button>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    margin: 2,
  }
})