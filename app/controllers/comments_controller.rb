class CommentsController < ApplicationController
  def index
    respond_with Comment.all
  end

  def create
    respond_with Comment.create(comment_params)
  end

  private

  def comment_paras
    params.require(:comment).permit(:comment, :author)
  end
end
