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
  end
