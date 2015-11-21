class PhotosController < ApplicationController

  def index
  end
  
  def featuredCity
    time = JSON.parse(params[:time])
    place = JSON.parse(params[:place])
    lat = place['location']['lat']
    lng = place['location']['lng']
    client_id = Rails.application.secrets.INSTAGRAM_CLIENT_ID
    @photos = Instagram.get_images_by_location_and_date(lat, lng, time,  client_id)
    @weather = Weather.get_weather(lat, lng, time)
    respond_to do |format|
      format.json {render json: { 
        status: true, 
        data: @photos, 
        weather: {temperature: @weather['currently']['temperature'],
                  summary: @weather['currently']['summary'],
                  icon: @weather['currently']['icon']}}}
    end
  end

  def futureCity
    time = JSON.parse(params[:time])
    place = JSON.parse(params[:place])
    lat = place['location']['lat']
    lng = place['location']['lng']
    puts "Search in #{place} at #{time}"
    respond_to do |format|
      if current_user
        @photos = Instagram.get_images_by_location_and_date(lat, lng, time, current_user.inst_token)
        @weather = Weather.get_weather(lat, lng, time)
        format.json {render json: { 
          status: true, 
          data: @photos, 
          weather: {temperature: @weather['currently']['temperature'],
                    summary: @weather['currently']['summary']}}}
      else
        format.json {render json: {status: false, message: "Please login before search the future."}}
      end
    end
  end



end
