class UserProfilesController < ApplicationController
  before_action :set_user_profile, only: %i[show update destroy]

  # GET /user_profiles/:id
  def show
    render json: @user_profile
  end

  # POST /user_profiles
  def create
    @user_profile = UserProfile.new(user_profile_params)

    if @user_profile.save
      render json: @user_profile, status: :created
    else
      render json: @user_profile.errors, status: :unprocessable_entity
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
    @user_profile = UserProfile.find(params[:id])
  end

  def user_profile_params
    params.require(:user_profile).permit(:user_id, :profile_picture, :bio, :fitness_goals, :weight, :height, :age, :gender, :activity_level)
  end
end