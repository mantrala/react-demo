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

  render: function() {
    return (
      <div className="comment_box">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
      </div>
    )
  }
})

var ready = function() {
  React.render(
    <CommentBox url="./comments.json" />,
    document.getElementById('comments')
  );
};

$(document).ready(ready);