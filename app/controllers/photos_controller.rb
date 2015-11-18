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
    respond_to do |format|
      if current_user
        @photos = Instagram.get_images_by_location_and_date(place, time
          )
        format.json {render json: {status: true, data: @photos}}
      else
        format.json {render json: {status: false, message: "Please login before search the future."}}
      end
    end
  end



end
