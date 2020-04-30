import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { MeetingInput, MeetingFragment, useCreateMeetingMutation, useMeetingsQuery, useDeleteMeetingMutation } from "../../lib/codegen";
import { Input, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { NumberInput } from "../../components/NumberInput";
import { TimeInput } from "../../components/TimeInput";
import { GroupPicker } from "../../components/GroupPicker";
import { ApolloError } from "apollo-client";
import { TextError } from "../../components/TextError";

interface MeetingFormProps {
  meeting?: MeetingFragment
}

export const MeetingForm: React.FC<MeetingFormProps> = props => {
  // mutations
  const [createMeeting] = useCreateMeetingMutation()
  const [deleteMeeting] = useDeleteMeetingMutation()
  const meetingsQuery = useMeetingsQuery()

  // state
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const formState = useState<MeetingInput>(props.meeting ? (props.meeting as any) : {
    title: '',
    capacity: '',
    date: '',
    description: '',
    endMin: 0,
    startMin: 0,
    groupId: '',
    location: ''
  })
  const setFieldValue = (key: keyof MeetingInput, value: any) => formState[1]({ ...formState[0], [key]: value })

  // force refresh the form on new meeting selected
  React.useEffect(() => {
    if (props.meeting)
      formState[1](props.meeting as any)
  }, [props.meeting])

  // create meeting
  function handleCreate() {
    createMeeting({ variables: { input: { ...formState[0] } } })
      .then(() => {
        setErrorMsg('')
        meetingsQuery.refetch()

      })
      .catch((err: ApolloError) => {
        setErrorMsg(err.message)
      })
  }

  return (
    <ScrollView style={styles.container}>
      <GroupPicker
        groupId={formState[0]['groupId']}
        onChange={id => setFieldValue('groupId', id)}
        style={styles.input}
      />

      <Input
        label="Title"
        value={formState[0]['title']}
        onChangeText={value => setFieldValue('title', value)}
        style={styles.input}
      />

      <NumberInput
        //@ts-ignore
        label="capacity"
        value={formState[0]['capacity']}
        onChangeText={value => setFieldValue('capacity', value)}
        style={styles.input}
      />

      <Input
        label="Date"
        value={formState[0]['date']}
        onChangeText={value => setFieldValue('date', value)}
        style={styles.input}
      />

      <Input
        label="Description"
        value={formState[0]['description']}
        onChangeText={value => setFieldValue('description', value)}
        style={styles.input}
      />

      <Input
        label="location"
        value={formState[0]['location']}
        onChangeText={value => setFieldValue('location', value)}
        style={styles.input}
      />

      <TimeInput
        label="Start Time"
        value={formState[0]['startMin']}
        onChangeText={value => setFieldValue('startMin', value)}
        style={styles.input}
      />

      <TimeInput
        label="End Time"
        value={formState[0]['endMin']}
        onChangeText={value => setFieldValue('endMin', value)}
        style={styles.input}
      />
      
      {errorMsg && <TextError value={errorMsg} />}

      <Button style={styles.button} onPress={handleCreate}>{props.meeting ? 'Save' : 'Create'}</Button>
      {props.meeting && <Button style={styles.button} onPress={() => { deleteMeeting({ variables: { id: props.meeting!.id }}) }} status="danger">Delete</Button>}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20
  },
  button: {
    marginBottom: 20
  },
  container: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})