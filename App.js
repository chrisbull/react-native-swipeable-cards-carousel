/* @flow */
import React, { Component } from 'react'
import { Platform, StyleSheet, View, FlatList } from 'react-native'
import { Text } from 'react-native-elements'

import { autobind } from 'core-decorators'

@autobind
export default class App extends Component<{}> {
  renderItem({ text }) {
    return (
      <View>
        <Text h1>{text}</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={[{ key: 'a' }, { key: 'b' }]} renderItem={this.renderItem} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
