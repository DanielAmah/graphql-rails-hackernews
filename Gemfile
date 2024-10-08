# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) {|repo| "https://github.com/#{repo}.git" }

ruby "2.7.5"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.2.1", ">= 5.2.1.1"
# Use postgresql as the database for Active Record
gem "pg", ">= 0.18", "< 2.0"
# Use Puma as the app server
gem "puma", "~> 3.11"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem "coffee-rails", "~> 4.2"
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.5"
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Authentication
gem "devise"
gem "devise-jwt"
gem "pundit"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "action-cable-testing"
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "coveralls", require: false
  gem "cucumber-rails", require: false
  gem "database_cleaner"
  gem "factory_bot_rails"
  gem "faker", "~> 1.8", ">= 1.8.7"
  gem "graphlient"
  gem "pry"
  gem "pry-byebug"
  gem "rspec-graphql_matchers"
  gem "rspec-rails"
  gem "shoulda-matchers"

  gem 'action-cable-testing'

  gem 'faraday-rack'

  gem 'rswag-ui'
  gem 'rswag-api'
  gem 'rswag-specs'

end
gem "bcrypt", "~> 3.1.7"
gem "graphql", "1.10.10"
gem "minitest-rails"
gem "search_object", "1.2.0"
gem "search_object_graphql", "0.1"
group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "web-console", ">= 3.3.0"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "foreman", "~> 0.82.0"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

gem "dotenv-rails", groups: %i[development test]
gem "graphiql-rails", "1.4.4", group: :development
gem "graphql-preload", "~> 1.0.4"
gem "jwt", "~> 2.1.0"
gem "rack-cors", require: "rack/cors"
gem "simple_token_authentication", "~> 1.0"

gem 'swagger-blocks'
gem 'swagger_ui_engine'

gem 'loofah', '2.21.3'