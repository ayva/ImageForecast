 module Instagram

   class API

    def initialize
      @base_url = "https://api.instagram.com/v1"
      endpoint = '/media/657988443280050001_25025320'
      @client_id = Rails.application.secrets.INSTAGRAM_CLIENT_ID
      params = {
        'access_token' => Rails.application.secrets.INSTAGRAM_CLIENT_ID,
        'count' => 10,
      }
      # Rails.application.secrets.INSTAGRAM_CLIENT_ID
      secret =  Rails.application.secrets.INSTAGRAM_CLIENT_SECRET
      sig = generate_sig(endpoint, params, secret)
    end

    def generate_sig(endpoint, params, secret)
      sig = endpoint
      params.sort.map do |key, val|
        sig += '|%s=%s' % [key, val]
      end
      digest = OpenSSL::Digest::Digest.new('sha256')
      return OpenSSL::HMAC.hexdigest(digest, secret, sig)
    end


    def self.get_images_by_location(lat, lng)
      # @base_url = "https://api.instagram.com/v1"
      # @client_id = Rails.application.secrets.INSTAGRAM_CLIENT_ID
      api_url = "/media/search?lat=#{lat}&lng=#{lng}"
      @url = "#{@base_url}#{api_url}$client_id=#{@client_id}"
      # headers = { "Accept" => "application/json",
      #             }
      result = HTTParty.get(@url).parsed_response
    end
  end
 end