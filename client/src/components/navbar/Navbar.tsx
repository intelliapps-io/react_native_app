import React, { useState, useEffect, useContext } from "react";
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { View, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import { AppContext } from "../../lib/AppContext";
import { useLogoutMutation, useMeQuery } from "../../lib/codegen";
import gql from "graphql-tag";

interface NavbarProps {

}

const BackIcon: React.FC<any> = props => <Icon {...props} name='arrow-back' />
const LogoutIcon: React.FC<any> = props => <Icon {...props} name='log-out-outline' />

export const Navbar: React.FC<NavbarProps & StackHeaderProps> = props => {
  const [logoutMutation] = useLogoutMutation()
  const { me } = useContext(AppContext)

  const navigation = useNavigation()
  const route = useRoute()
  const canGoBack = navigation.canGoBack()

  function handleLogout() {
    logoutMutation({
      refetchQueries: [{
        query: gql`
          {
            me {
              id,
              accountType,
              firstName,
              lastName,
              name,
              email,
              phone,
              authCount
            }
          }
        `
      }]
    }).then(() => {
      navigation.navigate('Welcome')
    })
  }

  // button fade animation
  const [fadeOpacity, setFadeOpacity] = useState(0)
  const [fadeAnim] = useState(new Animated.Value(fadeOpacity))  // Initial value for opacity: 0
  useEffect(() => {
    if (canGoBack) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 500 }).start()
      fadeAnim.addListener(({ value }) => setFadeOpacity(value))
    } else
      Animated.timing(fadeAnim, { toValue: 0, duration: 10 }).start()
  }, [])

  const accountName = me ? me.firstName : ''

  return (
    <View>
      <TopNavigation
        alignment='center'
        title={evaProps => <Text {...evaProps} category='h3' style={{ fontSize: 20 }}>
          {route.name === 'Home' ? `Welcome, ${accountName}` : route.name}
        </Text>}
        accessoryRight={() => {
          if (route.name !== 'Home')
            return <Text></Text>
          return <TopNavigationAction
            onPress={handleLogout}
            icon={(_props: any) => <Animated.View style={{ opacity: fadeAnim }}><LogoutIcon {..._props} /></Animated.View>}
            style={{ display: fadeOpacity < 0.05 ? 'none' : 'flex' }}
          />
        }}
        accessoryLeft={() => {
          if (route.name === 'Home')
            return <Text></Text>
          return <TopNavigationAction
            onPress={() => navigation.goBack()}
            icon={(_props: any) => <Animated.View style={{ opacity: fadeAnim }}><BackIcon {..._props} /></Animated.View>}
            style={{ display: fadeOpacity < 0.05 ? 'none' : 'flex' }}
          />
        }}
      />
    </View>
  );
}