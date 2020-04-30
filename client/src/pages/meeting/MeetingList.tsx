import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { List, ListItem, Spinner, Button, Icon } from "@ui-kitten/components";
import { Meeting, useMeetingsQuery, useJoinMeetingMutation, useLeaveMeetingMutation, MeetingFragment } from "../../lib/codegen";
import { TextError } from "../../components/TextError";
import { AppContext } from "../../lib/AppContext";

interface MeetingListProps {
  onSelect?: (meeting: Meeting) => void
}

export const MeetingList: React.FC<MeetingListProps> = props => {
  const { me } = useContext(AppContext)
  const [joinMeeting] = useJoinMeetingMutation()
  const [leaveMeeting] = useLeaveMeetingMutation()

  const { loading, error, data, refetch } = useMeetingsQuery()
  const listData = data && data.meetings ? data.meetings : []

  const isPartOfMeeting = (meeting: MeetingFragment) => {
    const isMentor = meeting.attendingMentees.filter(account => account.id === me!.id)
    const isMentee = meeting.attendingMentors!.filter(account => account.id === me!.id)
    return isMentee || isMentor
  }

  if (loading)
    return <Spinner />
  if (error)
    return <TextError value={error.message} />
  return (
    <>
      <List
        style={styles.container}
        data={listData}
        renderItem={(args: { item: Meeting, index: number }) => (
          <ListItem title={`${args.item.title} ${args.index + 1}`}
            key={args.item.id}
            onPress={() => { if (props.onSelect) props.onSelect(args.item) }}
            accessoryRight={() =>
              <>
                <Button onPress={() => leaveMeeting({ variables: { id: args.item.id } })} status='danger' appearance='ghost' accessoryRight={props => <Icon name='minus-circle-outline' {...props} />} />
                <Button onPress={() => joinMeeting({ variables: { id: args.item.id } })} appearance='ghost' accessoryRight={props => <Icon name='plus-circle-outline' {...props} />} />
              </>
            }
          />
        )}
      />
      <Button onPress={() => refetch()}>Reload</Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
});