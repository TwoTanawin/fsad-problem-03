class ApplicationController < ActionController::API
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
    rescue JWT::ExpiredSignature
      render json: { error: "Token has expired" }, status: :unauthorized
    rescue JWT::DecodeError => e
      Rails.logger.error("JWT Decode Error: #{e.message}")
      render json: { error: "Invalid token: #{e.message}" }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error("User not found: #{e.message}")
      render json: { error: "User not found" }, status: :unauthorized
    end
  end
end
