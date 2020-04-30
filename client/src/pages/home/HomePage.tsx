import React from "react";
import { PageLayout } from "../PageLayout";
import { Text, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = props => {
  const navigation = useNavigation()

  return (
    <PageLayout useFlex={true}>

      <Button style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('Account')}>
        {() => <Text category='h3'>Account</Text>}
      </Button>

      <Button style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('Meeting')}>
        {() => <Text category='h3'>Meetings</Text>}
      </Button>

      <Button style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('Group')}>
        {() => <Text category='h3'>Group</Text>}
      </Button>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#ddd',
    backgroundColor: '#79b6f2',
    width: '80%'
  }
})