import React from "react"
import { ApplicationProvider, IconRegistry, Layout, Text, Icon, Button } from '@ui-kitten/components'

interface PageLayoutProps {
  
}

export const PageLayout: React.FC<PageLayoutProps> = props => {
  return (
    <Layout style={{ flex: 1, alignItems: 'center' }}>
      {props.children}
    </Layout>
  );
}