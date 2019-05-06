import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "#841584",
      location: {},
      errorMessage: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  buttonAction = () => {
    const { color } = this.state;
    this.setState({ color: color === '#32CD32' ? "#841584" : '#32CD32' })
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
    this.setState(
      { location,
        region: {
          ...this.state.region,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        }
      });
  };

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <Text>Welcome To Trash Town Mother Fuckers</Text>
        <View>
          <Text>Here's Some Other Text</Text>
          <Button
            onPress={this.buttonAction}
            title="Learn More"
            color={this.state.color}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Text> Map Should Be here </Text>
        <MapView
          style={{ width: '100%', height: '80%' }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
