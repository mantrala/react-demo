// var HelloWorld = React.createClass({
//   render: function() {
//     return (
//       <div className="hello_world">
//         Hello, world!
//       </div>
//     )
//   }
// });

// var ready = function(){
//   React.render(
//     <HelloWorld />,
//     document.getElementById('comments')
//   );
// };

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="comment_author">
          {this.props.author}
        </h2>
        {this.props.comment}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.comments.map(function(comment, index) {
      return (
        <Comment author={comment.author} comment={comment.comment} key={index} />
      );
    });

    return (
      <div className="comment_list">
        {commentNodes}
      </div>
    );
  }
});


var CommentBox = React.createClass({
  getInitialState: function() {
    return {comments: []};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
  },

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this),
    });
  },

  handleCommentSubmit: function(comment) {
    var comments = this.props.comments;
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {'comment': comment},
      success: function(data) {
        this.loadCommentsFromServer();
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="comment_box">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    )
  }
});

var CommentForm = React.createClass({
  handleSubmit: function() {
    var author = this.refs.author.getDOMNode().value.trim();
    var comment = this.refs.comment.getDOMNode().value.trim();
    this.props.onCommentSubmit({author: author, comment: comment});
    this.refs.author.getDOMNode().value = '';
    this.refs.comment.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="comment" />
        <input type="submit" value="Post" />
      </form>
      );
  }
});