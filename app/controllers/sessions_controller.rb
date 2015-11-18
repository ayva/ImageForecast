class SessionsController < ApplicationController
  skip_before_action :require_login, :only => [:create] 

  def create
    @user = User.find_by_inst_id(params[:inst_id])
    respond_to do |format|
      if @user && @user.authenticate(params[:inst_token])
        sign_in(@user)
        format.json {render json: {status: true, message: "You've successfully signed in"}}
      else
        format.json {render json: {status: false, message: "We couldn't sign you in"}}
      end
    end
  end

  def destroy
    sign_out
    respond_to do |format|
      format.json {render json: {status: true, message: "You've successfully signed out"}}
    end
  end

end
