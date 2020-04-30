import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { GroupInput, Group, useCreateGroupMutation, useEditGroupMutation } from "../../lib/codegen";
import { NumberInput } from "../../components/NumberInput";
import { ApolloError } from "apollo-client";

interface GroupFormProps {
  group?: Group
  onDone: () => void
}

export const GroupForm: React.FC<GroupFormProps> = props => {
  // state
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const formState = useState<GroupInput>(props.group ? props.group : {
    name: '',
    description: '',
    minMenteeGradeLevel: 0,
    minMentorGradeLevel: 0,
  })
  const setFieldValue = (key: keyof GroupInput, value: any) => formState[1]({ ...formState[0], [key]: value })

  // mutations
  const [createGroup] = useCreateGroupMutation()
  const [editGroup] = useEditGroupMutation()

  const handleSubmit = () => {
    if (props.group) {
      // update existing group
      editGroup({
        variables: {
          id: props.group.id,
          input: {
            description: formState[0].description,
            minMenteeGradeLevel: formState[0].minMenteeGradeLevel,
            minMentorGradeLevel: formState[0].minMentorGradeLevel,
            name: formState[0].name
          }
        }
      })
        .then(() => props.onDone())
        .catch((err: ApolloError) => setErrorMsg(err.message))
    } else {
      // create new group
      createGroup({ variables: { input: formState[0] } })
        .then(() => props.onDone())
        .catch((err: ApolloError) => setErrorMsg(err.message))
    }
  }

  return (
    <View>

      <Input
        label="Name"
        value={formState[0]['name']}
        onChangeText={value => setFieldValue('name', value)}
        style={styles.input}
      />

      <Input
        label="Description"
        value={formState[0]['description']}
        onChangeText={value => setFieldValue('description', value)}
        style={styles.input}
      />

      <NumberInput
        value={formState[0]['minMenteeGradeLevel']}
        onChangeText={value => value ? setFieldValue('minMenteeGradeLevel', value) : () => { }}
        // @ts-ignore
        label="Min Mentee Grade Level"
        style={styles.input}
      />

      <NumberInput
        value={formState[0]['minMentorGradeLevel']}
        onChangeText={value => value ? setFieldValue('minMentorGradeLevel', value) : () => { }}
        // @ts-ignore
        label="Min Mentor Grade Level"
        style={styles.input}
      />

      {errorMsg && <Text style={{ marginTop: 20, marginBottom: 20, color: 'red' }}>{errorMsg}</Text>}

      <Button onPress={handleSubmit}>{props.group ? 'Save Group' : 'Create Group'}</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20
  },
  button: {
  }
})