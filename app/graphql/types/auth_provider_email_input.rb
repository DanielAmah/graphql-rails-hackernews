# frozen_string_literal: true

Types::AuthProviderEmailInput = GraphQL::InputObjectType.define do
  name "AUTH_PROVIDER_EMAIL"

  argument :email, !types.String
  argument :password, !types.String
  # argument :password_confirmation, !types.String
end
