import React, {PropTypes} from 'react';
import { fetchPost, deletePost } from '../actions/index';
import { connect } from 'react-redux';
import {Link} from 'react-router';

class PostsShow extends React.Component{

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }

  static contextTypes = {
    router : PropTypes.object
  };

  onDeleteClick(){
    this.props.deletePost(this.props.params.id)
    .then(() => {
      //blog has been created
      //navigate to Index page
      this.context.router.push('/');
    });
  }

  render(){
    const post = this.props.post;

    if(!post){
      return (
        <div>
          Loading..
        </div>
      );
    }
    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
          className="btn btn-danger pull-xs-right">Delete Post
        </button>
        <h3>
          {post.title}
        </h3>
        <h6>Categories : {post.Categories}</h6>
        <p> Content : {post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    post : state.posts.post
  };
}

export default connect(mapStateToProps, {fetchPost : fetchPost, deletePost : deletePost})(PostsShow);
