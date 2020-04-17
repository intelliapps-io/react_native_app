import React from "react";
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, View } from "react-native";
import { InitialState, useNavigation, NavigationState } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";

interface NavbarProps {
  
}

const BackIcon = (props: any) => (
  <Icon {...props} name='arrow-back' />
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon} />
);

export const Navbar: React.FC<NavbarProps & StackHeaderProps> = props => {


  return (
    <View>
      <TopNavigation

        alignment='center'
        accessoryLeft={BackAction}
        title={evaProps => <Text {...evaProps}>{'qsqsswdwdwddwdq'}</Text>}
      />
    </View>
  );
}