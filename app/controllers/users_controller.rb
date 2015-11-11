class UsersController < ApplicationController

  has_secure_password
  
  def create
    @user = User.new(whitelisted_params)
    respond_to do |format|
      if @user.save
        sign_in(@user)
        format.json {render json: "New user created"}
      else
        format.json {render json: "Failed to create a new user"}
      end
    end
  end

  private

  def whitelisted_params

  end
end
