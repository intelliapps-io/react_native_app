import React from "react"
import { Layout, LayoutProps } from '@ui-kitten/components'

export const PageLayout: React.FC<LayoutProps & {useFlex?: boolean}> = props => {
  return (
    <Layout style={props.useFlex ? { flex: 1, alignItems: 'center' } : {}} {...props}>
      {props.children}
    </Layout>
  );
}