# frozen_string_literal: true

class Resolvers::CreateUser < GraphQL::Function
  AuthProviderInput = GraphQL::InputObjectType.define do
    name "AuthProviderSignupData"

    argument :email, Types::AuthProviderEmailInput
  end

  argument :authProvider, !AuthProviderInput

  type Types::UserType

  def call(_obj, args, _ctx)
    User.create!(
      email:    args[:authProvider][:email][:email],
      password: args[:authProvider][:email][:password],
      # password_confirmation: args[:authProvider][:email][:password_confirmation]
    )
  end
end
