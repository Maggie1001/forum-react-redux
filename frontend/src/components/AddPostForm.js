import React, { Component } from 'react';
import '../App.css';

class AddPostForm extends Component {

  uuidv4 = require('uuid/v4');

  state = {

    category : this.props.categories[0].name,
    title : "",
    author : "",
    body : "",
    id : this.uuidv4(),
    timestamp :  Date.now()


  }

  handleChange = (e, type) => {

    this.setState({
      [type] : e.target.value
    })

  }

  
  

  render(){
    return (
      <div className="add-post-form">
        <form onSubmit={(e) => this.props.change(e, this.state)}>
            <div className="add-post-form-header">
              <div className="add-post-form-select">
                <select value={this.state.category} onChange={(e) => this.handleChange(e,"category")}>
                {
                    this.props.categories.map((category, counter) => {
                      return <option value={category.name} key={counter}>{category.name}</option>

                    })
                  }
                </select>
              </div>
              <div>
                Title
                <input type="text" name="Title" value={this.state.title} onChange={(e) => this.handleChange(e, "title")}/>
              </div>
              <div>
                Author
                <input type="text" name="Author" value={this.state.author} onChange={(e) => this.handleChange(e, "author")}/>
              </div>
            </div>
            <div className="add-post-form-post-header">
              Post
            </div>
            
            <div>
              <textarea className="add-post-form-text-area" type="text" name="Body" value={this.state.body} onChange={(e) => this.handleChange(e, "body")} rows="10" cols="20"/>
            </div>

            <input className="add-post-form-input" type="submit" value="Submit" />

        </form>
      </div>
    );
  }
}



export default AddPostForm