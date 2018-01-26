import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './component/search_bar.js';
import VideoList from './component/video_list.js';
import VideoDetail from './component/video_detail.js';
const Api_key = 'AIzaSyDrY2li5Gazb-_wjievNl8ImDrpz_WRXnw';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      videos:[],
      selectedVideo: null
    };
   this.videoSearch('tranding');
  }

  videoSearch(term){
     YTSearch({key: Api_key, term:term, maxResults: 20}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)} ,300);
    return (
      <div>
        <SearchBar onSearchChange = {videoSearch} />
        <VideoDetail video = {this.state.selectedVideo} />
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
