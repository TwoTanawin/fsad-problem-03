class Api::V1::PostLikesController < ApplicationController
  before_action :authorize_request
  before_action :set_post

  # POST /api/v1/posts/:post_id/like
  def create
    @like = @post.post_likes.build(user: current_user)
    if @like.save
      render json: @like, status: :created
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/posts/:post_id/unlike
  def destroy
    @like = @post.post_likes.find_by(user: current_user)
    if @like
      @like.destroy
      head :no_content
    else
      render json: { error: "Like not found" }, status: :not_found
    end
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end
