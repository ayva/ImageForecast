class PagesController < ApplicationController

  #main page 
  def index
  end

  # Instagram authorization
  def authorized
    
    !!current_user
    # client_id = Rails.application.secrets.INSTAGRAM_CLIENT_ID
    # redirect_uri = Rails.application.secrets.REDIRECT_URI

    # get request "https://api.instagram.com/oauth/authorize/?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code"
  end

  def callback

    if params[:code]
      puts "Instagram code", code
      body = { client_id: Rails.application.secrets.INSTAGRAM_CLIENT_ID,
        client_secret: Rails.application.secrets.INSTAGRAM_CLIENT_SECRET,
        grant_type: authorization_code,
        redirect_uri: "http://futugram.xyz/callback",
        code: code
      }
      response = HTTParty.post("https://api.instagram.com/oauth/access_token", body: body.to_json, headers: {'Content-Type' => 'application/json'})
     
    elsif params[:user] && params[:access_token]
      redirect_to user_index, user: params[:user], access_token: params[:access_token]
    elsif params[:error]
      puts ["Auth Error:", error, params[:error_reason], [:error_description]].join(" ")
    else
      puts "Got response with no user or token", response
      redirect_to root
    end
  end
end
