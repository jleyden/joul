import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


export default class App extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <Container>
        {/* <Header /> */}
          <Content>
            <Grid>
              <Row>
                <Text style={styles.username}>Username</Text>
              </Row>
              <Row>
                <Text style={styles.money}>$0.00</Text>
              </Row>
              <Row>
                <Text style={styles.rating}>Rating</Text>
              </Row>
              <Row>
                <List style={styles.list}>
                  <ListItem icon>
                    <Body>
                      <Text>User 1</Text>
                    </Body>
                    <Right>
                      <Text>+$1.00</Text>
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Body>
                      <Text>User 2</Text>
                    </Body>
                    <Right>
                      <Text>-$1.00</Text>
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Body>
                      <Text>AC Transit</Text>
                    </Body>
                    <Right>
                      <Text>+$300.00</Text>
                    </Right>
                  </ListItem>
                </List>
              </Row>
            </Grid>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    // alignItems: 'flex-start',
  },
  username: {
    color: '#FAFAFA',
    left: 20,
    top: 30,
    fontSize: 45
  },
  rating: {
    color: '#BDBDBD',
    left: 20,
    top: 25,
    fontSize: 30
  },
  money: {
    color: '#FAFAFA',
    left: 20,
    top: 30,
    fontSize: 30
  },
  item: {
    color: '#FAFAFA',
    padding: 10,
    fontSize: 18,
    top: 40,
    left: 20,
    height: 44,
  },
  list: {
    top: 40
  }

});
