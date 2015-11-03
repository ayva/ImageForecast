require 'openssl'
require 'base64'


  class Instagram
    BASE_URI = "https://api.instagram.com/v1"
    CLIENT_ID = Rails.application.secrets.INSTAGRAM_CLIENT_ID
    # def initialize
     
    #   endpoint = '/media/657988443280050001_25025320'
      
    #   params = {
    #     'access_token' => Rails.application.secrets.INSTAGRAM_CLIENT_ID,
    #     'count' => 10,
    #   }
    #   # Rails.application.secrets.INSTAGRAM_CLIENT_ID
    #   secret =  Rails.application.secrets.INSTAGRAM_CLIENT_SECRET
    #   sig = generate_sig(endpoint, params, secret)
    # end

    # def generate_sig(endpoint, params, secret)
    #   sig = endpoint
    #   params.sort.map do |key, val|
    #     sig += '|%s=%s' % [key, val]
    #   end
    #   digest = OpenSSL::Digest::Digest.new('sha256')
    #   return OpenSSL::HMAC.hexdigest(digest, secret, sig)
    # end


    def self.get_images_by_location(lat, lng)
   
      api_url = "/media/search?lat=#{lat}&lng=#{lng}"
      url = [BASE_URI, api_url, "&client_id=", CLIENT_ID].join("")
      # headers = { "Accept" => "application/json",
      #             } 
      result = HTTParty.get(url).parsed_response
      return result
    end

    def self.get_images_by_location_and_date(place, time)
      place = JSON.parse(place)
      time = JSON.parse(time)
      puts "Got query place #{place.class}, time #{time}"
      api_url = "/media/search?lat=#{place['location']['lat']}&lng=#{place['location']['lng']}&min_timestamp=#{time['min']/1000}&max_timestamp=#{time['max']/1000}&count=1000&distance=5000"
      url = [BASE_URI, api_url, "&client_id=", CLIENT_ID].join("")
      puts "Getting Instagram API #{url}"
      result = HTTParty.get(url).parsed_response
      return result
    end
  end
