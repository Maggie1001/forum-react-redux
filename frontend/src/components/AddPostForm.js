import React, { Component } from 'react';
import '../App.css';

const AddPostForm = ({categories, change}) => {

  


    return (
      <div>
        <form onSubmit={change}>
          
            <select>
            {
              categories.map((category, counter) => {
                return <option value={category.name} key={counter}>{category.name}</option>

              })
            }
            </select>

            <span>
              Title
              <input type="text" name="Title"/>
              Username
              <input type="text" name="Username"/>
            </span>

            <br/>
            <br/>

            <input type="text" name="Post" style={
              {width: 400, height:400}
            }/>
            <br/>
            <input type="submit" value="Submit" />

        </form>
      </div>
    );
}



export default AddPostForm