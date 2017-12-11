/* @flow */
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  MaskedViewIOS,
  Text,
  Button,
} from 'react-native'

import Swiper from 'react-native-swiper'
import SwipeCard from './SwipeCard'
import SwipeCard2 from './SwipeCard2'
import Carousel from './Carousel'

import Card, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  GAP,
  PEEK,
  SLIDE_WIDTH,
  CARD_WIDTH,
  CARD_HEIGHT,
} from './Card'

export default class App extends Component<{}> {
  state = {
    scrollEnabled: true,
    sliderActiveSlideIndex: 0,
  }

  _setScrollEnabled = (scrollEnabled = true) => this.setState({ scrollEnabled })

  _renderSwipeCard = ({ item, index }) => (
    <View style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}>
      <SwipeCard
        onSwipeStart={() => {
          this.setState({ scrollEnabled: false })
        }}
        onSwipeEnd={() => {
          this.setState({ scrollEnabled: true })
        }}
        enableSwipe={this.state.sliderActiveSlideIndex === index}
      >
        <Card {...item} />
      </SwipeCard>
    </View>
  )

  _renderCarousel = () => (
    <View style={[styles.container]}>
      <Carousel
        ref={c => (this._carousel = c)}
        data={[
          { bgColor: 'red' },
          { bgColor: 'blue' },
          { bgColor: 'green' },
          { bgColor: 'purple' },
          { bgColor: 'orange' },
          { bgColor: 'skyblue' },
          { bgColor: 'maroon' },
        ]}
        renderItem={this._renderSwipeCard}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={CARD_WIDTH}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.7}
        enableMomentum
        containerCustomStyle={styles.swiper}
        contentContainerCustomStyle={styles.swiperContent}
        onSnapToItem={index => this.setState({ sliderActiveSlideIndex: index })}
        scrollEnabled={this.state.scrollEnabled}
      />
    </View>
  )

  render() {
    return this._renderCarousel()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {},
  swiperContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
