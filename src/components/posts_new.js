import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends React.Component{
  constructor(props){
    super(props);
  }

  static contextTypes = {
    router : PropTypes.object
  };

  onSubmit(props){
    this.props.createPost(props)
    .then(() => {
      //blog has been created
      //navigate to Index page
      this.context.router.push('/');
    });

  }


  render(){

    const handleSubmit = this.props.handleSubmit;
    const title = this.props.fields.title;
    const categories = this.props.fields.categories;
    const content = this.props.fields.content;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <h3> Create new Post </h3>
        <div className = {`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
          <label> Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">{title.touched ? title.error : ''}</div>
        </div>

        <div className = {`form-group ${categories.touched && categories.invalid ? 'has-danger' : '' }`}>
          <label> Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">{categories.touched ? categories.error : ''}</div>
        </div>

        <div className = {`form-group ${content.touched && content.invalid ? 'has-danger' : '' }`}>
          <label> Content</label>
          <textarea className="form-control" {...content}/>
          <div className="text-help">{content.touched ? content.error : ''}</div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to= "/" className="btn btn-danger" > Cancel </Link>
      </form>
    );
  }

}

function validate(values){
  const errors = {};
  if(!values.title){
    errors.title= 'Enter a username';
  }
  if(!values.categories){
    errors.categories= 'Enter a categories';
  }
  if(!values.content){
    errors.content= 'Enter a content';
  }
  return errors;
}


export default reduxForm({
  form : 'postNewForm',
  fields : ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostsNew);
