# frozen_string_literal: true

module Api
  class SessionsController < Devise::SessionsController
    respond_to :json

    acts_as_token_authentication_handler_for User, fallback_to_devise: false

    def destroy; end
  end
end
