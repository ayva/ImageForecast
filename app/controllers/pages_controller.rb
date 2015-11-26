class PagesController < ApplicationController

  #Main page 
  def index
  end

  # Instagram authorization
  def authorized
    respond_to do |format|
      if signed_in_user?
        format.json {render json: {username: current_user.username,picture: current_user.inst_picture}}
    
      else
        format.json {render json: false}
      end
    end
  end


  def callback
    code = params[:code]
    body = { "client_id" => Rails.application.secrets.INSTAGRAM_CLIENT_ID,
        "client_secret" => Rails.application.secrets.INSTAGRAM_CLIENT_SECRET,
        "grant_type" => 'authorization_code',
        "redirect_uri" => "http://futugram.xyz:3000/callback",
        "code" => code
      }

    uri = URI.parse("https://api.instagram.com/oauth/access_token");
    response = Net::HTTP.post_form(uri, body)
      puts "Sent body", body
      puts "Got user", response.body, response.code
      if response.code == "400"
        #Prompt user to login again
        puts "Bad response from Instagram", response.body
        
      else
        puts "Creating a user"
        
        res_user = JSON.parse(response.body)["user"]
        res_token = JSON.parse(response.body)["access_token"]

        @user = User.find_by_inst_id(res_user["id"])
        if @user == nil
          @user = User.new
        end
        @user.username = res_user["username"]
        @user.full_name = res_user["full_name"]
        @user.inst_id = res_user["id"]
        @user.inst_token = res_token
        @user.inst_picture = res_user["profile_picture"]
        puts "Saving a user"
        if @user.save
          sign_in(@user)
          puts "user created", @user
        else
          puts "failed"
        end
      end

      redirect_to root_path
      # respond_to do |format|
        
      #     format.json {render json: {username: @user.username,picture: @user.inst_picture}}
      # end
    
      
  end


end
