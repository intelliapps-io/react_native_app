import React from "react";
import { PageLayout } from "../PageLayout";
import { Text } from "@ui-kitten/components";

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = props => {
  return(
    <PageLayout>
      <Text>Home Page</Text>
    </PageLayout>
  );
}