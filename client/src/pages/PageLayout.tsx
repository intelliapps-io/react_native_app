import React from "react"
import { Layout, LayoutProps } from '@ui-kitten/components'
import { StyleSheet } from "react-native"

export const PageLayout: React.FC<LayoutProps & { useFlex?: boolean }> = props => {
  const flexStyle = props.useFlex ? { flex: 1, alignItems: 'center' } : {}
  let style = {...flexStyle}
  if (props.style)
    // @ts-ignore
    style = { ...style, ...props.style}
  
  return (
    //@ts-ignore
    <Layout style={style} {...props}>
      {props.children}
    </Layout>
  );
}