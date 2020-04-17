import React from "react";
import { View } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { PageLayout } from "../../pages/PageLayout";

interface LoginFormProps {

}

export const LoginForm: React.FC<LoginFormProps> = props => {
  return(
    <PageLayout level='1' useFlex={true}>
      <Text>Login Form</Text>
    </PageLayout>
  );
}