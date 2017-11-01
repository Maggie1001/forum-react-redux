import React, { Component } from 'react';
import '../App.css';

class AddCommentForm extends Component {

  uuidv4 = require('uuid/v4');

  state = {

    parentId : "",
    author : "",
    body : "",
    id : this.uuidv4(),
    timestamp :  Date.now()


  }


  componentDidMount(){
    this.setState({
      parentId : this.props.parentID
    })
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
          
            <span>
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



export default AddCommentForm