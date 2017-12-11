/* @flow */
import * as React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window')

export const SCREEN_HEIGHT = WINDOW_HEIGHT // or passed variable
export const SCREEN_WIDTH = WINDOW_WIDTH // or passed variable
export const GAP = 20
export const PEEK = 30
// export const SLIDE_PADDING = GAP / 2
export const SLIDE_WIDTH = SCREEN_WIDTH - 2 * PEEK
export const CARD_WIDTH = SLIDE_WIDTH - GAP
export const CARD_HEIGHT = SCREEN_HEIGHT * 0.8

export default class Card extends React.PureComponent {
  render() {
    const imageUri = 'https://source.unsplash.com/random/800x600'

    const { style, bgColor = 'transparent', ...props } = this.props
    return (
      <View style={[styles.card, style, { backgroundColor: bgColor }]}>
        <View style={styles.cardBackground} />
        <View style={styles.cardContent}>{/* <Text>{JSON.stringify(props)}</Text> */}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 10,
    // shadowColor: 'black',
    // shadowRadius: 10,
    // shadowOpacity: 0.3,
  },
  cardBackground: {},
  cardContent: {
    padding: 20,
  },
  text: {
    backgroundColor: 'transparent',
  },
})
