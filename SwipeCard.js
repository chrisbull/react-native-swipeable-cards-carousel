/* @flow */
import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated, PanResponder, Dimensions, Image } from 'react-native'

import clamp from 'clamp'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

const SWIPE_THRESHOLD = 120

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
})

//Components could be unloaded and loaded and we will loose the users currentIndex, we can persist it here.
let currentIndex = {}
let guid = 0

type SwipeCardProps = {
  cards: array,
  cardKey: string,
  hasMaybeAction: boolean,
  loop: boolean,
  onLoop: Function,
  allowGestureTermination: boolean,
  onSwipeUp: Function,
  onSwipeDown: Function,
  onSwipeLeft: Function,
  onSwipeRight: Function,
  onClickHandler: Function,
  onCardSwipeStart: Function,
  onCardSwipeFinish: Function,
  renderCard: Function,
  dragX: boolean,
  dragY: boolean,
  resetAfterSwipe: boolean,
  onDragStart: Function,
  onDragRelease: Function,
}

export default class SwipeCard extends Component<SwipeCardProps> {
  static defaultProps = {
    allowGestureTermination: true,
    onClickHandler: () => {},
    onDragStart: () => {},
    onDragRelease: () => {},
    cardRemoved: ix => null,
    dragY: true,
    dragX: true,
    smoothTransition: false,
    onSwipeOpacity: 0.5,
    resetAfterSwipe: true,
    onSwipeUp: () => {},
    onSwipeDown: () => {},
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
    onSwiping: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY(0),
      enter: new Animated.Value(1),
      scale: new Animated.Value(1),
    }

    this.lastX = 0
    this.lastY = 0

    this.cardAnimation = null

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3) {
          this.props.onDragStart()
          return true
        }
        return false
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
      },

      onPanResponderTerminationRequest: (evt, gestureState) => this.props.allowGestureTermination,

      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.props.dragX ? this.state.pan.x : 0,
          dy: this.props.dragY ? this.state.pan.y : 0,
        },
      ]),

      onPanResponderRelease: (e, { vx, vy, dx, dy }) => {
        let velocity

        this.props.onDragRelease()
        this.state.pan.flattenOffset()

        // If card distance isn't much, user probably just tapped
        if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) {
          this.props.onClickHandler(this.state.card)
        }

        if (vx > 0) {
          velocity = clamp(vx, 3, 5)
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1
        } else {
          velocity = dx < 0 ? -3 : 3
        }

        const swipedHorizontalAmount = this.state.pan.x._value
        const swipedVerticalAmount = this.state.pan.y._value

        const swipedHorizontalAmountAbs = Math.abs(swipedHorizontalAmount)
        const swipedVerticalAmountAbs = Math.abs(swipedVerticalAmount)

        const hasSwipedHorizontally = swipedHorizontalAmountAbs > SWIPE_THRESHOLD
        const hasSwipedVertically = swipedVerticalAmountAbs > SWIPE_THRESHOLD

        if (hasSwipedHorizontally || hasSwipedVertically) {
          const hasSwipeLeft = hasSwipedHorizontally && swipedHorizontalAmount < 0
          const hasSwipeRight = hasSwipedHorizontally && swipedHorizontalAmount > 0
          const hasSwipeUp = hasSwipedVertically && swipedVerticalAmount < 0
          const hasSwipeDown = hasSwipedVertically && swipedVerticalAmount > 0

          if (hasSwipeRight) {
            this.props.onSwipeRight(this.state.card)
            this._forceRightSwipe()
          } else if (hasSwipeLeft) {
            this.props.onSwipeLeft(this.state.card)
            this._forceLeftSwipe()
          } else if (hasSwipeUp) {
            this.props.onSwipeUp(this.state.card)
            this._forceUpSwipe()
          } else if (hasSwipeDown) {
            this.props.onSwipeDown(this.state.card)
            this._forceDownSwipe()
          } else {
            this._resetPan()
          }
        } else {
          this._resetPan()
        }
      },
    })
  }

  _forceLeftSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: -500, y: 0 },
    }).start(status => {
      if (status.finished) this._resetAfterSwipe()
      else this._resetState()

      this.cardAnimation = null
    })
  }

  _forceRightSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: 500, y: 0 },
    }).start(status => {
      if (status.finished) this._resetAfterSwipe()
      else this._resetState()

      this.cardAnimation = null
    })
  }

  _forceDownSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: 0, y: 1000 },
    }).start(status => {
      if (status.finished) this._resetAfterSwipe()
      else this._resetState()

      this.cardAnimation = null
    })
  }

  _forceUpSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: 0, y: -1000 },
    }).start(status => {
      if (status.finished) this._resetAfterSwipe()
      else this._resetState()

      this.cardAnimation = null
    })
  }

  _resetPan() {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 4,
    }).start()
  }

  _resetState() {
    this.state.pan.setValue({ x: 0, y: 0 })
  }

  _resetAfterSwipe() {
    if (this.props.resetAfterSwipe) {
      this._resetPan()
      this._resetState()
    }
  }

  renderCard() {
    const { onSwipeOpacity } = this.props

    let { pan } = this.state

    let [translateX, translateY] = [pan.x, pan.y]

    let scale = Math.abs(pan.x) > 0 ? 0.8 : 1

    let rotate = pan.x.interpolate({
      inputRange: [-WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
    })

    let opacity = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [onSwipeOpacity, 1, onSwipeOpacity],
    })

    let animatedCardStyles = {
      transform: [{ translateX }, { translateY }, { rotate }, { scale }],
      opacity,
    }

    return (
      <Animated.View
        key={'top'}
        style={[styles.card, animatedCardStyles]}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    )
  }

  render() {
    return <View style={[styles.container, this.props.style]}>{this.renderCard()}</View>
  }
}
