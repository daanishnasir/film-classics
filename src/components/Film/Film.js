import React, { Component } from 'react';
import { CSSTransitionGroup, TransitionGroup } from 'react-transition-group';
import { getFilmData } from '../api';
import FilmHeader from './FilmHeader/FilmHeader';
import FilmBody from './FilmBody/FilmBody'
import './Film.css';

class Film extends Component {
  constructor() {
    super()

    this.state = {
      backdrop: '',
      overview: '',
      poster: '',
      releaseDate: '',
      runtime: '',
      tagline: '',
      title: '',
      voteAvg: ''
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    // Get film data from api.js
    getFilmData(id).then(response => {
      const data = response.data
      this.setState({
        backdrop: data.backdrop_path,
        overview: data.overview,
        poster: data.poster_path,
        releaseDate: data.release_date,
        runtime: data.runtime,
        tagline: data.tagline,
        title: data.title,
        voteAvg: data.vote_average
      })
    })
  }



  render() {
    return(
      <div className="film-container">
        <CSSTransitionGroup
          transitionName="ShowFilmHeader"
          transitionAppear={ true }
          transitionAppearTimeout={ 500 }
          transitionEnter={ false }
          transitionLeave={ false }
          >
          <FilmHeader
            backdrop={this.state.backdrop}
            tagline={this.state.tagline}
            title={this.state.title} />
        </CSSTransitionGroup>
        <TransitionGroup>
          <FilmBody
            overview={this.state.overview}
            poster={this.state.poster}
            releaseDate={this.state.releaseDate}
            title={this.state.title}
            voteAvg={this.state.voteAvg} />
        </TransitionGroup>
      </div>
    )
  }
}

export default Film;
