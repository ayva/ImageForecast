class PhotosController < ApplicationController


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
    #Instagram API in sec
    # fromdate = Time.now.to_i- 60*60*24*365 
    # todate = Time.now.to_i

    @photos = Instagram.get_images_by_location_and_date(place, time)

    respond_to do |format|
      format.json {render json: @photos}
    end
  end



end
