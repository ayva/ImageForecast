require 'openssl'
require 'base64'


  class Instagram
    BASE_URI = "https://api.instagram.com/v1"
    CLIENT_ID = Rails.application.secrets.INSTAGRAM_CLIENT_ID

    def self.get_images_by_location_and_date(lat, lng, time, token)

      api_url = "/media/search?lat=#{lat}&lng=#{lng}&min_timestamp=#{(time['min'] - 60*60*24*364*1000)/1000}&max_timestamp=#{(time['max']- 60*60*24*364*1000)/1000}&count=1000&distance=1700"
      if token != CLIENT_ID
        url = [BASE_URI, api_url, "&access_token=", token].join("")
      else
        url = [BASE_URI, api_url, "&client_id=", CLIENT_ID].join("")
      end
      puts "Getting Instagram API #{url}"
      result = HTTParty.get(url).parsed_response
      return result
    end
  end
