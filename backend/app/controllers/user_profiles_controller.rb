class UserProfilesController < ApplicationController
  before_action :authorize_request # Assuming you have this method to set @current_user
  before_action :set_user_profile, only: %i[update destroy]

  def index
    if @current_user && @current_user.user_profile
      render json: @current_user.user_profile, status: :ok
    else
      render json: { error: "Profile not found" }, status: :not_found
    end
  end


  # GET /user_profiles
  def show
    if @current_user && @current_user.user_profile
      render json: @current_user.user_profile, status: :ok
    else
      render json: { error: "Profile not found" }, status: :not_found
    end
  end


  # POST /user_profiles
  def create
    @user_profile = @current_user.build_profile(user_profile_params)  # Associate the profile with the current user

    if params[:user_profile][:profile_picture].present?
      @user_profile.profile_picture = params[:user_profile][:profile_picture] # Handle base64 image
    end

    if @user_profile.save
      render json: @user_profile, status: :created
    else
      Rails.logger.info(@user_profile.errors.full_messages) # Log the validation errors
      render json: { error: @user_profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_profiles/:id
  def update
    if @user_profile.update(user_profile_params)
      render json: @user_profile
    else
      render json: @user_profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_profiles/:id
  def destroy
    @user_profile.destroy
  end

  private

  def set_user_profile
    @user_profile = current_user.user_profile
    if @user_profile.nil?
      render json: { error: "Profile not found" }, status: :not_found
    end
  end


  def user_profile_params
    params.require(:user_profile).permit(:profile_picture, :bio, :fitness_goals, :weight, :height, :age, :gender, :activity_level)
  end
end
