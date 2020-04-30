import React, { useState } from "react";
import { PageLayout } from "../PageLayout";
import { Text, List, ListItem, Divider, Button, Modal, Card, Spinner } from "@ui-kitten/components";
import { useGroupsQuery, Group, useGroupQuery, useJoinGroupMenteeMutation, useJoinGroupMentorMutation, useLeaveGroupMenteeMutation, useLeaveGroupMentorMutation } from "../../lib/codegen";
import { StyleSheet, View, ScrollView } from "react-native";
import { GroupForm } from "./GroupForm";

import { RouteChildProps, RouteParams } from "../../AppRoot"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloError } from "apollo-client";

const Tab = createBottomTabNavigator();

export enum GroupSubpage {
  default = 'default',
  create = 'create',
  edit = 'edit'
}

interface GroupPageProps {

}

export const GroupPage: React.FC<GroupPageProps & RouteChildProps<RouteParams['Group']>> = props => {
  const { subpage, activeId } = props.route.params

  const [joinGroupMentee] = useJoinGroupMenteeMutation({ variables: { id: activeId! } })
  const [joinGroupMentor] = useJoinGroupMentorMutation()
  const [leaveGroupMentee] = useLeaveGroupMenteeMutation()
  const [leaveGroupMentor] = useLeaveGroupMentorMutation()
  const [joinGroupError, setJoinGroupError] = useState<string | null>(null)

  const groupsQuery = useGroupsQuery()
  const groupQuery = useGroupQuery({ variables: { id: activeId! }, skip: !activeId })

  const renderGroup = (args: { item: Group, index: number }) => (
    <ListItem
      title={`${args.item.name} ${args.index + 1}`}
      description={`${args.item.description} ${args.index + 1}`}
      onPress={() => props.navigation.setParams({ subpage: GroupSubpage['edit'], activeId: args.item.id })}
    />
  );

  function reload() {
    groupsQuery.refetch()
  }

  function reloadGroup() {
    groupQuery.refetch()
  }

  return (
    <PageLayout useFlex={true} style={{ overflow: 'scroll' }}>

      {subpage === GroupSubpage['default'] && <>
        <List
          style={styles.listContainer}
          data={groupsQuery.data && groupsQuery.data.groups ? groupsQuery.data.groups : []}
          ItemSeparatorComponent={Divider}
          renderItem={renderGroup}
        />

        <Button
          style={{ width: 200 }}
          accessoryRight={() => <Text>Create Group</Text>}
          onPress={() => props.navigation.setParams({ subpage: GroupSubpage['create'] })}
        />

      </>}

      {subpage === GroupSubpage['create'] && <Card style={{ width: '100%' }}>
        <Text style={{ marginBottom: 20 }}>Create New Group</Text>
        <GroupForm
          onDone={() => {
            reload()
            props.navigation.setParams({ subpage: GroupSubpage['default'] })
          }}
        />
      </Card>}

      {subpage === GroupSubpage['edit'] && <>
        <ScrollView style={{ width: '90%' }}>
          {groupQuery.data && groupQuery.data.group ?
            (<>
              <GroupForm
                group={groupQuery.data.group as any}
                onDone={() => {
                  reload()
                  props.navigation.setParams({ subpage: GroupSubpage['default'] })
                }}
              />
              <Divider style={styles.divider} />
              
              {joinGroupError && <Text style={{ marginTop: 20, marginBottom: 20, color: 'red' }}>{joinGroupError}</Text>}
              
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
      </>}

    </PageLayout>
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