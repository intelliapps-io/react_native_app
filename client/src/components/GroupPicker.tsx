import React, { useEffect } from "react";
import { Autocomplete, AutocompleteItem, Modal, Input, Card, Text, Button } from "@ui-kitten/components";
import { useGroupsQuery, Group } from "../lib/codegen";
import { StyleProp, TextStyle, StyleSheet } from "react-native";

interface GroupPickerProps {
  groupId: string | undefined
  onChange: (groupId: string | undefined) => void
  style?: StyleProp<TextStyle>
}

export const GroupPicker: React.FC<GroupPickerProps> = props => {
  const groupsQuery = useGroupsQuery({
    onCompleted: ({ groups }) => {
      if (props.groupId)
        for (let i = 0; i < groups.length; i++)
          if (groups[i].id === props.groupId)
            setValue({ name: groups[i].name, groupId: groups[i].id })
    }
  })
  const groups = groupsQuery.data && groupsQuery.data.groups ? groupsQuery.data.groups : []

  const [value, setValue] = React.useState<{ groupId?: string, name: string }>({ name: '' });
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const onChangeText = (query: string) => {
    // setValue({ });

  };

  return (
    <>
      <Text style={{ fontSize: 12, color: '#8f9bb3', marginBottom: 5 }}>Group</Text>
      <Button
        onPress={() => setIsModalOpen(true)}
        style={props.style}
      >
        {value.name ? value.name : 'Select a Group'}
      </Button>
      <Modal
        visible={isModalOpen}
        backdropStyle={styles.backdrop}
      >
        <Card>
          {groups.map(group => <>
            <Button
              style={styles.buttonOpt}
              key={group.id}
              onPress={() => {
                setValue({ name: group.name, groupId: group.id })
                setIsModalOpen(false)
                props.onChange(group.id)
              }}
            >{group.name}</Button>
          </>)}
        </Card>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonOpt: {
    marginBottom: 10
  }
});