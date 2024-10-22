class Api::V1::SavedPostsController < ApplicationController
  before_action :authorize_request
  before_action :set_post

  # POST /api/v1/posts/:post_id/save
  def create
    @saved_post = @post.saved_posts.build(user: current_user)
    if @saved_post.save
      render json: @saved_post, status: :created
    else
      render json: @saved_post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/posts/:post_id/unsave
  def destroy
    @saved_post = @post.saved_posts.find_by(user: current_user)
    if @saved_post
      @saved_post.destroy
      head :no_content
    else
      render json: { error: "Saved post not found" }, status: :not_found
    end
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end
