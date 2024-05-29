import React, { Component, ReactNode } from 'react';
import { View, ScrollView, Dimensions, LayoutChangeEvent, ScrollViewProps, ViewStyle } from 'react-native';

interface InViewPortProps extends ScrollViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

interface InViewPortState {
  isVisible: boolean;
}

class InViewPort extends Component<InViewPortProps, InViewPortState> {
  private viewRef = React.createRef<View>();

  constructor(props: InViewPortProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount() {
    this.checkIfVisible();
  }

  componentDidUpdate() {
    this.checkIfVisible();
  }

  checkIfVisible = () => {
    if (this.viewRef.current) {
      this.viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        const windowHeight = Dimensions.get('window').height;
        const isVisible = pageY >= 0 && pageY + height <= windowHeight;
        if (this.state.isVisible !== isVisible) {
          this.setState({ isVisible });
        }
      });
    }
  };

  handleScroll = () => {
    this.checkIfVisible();
  };

  handleLayout = (event: LayoutChangeEvent) => {
    this.checkIfVisible();
  };

  render() {
    const { children, style, ...restProps } = this.props;
    const { isVisible } = this.state;

    return (
      <ScrollView
        {...restProps}
        onScroll={this.handleScroll}
        scrollEventThrottle={16}
      >
        <View
          ref={this.viewRef}
          onLayout={this.handleLayout}
          style={style}
        >
          {isVisible && children}
        </View>
      </ScrollView>
    );
  }
}

export default InViewPort