import React, { Component } from 'react';
import Http from '../services/httpService';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class RandomGiphy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null
    }
  }

  loadImage = () => {
    const { isItRainingNow, error } = this.props;
    const search = error ? 'error' : (isItRainingNow ? 'not raining' : 'sun');
    const randomOffset = getRandomInt(0, 35);
    Http.getExternal(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC&limit=1&offset=${randomOffset}`)
    .then((res) => {
      this.setState({ imageSrc: res.data[0].images.original.url})
    })
  }

  componentDidMount() {
    this.loadImage();
  }

  render() {
    const { isItRainingNow, error } = this.props;

    return (
      <div style = {{textAlign: 'center', marginTop: '40px'}}>
        <div className="gif-title">
          {
            error ? 'BAM! EROARE' :
            (!isItRainingNow ?
              'Nu ploua !' : 'Ploua da e bine !')
          }
        </div>
        <img
          alt="gif"
          src={this.state.imageSrc}
          style={{maxWidth: '90%', maxHeight:'200px'}}/>
      </div>
    );
  }
}

export default RandomGiphy;