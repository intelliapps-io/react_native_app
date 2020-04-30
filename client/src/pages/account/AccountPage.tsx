import React, { useContext } from "react";
import { PageLayout } from "../PageLayout";
import { Text, Divider, Card, Button } from "@ui-kitten/components";
import { AppContext } from "../../lib/AppContext";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { useMeQuery } from "../../lib/codegen";

interface AccountPageProps {

}

export const AccountPage: React.FC<AccountPageProps> = props => {
  const { me } = useContext(AppContext)
  const meQuery = useMeQuery()
  if (!me)
    return <Text>Login</Text>
  return (
    <PageLayout useFlex={true}>
      <Text category="h4" style={{ width: '80%', marginBottom: 10 }}>Your Information</Text>
      <View>
        <Text category="h6"><Text style={styles.field}>Name</Text> {me.name}</Text>
        <Text category="h6"><Text style={styles.field}>Email</Text> {me.email}</Text>
        <Text category="h6"><Text style={styles.field}>Phone</Text> {me.phone}</Text>
      </View>
      <Divider style={styles.divider} />
      <Text category="h4" style={{ width: '80%', marginBottom: 10 }}>Schedule</Text>
      <ScrollView style={{ width: '80%' }}>
        {me.meetings.map(mtg => {
          return <Card key={mtg.id} style={{ width: '100%' }}>
            <Text category="h5" style={{ marginBottom: 10 }}>Meeting</Text>
            <Text>{mtg.date + ''}</Text>
          </Card>
        })}
      </ScrollView>
      <Button style={{ marginBottom: 20 }} onPress={() => { meQuery.refetch() }}>Refresh</Button>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  divider: {
    margin: 20
  },
  field: {
    fontWeight: 'bold'
  }
})