class Weather
  BASE_WEATHER_URI = "https://api.forecast.io/forecast/"
  WEATHER_KEY = Rails.application.secrets.FORECAST_KEY

  def self.get_weather(lat, lng, time)

    day = (time['min']+time['max'])/2000
    url = [BASE_WEATHER_URI, WEATHER_KEY, "/", lat, ",", lng, ",",day,'?exclude=hourly'].join("")
    puts "Sent ", url
    result = HTTParty.get(url).parsed_response
    puts "Forecast response", result
    return result

  end
end