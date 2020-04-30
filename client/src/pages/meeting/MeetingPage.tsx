import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text, TabView, Spinner } from '@ui-kitten/components';
import { PageLayout } from "../PageLayout";
import { MeetingForm } from "./MeetingForm";
import { MeetingList } from "./MeetingList";
import { RouteChildProps, RouteParams } from "../../AppRoot";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMeetingQuery } from "../../lib/codegen";
import { TextError } from "../../components/TextError";
import { useNavigation } from "@react-navigation/native";

type TabPages = {
  list: { setId: (id: string | undefined) => void },
  view: { id?: string },
  create: undefined
}

const { Navigator, Screen } = createMaterialTopTabNavigator<TabPages>();



export const MeetingPage: React.FC<RouteChildProps<RouteParams['Meeting']>> = props => {
  const [viewId, setViewId] = useState<string | undefined>(undefined)

  const NewMeetingScreen: React.FC<{ navigation: StackNavigationProp<TabPages>, route: { params: TabPages['create'] } }> = _props => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
      <MeetingForm />
    </Layout>
  );
  
  const ListScreen: React.FC<{ navigation: StackNavigationProp<TabPages>, route: { params: TabPages['list'] } }> = _props => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MeetingList onSelect={({ id }) => {
        _props.route.params.setId(id)
        _props.navigation.setParams({ activeId: id })
        _props.navigation.navigate('view')
      }} />
    </Layout>
  );
  
  const ViewScreen: React.FC<{ navigation: StackNavigationProp<TabPages>, route: { params: TabPages['view'] } }> = _props => {
    const { data, loading, error } = useMeetingQuery({ variables: { id: viewId! }, skip: !viewId })
  
    const meeting = data && data.meeting ? data.meeting : undefined
  
    if (loading)
      return <Spinner />
    if (error)
      return <TextError value={error.message} />
  
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {meeting && <MeetingForm meeting={meeting} />}
        {!meeting && <Text> Please select a meeting from the list</Text>}
      </Layout>
    )
  }

  return (
    <Navigator
      tabBar={({ navigation, state }) => (
        <TabBar
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}>
          <Tab title='LIST' />
          <Tab title='VIEW' />
          <Tab title='CREATE' />
        </TabBar>
      )}
    >
      <Screen name='list' initialParams={{ setId: (id) => setViewId(id) }} component={ListScreen} />
      <Screen name='view' initialParams={{ id: viewId }} component={ViewScreen} />
      <Screen name='create' component={NewMeetingScreen} />
    </Navigator>
  );
}