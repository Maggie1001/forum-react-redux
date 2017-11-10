import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions/index.js'
import { withRouter, Route, Link } from 'react-router-dom'
import {AppBar, Tabs, Tab, DropDownMenu, MenuItem } from 'material-ui'


class NavBar extends Component {


 state = {
 	value : ""
 }

  componentWillMount(){
    this.props.getCategories()

  }


  componentWillReceiveProps(){
  	if(this.props.categories){
	  	this.setState({
	    	value : this.props.categories[0].name
	    })
	 }
  }



  categoryGo = (event, index, value) => {
  	this.setState({
  		value 
  	})
  	this.props.history.push(`/${value}`)
  	

  }

	render(){
	  return(
	      <div>
	        <AppBar title="Redux-Forum" className="navBar" iconClassNameLeft= "NavIcon">

		        <Tabs>
					<Tab label="home"
			 containerElement={<Link to="/"/>}/> 
		        </Tabs>
		       	<DropDownMenu value={this.state.value} onChange={this.categoryGo} label="Categories">
				 	{this.props.categories ? (
				 
					    this.props.categories.map((category, counter) => {
					    	return <MenuItem key={counter} value={category.name} primaryText={category.name}/>
					    	})
					    ) : (
					      null
					    )
					}
				</DropDownMenu>
	        </AppBar>
	      </div>
	    )
	}
  }

function mapStateToProps(state,props){
  return {
    categories : state.category.categories
  }
}

function mapDispatchToProps(dispatch){

  return{

    getCategories : getAllCategories(dispatch),


  }
}





export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(NavBar))
