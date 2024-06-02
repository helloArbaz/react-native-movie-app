import React, { Component, ComponentType } from 'react';
import { View, Text, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

interface InternetStatusState {
  isConnected: boolean | null;
}


interface InternetStatusProps {
  navigation?: any
}


// took this typescript reference from online
const withInternetStatus = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return class HOC extends Component<InternetStatusProps, InternetStatusState> {
    checkInternetStatus: any

    state: InternetStatusState = {
      isConnected: null,
    };



    componentDidMount() {
      this.checkInternetStatus = NetInfo.addEventListener((state: InternetStatusState) => {
        if (state.isConnected !== this.state.isConnected) {
          this.setState({ isConnected: state.isConnected });
        }
      });
    }

    componentWillUnmount() {
      this.checkInternetStatus();
    }

    render() {
      const { isConnected } = this.state;

      if (isConnected === null) {
        return (
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={"#F0283C"} size="large" />
          </View>
        );
      }

      if (isConnected === false) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="signal-wifi-connected-no-internet-4" size={100} color="red" style={{ padding: 1, marginRight: 15 }} />
            <Text style={{ color: "black", fontSize: 30, fontWeight: "700" }}>Whoops!!</Text>
            <View style={{ paddingLeft: 50, paddingRight: 50, marginTop: 30, justifyContent: "center", }}><Text style={{ color: "black", fontSize: 15, textAlign: "center" }}>No internet connection was found. Check you connection ot try again.</Text></View>
            <TouchableOpacity><Text style={{ fontSize: 20, color: "blue", marginTop: 30 }} onPress={() => this.setState({ isConnected: null })}>Try Again ?.</Text></TouchableOpacity>
          </View>
        );
      }

      return <WrappedComponent {...(this.props as P)} />;
    }
  };
};

export default withInternetStatus;
