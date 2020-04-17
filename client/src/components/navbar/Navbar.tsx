import React, { useState, useEffect } from "react";
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";

interface NavbarProps {

}

const BackIcon: React.FC<any> = props => <Icon {...props} name='arrow-back' />

export const Navbar: React.FC<NavbarProps & StackHeaderProps> = props => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

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

  return (
    <View>
      <TopNavigation
        alignment='center'
        title={evaProps => <Text {...evaProps} category='h3' style={{ fontSize: 20 }}>{props.scene.route.name}</Text>}
        accessoryLeft={() =>
          <TopNavigationAction
            onPress={() => navigation.goBack()}
            icon={(_props: any) => <Animated.View style={{ opacity: fadeAnim }}><BackIcon {..._props} /></Animated.View>}
            style={{ display: fadeOpacity < 0.05 ? 'none' : 'flex' }}
          />}
      />
    </View>
  );
}