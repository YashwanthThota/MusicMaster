import React, {Component} from 'react';
import './App.css';

class Profile extends Component {
  render() {

    let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
    {/*this.props gets the data sent from the app component*/}
    {/*if(this.props.artist !== null) {
      artist = this.props.artist;
      //the ternery expression of above statement*/}
    artist = this.props.artist !== null ? this.props.artist : artist;


    return(
      <div className="profile">
      <img
      alt="Profile"
      className="profile-img"
      src={artist.images[0].url}
      />
      <div className="profile-info">
      <div className="profile-name"> {artist.name} </div>
      <div className="profile-followers">
      {artist.followers.total} followers
      </div>
      <div className="profile-genres">
      {
        artist.genres.map((genre, k) => {
          {/* the below statement siplays the genres as a, b,c & d*/}
          genre = genre !== artist.genres[artist.genres.length-1]
                         ? ` ${genre},`
                         : ` & ${genre}`
          return (
            <span key={k}>{genre}</span>
          )
        })
      }
      </div>
      </div>
      </div>
    )
  }
}

export default Profile;
