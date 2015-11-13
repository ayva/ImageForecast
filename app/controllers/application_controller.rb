class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def sign_in(user)
    user.regenerate_auth_token
    cookies.permanent[:auth_token] = user.auth_token
    cookies[:inst_token] = user.inst_token
    # session[:user_id] = user.id
    @current_user = user
  end

  def sign_out
    @current_user = nil
    cookies.delete(:auth_token)
    # session.delete(:user_id)
  end

  def current_user
    @current_user ||= User.find_by_auth_token(cookies[:auth_token]) 
    # @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def signed_in_user?
    !!current_user
  end

  def require_login
    unless signed_in_user?
      flash[:error] = "Not authorized, please sign in!"
      redirect_to :action => "index"
    end
  end
end
