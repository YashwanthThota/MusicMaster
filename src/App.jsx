import React, {Component} from 'react';
//import app.css
import './App.css'
//import react-bootstrap
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component {

constructor(props) {
  super(props);
{/*this is used to initialize the elements*/}
  this.state = {
    query: '',
    artist: null,
    tracks: []
  }
}

search() {
  console.log('this.state', this.state);
  const TOKEN = 'ADD YOUR TOKEN HERE';// get it here https://developer.spotify.com/console/get-search-item/
  const BASE_URL = 'https://api.spotify.com/v1/search?';
  {/*this is a m ES6 notation*/}
  let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
  const ALBUM_URL = 'https://api.spotify.com/v1/artists/';


  fetch(FETCH_URL, {
    method: 'GET',
    headers: new Headers({
        Authorization: `Bearer ${TOKEN}`
    })
  })
  .then(response => response.json())
  .then(json => {
    console.log('artist', json);
    const artist = json.artists.items[0];
    this.setState({artist});

    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
    fetch(FETCH_URL, {
      method: 'GET',
      headers: new Headers({
          Authorization: `Bearer ${TOKEN}`
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks', json);
        //we can get 2 or more variables if we use {} for example {a,b}
        const {tracks} = json;
        this.setState({tracks});
      //  this.setState({artist});
    })
  });
}


render() {
return(
  <div className="App">
  <div className="App-title">Music Master</div>
  <FormGroup>
  <InputGroup>
  <FormControl
  type="text"
   placeholder="search an artist...."
   value={this.state.query}
   onChange={event => {this.setState({query: event.target.value})}}
   onKeyPress={event => {
     if(event.key === 'Enter') {
       this.search();
     }
   }}
    />
    {/*OnKeyPress is used to enable the submit on pressing ENTER, since it is
      not enabled in-built for the Glyphicon*/}
  <InputGroup.Addon onClick={() => this.search()}>
  <Glyphicon glyph="search"></Glyphicon>
  </InputGroup.Addon>
  </InputGroup>
    </FormGroup>
  {
    this.state.artist !==null
    ?
    <div>
    {/*import the profile component, sending the asrtist info to child class(profile)*/}
    <Profile
     artist={this.state.artist}
    />
    {/*import the Gallery component,sending the tracks info to child class(gallery)*/}
    <Gallery
     tracks={this.state.tracks}
    />
    </div>
    :<div></div>
  }

  </div>
 )
}
}

export default App;
