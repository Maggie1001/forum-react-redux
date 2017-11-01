import React, { Component } from 'react';
import '../App.css';

class EditCommentForm extends Component {



  state = {

    body : "",
    id : "",
    timestamp :  Date.now(),
    voteCount : 0 


  }

  componentDidMount(){
    this.setState({
      body : this.props.body,
      id : this.props.id,
      voteCount : this.props.voteCount
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
          <textarea type="text" name="Body" value={this.state.body} onChange={(e) => this.handleChange(e, "body")} rows="20" cols="100"/>
          <input className="add-post-form-input"  type="submit" value="Submit" />
        </form>      
      </div>
    );
  }
}



export default EditCommentForm