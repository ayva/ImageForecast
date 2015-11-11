class PhotosController < ApplicationController
  #Allow to search only for logged in users
  # before_action :require_login

  def index
  end
  
  def featuredCity
    @photos = Instagram.get_images_by_location(48.858844,2.294351)

    respond_to do |format|
      format.json {render json: @photos}
    end
  end

  def futureCity
    time = params[:time]
    place = params[:place]
    puts "Search in #{place} at #{time}"
  
    @photos = Instagram.get_images_by_location_and_date(place, time)

    respond_to do |format|
      format.json {render json: @photos}
    end
  end



end
