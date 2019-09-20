import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, Card, CardSection, Header} from './components/common';

class App extends Component {
  state = {switchOn: false, errors: ''};

  Ip() { return '207' }

  renderSwitch() {
    switch (this.state.switchOn) {
      case false:
        return <Button onPress={() => this.turnSwitchOn()}>On</Button>;
      case true:
        return <Button onPress={() => this.turnSwitchOff()}>Off</Button>;
    }
  }

  strobeSwitch() {
    fetch(`http://172.17.1.${this.Ip()}:3000/strobe`)
      .then(jsonData => {
        this.setState({switchOn: false});
      })
  }

  turnSwitchOn() {
    fetch(`http://172.17.1.${this.Ip()}:3000/on`)
      .then(jsonData => {
        this.setState({switchOn: true});
    });
  }

  turnSwitchOff() {
    fetch(`http://172.17.1.${this.Ip()}:3000/off`).then(jsonData => {
      this.setState({switchOn: false});
    });
  }

  render() {
    return (
      <View>
        <Header headerText="Power Switch" />
        <Card>
          <CardSection>
            <Text style={{ fontSize: 40, color: 'red' }}>Turn Shit On and Off</Text>
          </CardSection>
          <CardSection>{this.renderSwitch()}</CardSection>
          <CardSection>
            <Button onPress={() => this.strobeSwitch()}>Strobe</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default App;
