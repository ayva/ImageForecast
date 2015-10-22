class PhotosController < ApplicationController


  def featuredCity
    @photos = Instagram.get_images_by_location(48.858844,2.294351)

    respond_to do |format|
      format.json {render json: @photos}
    end
  end
end
