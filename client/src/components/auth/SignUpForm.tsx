import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { PageLayout } from "../../pages/PageLayout";

interface SignUpFormProps {

}

export const SignUpForm: React.FC<SignUpFormProps> = props => {
  return(
    <PageLayout level='1' useFlex={true}>
      <Text>Sign Up Form</Text>
    </PageLayout>
  );
}