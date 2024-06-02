// withInternetStatus.tsx
import React, { Component, ComponentType } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

interface State {
  isConnected: boolean | null;
}

const withInternetStatus = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return class HOC extends Component<P, State> {
    state: State = {
      isConnected: null,
    };

    unsubscribe: (() => void) | null = null;

    componentDidMount() {
      this.unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected !== this.state.isConnected) {
          this.setState({ isConnected: state.isConnected });
        }
      });
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    render() {
      const { isConnected } = this.state;

      if (isConnected === null) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

      if (isConnected === false) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Internet Connection</Text>
            <Button title="Retry" onPress={() => this.setState({ isConnected: null })} />
          </View>
        );
      }

      return <WrappedComponent {...(this.props as P)} />;
    }
  };
};

export default withInternetStatus;
