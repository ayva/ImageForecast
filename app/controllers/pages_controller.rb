class PagesController < ApplicationController
require "Instagram_api.rb"
include Instagram
  #main page 
  def index
    @photos = Instagram::API.new
    # @photos.get_images_by_location(48.858844,2.294351)

  end

  #user search page
  def show

  end
end
