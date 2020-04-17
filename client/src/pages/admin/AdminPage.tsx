import React from "react";
import { PageLayout } from "../PageLayout";
import { Text } from "@ui-kitten/components";

interface AdminPageProps {

}

export const AdminPage: React.FC<AdminPageProps> = props => {
  return(
    <PageLayout>
      <Text>Admin Page</Text>
    </PageLayout>
  );
}