import React, { useContext } from "react";
import { PageLayout } from "../PageLayout";
import { Text, Button, Divider } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { AppContext } from "../../lib/AppContext";
import { useNavigation } from "@react-navigation/native";

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = props => {
  const navigation = useNavigation()

  return (
    <PageLayout>
      <Button style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('Admin')}>
        {() => <Text category='h3'>Admin</Text>}
      </Button>


      <Button style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('Student')} >
        {() => <Text category='h3'>Student</Text>}
      </Button>

      
      <Button style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('Parent')}>
        {() => <Text category='h3'>Parent</Text>}
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