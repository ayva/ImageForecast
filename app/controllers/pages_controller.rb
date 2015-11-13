class PagesController < ApplicationController

  #main page 
  def index
  end

  # Instagram authorization
  def authorized
    respond_to do |format|
      if signed_in_user?
        format.json {render json: {username: current_user.username,
                                    picture: current_user.inst_picture}}
      else
        format.json {render json: false}
      end
    end
    
    # client_id = Rails.application.secrets.INSTAGRAM_CLIENT_ID
    # redirect_uri = Rails.application.secrets.REDIRECT_URI

    # get request "https://api.instagram.com/oauth/authorize/?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code"
  end

  def callback

    code = params[:code]
    if code
      puts "Instagram code", code
      body = { client_id: Rails.application.secrets.INSTAGRAM_CLIENT_ID,
        client_secret: Rails.application.secrets.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: "http://futugram.xyz/callback",
        code: code
      }
      response = HTTParty.post("https://api.instagram.com/oauth/access_token", body: body.to_json, headers: {'Content-Type' => 'application/json'})
     
    elsif params[:user] && params[:access_token]
      puts "No code, user is", params[:user], params[:access_token]
      redirect_to user_index_path, user: params[:user], access_token: params[:access_token]
    elsif params[:error]

      puts ["Auth Error:", error, params[:error_reason], [:error_description]].join(" ")
    else
      puts "Got response with no user or token", response
    end
      redirect_to root_path
  end
end
