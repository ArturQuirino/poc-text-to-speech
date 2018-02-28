import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import base64url from 'base64url';


var Sound = require('react-native-sound');


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {text: ''};
    this.ConverterTexto = this.ConverterTexto.bind(this);
  }

  ConverterTexto(){
    var audio = ObterAudio(this.state.text);
    return;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Greeting name='Artur' />
        <TextInput 
          style={{width: 300}}
          placeholder="Digite aqui para falar."
          onChangeText={(text) => this.setState({text})} />
        <Text>{this.state.text}</Text>
        <Button
          onPress={this.ConverterTexto}
          title="Falar" 
        />
      </View>
    );
  }
}

async function ObterAudio(texto){
  var audioDoTexto;
  Alert.alert(texto);
    let response = await fetch(
      "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize",
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic NDA3Y2Y2N2UtNWViMi00ZWNlLTg1MDctZjFhYTUxZDg2Nzg1OlhJUFVUQlI4ejFEcQ==',
          'Accept': 'audio/wav',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: texto
        })
      }
    ).catch((error) => {
      console.error(error);
    }).then( (res) => {
      console.log(res);
      var audio = new Sound(res, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        });

      
        audio.play();
      }

    );
}


class Greeting extends Component {
  render() {
    return (
      <Text>Olá {this.props.name}!</Text>
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
