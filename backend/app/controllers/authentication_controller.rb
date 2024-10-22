class AuthenticationController < ApplicationController
  # No need to skip CSRF here since it's an API app
  before_action :authorize_request, except: [ :signup, :login ]

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

  # Method to fetch user info based on token, no need for user_id param, use token
  def user_info
    if @current_user
      render json: { username: @current_user.username, email: @current_user.email }, status: :ok
    else
      render json: { error: "User not authorized" }, status: :unauthorized
    end
  end


  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.jwt_secret_key)
  end


  # Strong parameters
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def authorize_request
    token = request.headers["Authorization"]&.split(" ")&.last
    Rails.logger.info("Raw Authorization header: #{request.headers['Authorization']}")
    Rails.logger.info("Extracted token: #{token}")

    if token.nil?
      render json: { error: "Token missing" }, status: :bad_request and return
    end

    begin
      decoded_token = JWT.decode(token, Rails.application.credentials[:jwt_secret_key], true, { algorithm: "HS256" })[0]
      Rails.logger.info("Successfully decoded token: #{decoded_token}")
      @current_user = User.find(decoded_token["user_id"])
    rescue JWT::DecodeError => e
      Rails.logger.error("JWT Decode Error: #{e.message}")
      render json: { error: "Invalid token: #{e.message}" }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error("User not found: #{e.message}")
      render json: { error: "User not found" }, status: :unauthorized
    end
  end
end
