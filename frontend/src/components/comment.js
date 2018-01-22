import React, { Component } from 'react';
import '../App.css';

const CommentBody = (props) => { 

    return (
            <li>
                <div className="comment-body">
                    <div className="post-voting">
                      <span><button type="button" onClick={(id) => props.upVote(props.comment.id)}>""</button></span>

                      <span>{props.comment.voteScore}</span>

                      <span><button className="post-voting-down" type="button" onClick={(id) => props.downVote(props.comment.id)}>""</button></span>

                    </div>

                    <span>{props.comment.body}</span>

                  </div>
                  <span>{props.comment.author}</span>

                  <div className="comment-buttons">
                    <div>
                      <button type="button"  onClick={(id) => props.deleteComment(props.comment.id)}>Delete Comment</button>
                    </div>

                    <div>
                      <button type="button"  onClick={() => props.modalToggle("openEditComment", props.comment)}>Edit Comment</button>
                    </div>

                  </div>

              </li>
          );

      } 



export default CommentBody