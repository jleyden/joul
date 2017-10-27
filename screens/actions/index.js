import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content,
  Button, Text, Title,
  Body, Grid, Row, Col } from 'native-base';
import MapView from 'react-native-maps';
import locationIcon from './smile.png';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	bigText: {
		color: '#000000',
		fontSize: 25
	},
	start: {
	  margin: 'auto',
		backgroundColor: '#009688'
	},
	during: {
		margin: 'auto',
		backgroundColor: '#f44336'
	},
	stop: {
		margin: 'auto',
		backgroundColor: '#3F51B5'
	},
	map: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute'
	}
});

const statusConfigs = {
  before: {
    topText: <Text style={styles.bigText}>Press start after entering the bus</Text>,
	  buttonStyle: styles.start,
	  buttonText: <Text>Start Trip</Text>
  },
  during: {
    topText: <Text style={styles.bigText}>Recording Trip...</Text>,
	  buttonStyle: styles.during,
	  buttonText: <Text>End Trip</Text>
  },
  after: {
	  topText: <Text style={styles.bigText}>Submit your trip for verification</Text>,
    buttonStyle: styles.after,
    buttonText: <Text>Submit trip</Text>
  }
}


export default class Actions extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Actions',
  }

  constructor() {
    super()
    // states are before, during, and after
    this.state = {
      status: 'before', // enum to represent the current status of the action screen
	    position: {
		    latitude: 37.78825,
		    longitude: -122.4324
	    },
	    geoLoaded: false,
	    error: null
    }
  }

  componentWillMount() {
	  this.watchId = navigator.geolocation.watchPosition(
		  (position) => {
			  this.setState({
				  position: {
					  latitude: position.coords.latitude,
					  longitude: position.coords.longitude
				  },
				  geoLoaded: true,
				  error: null,
			  });
		  },
		  (error) => this.setState({ error: error.message }),
		  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
	  );

  }

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId);
	}

  buttonHandler () {
    switch (this.state.status) {
      case 'before':
        this.setState({status: 'during'})
        break
      case 'during':
        this.setState({status: 'after'})
        break
      case 'after':
        this.setState({status: 'before'})
        break
      default:
        this.setState({status: 'before'})
    }
  }

  // hi
  render() {
    const currStatus = this.state.status
    const currProps = statusConfigs[currStatus]
    return (
      <Container>
        <Header>
          <Body>
            <Title>Take Public Transit</Title>
          </Body>
        </Header>
	        <View style ={styles.container}>
		        {this.state.geoLoaded ?
			        <MapView
				        style = {styles.map}
				        initialRegion={{
					        latitude: this.state.position.latitude,
					        longitude: this.state.position.longitude,
					        latitudeDelta: 0.0922,
					        longitudeDelta: 0.0421,
				        }}
			        >
				        <MapView.Marker
					        coordinate={this.state.position}
				          image={locationIcon}
				        />
			        </MapView>
				        : null }
	        </View>
      </Container>
    );
  }
}

