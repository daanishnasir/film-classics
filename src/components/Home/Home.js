import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { getTopRated } from '../api';
import gsap from '../../gsap/animations';
import TopRatedItem from './TopRatedItem/TopRatedItem';
import './Home.css';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      topRatedList: [],
      show: false
    }
    this.allRefs = []
    this.handleClick = this.handleClick.bind(this)
    this.storeRef = this.storeRef.bind(this)
  }

  componentDidMount() {
    // Get top rated films from api.js
    getTopRated().then(response => {
      this.setState({topRatedList: response.data.results});
    })
  }

  storeRef(ref) {
    this.allRefs.push(ref)
  }

  handleClick(id) {
    const time = .25
    gsap.hideTopRated(this.allRefs, null, time);
    setTimeout(() => {
      this.props.history.push(`/film/${id}`)
      // time*1000
    }, 450);
  }

  render() {
    return (
      <div className="home-container">
        {this.state.topRatedList.map((x,i) => {
          return (
            <TransitionGroup key={x.id}>
               {
                this.state.topRatedList[0] &&
                <TopRatedItem
                  id={x.id}
                  backdrop={x.backdrop_path}
                  poster={x.poster_path}
                  title={x.title}
                  vote={x.vote_average}
                  index={i}
                  handleClick={()=>this.handleClick(x.id)}
                  storeRef={this.storeRef} />
               }
            </TransitionGroup>
          )
        })}
      </div>
    )
  }
}

export default Home;
