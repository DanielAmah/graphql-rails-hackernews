# frozen_string_literal: true

module Api
  class GraphqlController < ApplicationController
    def execute
      variables = ensure_hash(params[:variables])
      query = params[:query]
      operation_name = params[:operationName]
      context = {
        # Query context goes here, for example:
        # current_user: current_user,
        session:      session,
        current_user: current_user
      }
      result = GraphqlHackernewsRailsSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
      render json: result
    end

    private

    def current_user
      token = request.headers[:HTTP_X_USER_TOKEN] || request.headers[:HTTP_HTTP_X_USER_TOKEN]
      return nil if token.blank?

      User.find_by(authentication_token: token)

    end

    # Handle form data, JSON body, or a blank value
    def ensure_hash(ambiguous_param)
      case ambiguous_param
      when String
        if ambiguous_param.present?
          ensure_hash(JSON.parse(ambiguous_param))
        else
          {}
        end
      when Hash, ActionController::Parameters
        ambiguous_param
      when nil
        {}
      else
        raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
      end
    end
  end
end
