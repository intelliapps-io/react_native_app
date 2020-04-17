import React from "react";
import { PageLayout } from "../PageLayout";
import { Text } from "@ui-kitten/components";

interface StudentPageProps {

}

export const StudentPage: React.FC<StudentPageProps> = props => {
  return(
    <PageLayout>
      <Text>Student Page</Text>
    </PageLayout>
  );
}