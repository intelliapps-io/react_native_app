import React, { useState } from "react";
import { PageLayout } from "../PageLayout";
import { Text, List, ListItem, Divider, Button, Card, Spinner, Layout, TabBar, Tab } from "@ui-kitten/components";
import { useGroupsQuery, Group, useGroupQuery, useJoinGroupMenteeMutation, useJoinGroupMentorMutation, useLeaveGroupMenteeMutation, useLeaveGroupMentorMutation } from "../../lib/codegen";
import { StyleSheet, ScrollView } from "react-native";
import { GroupForm } from "./GroupForm";

import { RouteChildProps, RouteParams } from "../../AppRoot"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ApolloError } from "apollo-client";
import { StackNavigationProp } from "@react-navigation/stack";

const { Navigator, Screen } = createMaterialTopTabNavigator();

type SubPages = {
  list: undefined,
  edit: undefined,
  create: undefined
}

export const GroupPage: React.FC<RouteChildProps<RouteParams['Group']>> = props => {
  const { activeId } = props.route.params

  // mutations
  const [joinGroupMentee] = useJoinGroupMenteeMutation({ variables: { id: activeId! } }),
    [joinGroupMentor] = useJoinGroupMentorMutation(),
    [leaveGroupMentee] = useLeaveGroupMenteeMutation(),
    [leaveGroupMentor] = useLeaveGroupMentorMutation(),
    [joinGroupError, setJoinGroupError] = useState<string | null>(null)

  // querys
  const groupsQuery = useGroupsQuery(),
    groupQuery = useGroupQuery({ variables: { id: activeId! }, skip: !activeId }),
    reload = () => groupsQuery.refetch(),
    reloadGroup = () => groupQuery.refetch()

  const ListPage = (_props: { navigation: StackNavigationProp<SubPages> }) => {
    const renderGroup = (args: { item: Group, index: number }) => (
      <ListItem
        title={`${args.item.name} ${args.index + 1}`}
        description={`${args.item.description} ${args.index + 1}`}
        onPress={() => {
          props.navigation.setParams({ activeId: args.item.id })
          _props.navigation.navigate('edit')
        }}
      />
    );
    return <List
      style={styles.listContainer}
      data={groupsQuery.data && groupsQuery.data.groups ? groupsQuery.data.groups : []}
      ItemSeparatorComponent={Divider}
      renderItem={renderGroup}
    />
  }

  const CreatePage = (_props: { navigation: StackNavigationProp<SubPages> }) => (
    <ScrollView>
      <Text style={{ marginBottom: 20 }}>Create New Group</Text>
      <GroupForm
        onDone={() => {
          reload()
          _props.navigation.navigate('list')
        }}
      />
    </ScrollView>
  )

  const EditPage = (_props: { navigation: StackNavigationProp<SubPages> }) => (
    <ScrollView style={{ width: '90%' }}>
      {groupQuery.data && groupQuery.data.group ?
        (<>
          <GroupForm
            group={groupQuery.data.group as any}
            onDone={() => {
              reload()
              _props.navigation.navigate('list')
            }}
          />
          <Divider style={styles.divider} />

          {joinGroupError && <Text style={{ marginTop: 200, marginBottom: 20, color: 'red' }}>{joinGroupError}</Text>}

          <Text>Mentees:</Text>
          {groupQuery.data.group.mentees.map(item => <Text key={item.id}>{item.name}</Text>)}

          <Text>Mentors:</Text>
          {groupQuery.data.group.mentors!.map(item => <Text key={item.id}>{item.name}</Text>)}

          <Divider style={styles.divider} />
          <Button onPress={() => {
            joinGroupMentee({ variables: { id: groupQuery.data!.group!.id } })
              .then(reloadGroup)
              .catch((err: ApolloError) => setJoinGroupError(err.message))
          }}>Join as Mentee</Button>
          <Button onPress={() => {
            joinGroupMentor({ variables: { id: groupQuery.data!.group!.id } })
              .then(reloadGroup)
              .catch((err: ApolloError) => setJoinGroupError(err.message))
          }}>Join as Mentor</Button>
          <Button
            onPress={() => {
              leaveGroupMentee({ variables: { id: groupQuery.data!.group!.id } })
                .then(reloadGroup)
                .catch((err: ApolloError) => setJoinGroupError(err.message))
            }}
          >Leave as Mentee</Button>
          <Button onPress={() => {
            leaveGroupMentor({ variables: { id: groupQuery.data!.group!.id } })
              .then(reloadGroup)
              .catch((err: ApolloError) => setJoinGroupError(err.message))
          }}>Leave as Mentor</Button>
        </>) :
        <Spinner />
      }
    </ScrollView>
  )

  return (
    <Navigator tabBar={({ navigation, state }) => (
      <TabBar
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <Tab title='LIST' />
        <Tab title='CREATE' />
        <Tab title='EDIT' disabled={!activeId} />
      </TabBar>
    )}>
      <Screen name='List' component={ListPage} />
      <Screen name='Edit' component={EditPage} />
      <Screen name='Create' component={CreatePage} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    maxHeight: 400,
    width: '100%'
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  },
  modal: {
    width: '90%',
    position: 'absolute',
    top: 100
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});