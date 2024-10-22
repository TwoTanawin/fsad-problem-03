class Api::V1::PostsController < ApplicationController
  before_action :authorize_request
  before_action :set_post, only: [ :show, :update, :destroy ]

  # GET /api/v1/posts
  def index
    @posts = Post.includes(:user, :comments, :post_likes).all
    render json: @posts.to_json(include: { user: { only: [ :username ] }, comments: { include: :user }, post_likes: {} })
  end

  # GET /api/v1/posts/:id
  def show
    render json: @post.to_json(include: { user: { only: [ :username ] }, comments: { include: :user }, post_likes: {} })
  end

  # POST /api/v1/posts
  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/posts/:id
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.permit(:caption, :image_base64, :pinned, :category)
  end
end
