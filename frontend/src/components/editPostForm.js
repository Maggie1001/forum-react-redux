import React, { Component } from 'react';
import '../App.css';

class EditPostForm extends Component {



  state = {

    body : "",
    title : "",
    id : ""


  }

  componentDidMount(){
    this.setState({
      body : this.props.body,
      title : this.props.title,
      id : this.props.id
    })
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
          <textarea type="text" name="Title" value={this.state.title} onChange={(e) => this.handleChange(e, "title")} rows="2" cols="50"/>
          <textarea type="text" name="Body" value={this.state.body} onChange={(e) => this.handleChange(e, "body")} rows="20" cols="100"/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}



export default EditPostForm