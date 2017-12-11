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
  }

  _setScrollEnabled = (scrollEnabled = true) => this.setState({ scrollEnabled })

  _renderSwipeCard = props => (
    <View style={{ height: CARD_HEIGHT, width: CARD_WIDTH, backgroundColor: 'black' }}>
      <SwipeCard
        onDragStart={() => this._setScrollEnabled(false)}
        onDragRelease={() => this._setScrollEnabled(true)}
      >
        <Card {...props} />
      </SwipeCard>
    </View>
  )

  /*
  _renderSwipeCard2 = props => (
    <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
      <SwipeCard2
        cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
        renderCard={card => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card}</Text>
            </View>
          )
        }}
        onSwiped={cardIndex => {
          console.log(cardIndex)
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll')
        }}
        cardIndex={0}
        backgroundColor={'#acdacd'}
      >
        <Button
          onPress={() => {
            console.log('oulala')
          }}
          title="Press me"
        >
          You can press me
        </Button>
      </SwipeCard2>
    </View>
  )
  */

  _renderCarousel = () => (
    <View
      style={[
        styles.container,
        { backgroundColor: this.state.scrollEnabled ? '#f27a4e' : '#be232d' },
      ]}
    >
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
        onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
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
    backgroundColor: '#999999',
    paddingVertical: 44,
  },
  swiper: {
    backgroundColor: '#efefef',
  },
  swiperContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
