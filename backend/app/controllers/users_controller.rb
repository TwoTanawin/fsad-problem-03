class UsersController < ApplicationController
    # POST /register
    def register
      user = User.new(user_params)

      if user.save
        token = encode_token({ user_id: user.id })  # Generate JWT token with user ID
        render json: { user: user, token: token }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

  # POST /login
  def login
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      token = encode_token({ user_id: user.id })  # Generate JWT token
      render json: { user: user, token: token }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

    private

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end

    # Method to encode a JWT token
    def encode_token(payload)
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end
end
