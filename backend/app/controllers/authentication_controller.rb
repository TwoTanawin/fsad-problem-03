class AuthenticationController < ApplicationController
  # No need to skip CSRF here since it's an API app

  # Method for user signup
  def signup
    @user = User.new(user_params)
    if @user.save
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }, status: :created
    else
      render json: { error: "Failed to create user" }, status: :unprocessable_entity
    end
  end

  # Method for user login
  def login
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  private

  # Method to encode token using JWT
  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.jwt_secret_key)
  end

  # Strong parameters
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
