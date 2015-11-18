class UsersController < ApplicationController

  # has_secure_password
  


  # def create
  #   puts "Creating a user"
  #   @user = User.create(whitelisted_params)
  #   puts "Params", params["user"], params["access_token"]

  #   @user.username = params[:user][:username]
  #   @user.full_name = params[:user][:full_name]
  #   @user.inst_id = params[:user][:id]
  #   @user.inst_token = params[:access_token]
  #   @user.inst_picture = params[:profile_picture]

  #   respond_to do |format|
  #     if @user.save
  #       sign_in(@user)
  #       puts "user created", @user
  #       format.json {render json: "New user created"}
  #     else
  #       puts "failed to create a user", @user
  #       format.json {render json: "Failed to create a new user"}
  #     end
  #   end
  # end

  # private

  # def whitelisted_params
  #   params.require(:user).permit(:user, :access_token, :id, :username, :full_name, :profile_picture)
  # end
end
