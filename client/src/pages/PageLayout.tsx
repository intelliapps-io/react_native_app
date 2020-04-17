import React from "react"
import { Layout, LayoutProps } from '@ui-kitten/components'
import { StyleSheet } from "react-native"

export const PageLayout: React.FC<LayoutProps & { useFlex?: boolean }> = props => {
  const flexStyle = props.useFlex ? { flex: 1, alignItems: 'center' } : {}

  return (
    //@ts-ignore
    <Layout {...props} style={[flexStyle, props.style]}>
      {props.children}
    </Layout>
  );
}