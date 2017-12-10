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
} from 'react-native'

import Swiper from 'react-native-swiper'
import Carousel from 'react-native-snap-carousel'
import SwipeCard from './SwipeCard'

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window')

const SCREEN_HEIGHT = WINDOW_HEIGHT // or passed variable
const SCREEN_WIDTH = WINDOW_WIDTH // or passed variable
const GAP = 20
const PEEK = 30
// const SLIDE_PADDING = GAP / 2
const SLIDE_WIDTH = SCREEN_WIDTH - 2 * PEEK
const CARD_WIDTH = SLIDE_WIDTH - GAP
const CARD_HEIGHT = SCREEN_HEIGHT * 0.8

class CardItem extends React.PureComponent {
  render() {
    const imageUri = 'https://source.unsplash.com/random/800x600'

    return (
      <View style={styles.card}>
        <View style={styles.cardBackground} />
        <View style={styles.cardContent} />
      </View>
    )
  }
}

export default class App extends Component<{}> {
  _renderCard = props => <CardItem {...props} />
  _renderSwipeCard = props => <SwipeCard stack={false} cards={[{}]} renderCard={this._renderCard} />

  // _renderSwiper = () => (
  //   <Swiper containerStyle={styles.swiperContainer} style={styles.swiper} loop={false} index={0}>
  //     <View style={styles.slide}>
  //       <CardItem />
  //     </View>
  //     <View style={styles.slide}>
  //       <CardItem />
  //     </View>
  //     <View style={styles.slide}>
  //       <CardItem />
  //     </View>
  //     <View style={styles.slide}>
  //       <CardItem />
  //     </View>
  //     <View style={styles.slide}>
  //       <CardItem />
  //     </View>
  //   </Swiper>
  // )

  _renderCarousel = () => (
    <View style={styles.container}>
      <Carousel
        ref={c => (this._carousel = c)}
        data={[{}, {}, {}, {}]}
        renderItem={this._renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={CARD_WIDTH}
        // hasParallaxImages={true}
        // firstItem={1}
        // inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.7}
        enableMomentum //={false}
        containerCustomStyle={styles.swiper}
        contentContainerCustomStyle={styles.swiperContent}
        loop={false}
        // autoplay={true}
        // autoplayDelay={500}
        // autoplayInterval={3000}
        onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
      />
    </View>
  )

  render() {
    return this._renderSwipeCard()
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
  slide: {},
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  cardBackground: {},
  cardContent: {
    padding: 20,
  },
  text: {
    backgroundColor: 'transparent',
  },
})
