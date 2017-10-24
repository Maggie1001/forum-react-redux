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
      <div>
        <form onSubmit={(e) => this.props.change(e, this.state)}>
          
            <select value={this.state.category} onChange={(e) => this.handleChange(e,"category")}>
            {
              this.props.categories.map((category, counter) => {
                return <option value={category.name} key={counter}>{category.name}</option>

              })
            }
            </select>

            <span>
              Title
              <input type="text" name="Title" value={this.state.title} onChange={(e) => this.handleChange(e, "title")}/>
              Author
              <input type="text" name="Author" value={this.state.author} onChange={(e) => this.handleChange(e, "author")}/>
            </span>

            <br/>
            <br/>
              Post
              <textarea type="text" name="Body" value={this.state.body} onChange={(e) => this.handleChange(e, "body")} rows="20" cols="100"/>

            <br/>
            <input type="submit" value="Submit" />

        </form>
      </div>
    );
  }
}



export default AddPostForm