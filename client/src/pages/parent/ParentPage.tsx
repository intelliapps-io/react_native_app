import React from "react";
import { PageLayout } from "../PageLayout";
import { Text } from "@ui-kitten/components";

interface ParentPageProps {

}

export const ParentPage: React.FC<ParentPageProps> = props => {
  return(
    <PageLayout>
      <Text>Parent Page</Text>
    </PageLayout>
  );
}