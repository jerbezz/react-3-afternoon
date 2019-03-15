import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios'
import Post from './Post/Post'

const baseUrl = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };
    
    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${baseUrl}/posts/`).then(res => {
      
      this.setState({
        posts: res.data
      })
    })
    .catch(err => console.log('error'))
  }
  
  updatePost(id, text) {
    axios.put(`${baseUrl}/posts?id=${id}`, {text})
    .then(res => {
      
      this.setState({posts: res.data})
    })
    .catch(err => console.log('error', err))
    
  }
  
  deletePost(id) {
    axios.delete(`${baseUrl}/posts?id=${ id }`)
    .then(res => {
      this.setState({
        posts: res.data
      })

    }).catch(err => console.log('error', err))
  }
  
  createPost(text) {
    axios.post(`${baseUrl}/posts`, {text})
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
    
  }
  
  render() {
    const { posts } = this.state;
    
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {posts.map((item) => <Post
            deletePostFn={this.deletePost} 
            updatePostFn={this.updatePost} 
            id={item.id} 
            text={item.text} 
            date={item.date} 
            key={item.id}/>)}
          
        </section>
      </div>
    );
  }
}

export default App;
