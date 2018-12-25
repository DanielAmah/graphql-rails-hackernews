# frozen_string_literal: true

class Resolvers::SignInUser < GraphQL::Function
  argument :email, !Types::AuthProviderEmailInput

  type do
    name "SignInPayload"
    field :token, types.String
    field :user, Types::UserType
  end

  def call(_obj, args, ctx)
    input = args[:email]

    return unless input

    # user = User.valid_login?(input[:email], input[:password])
    user = User.find_by email: input[:email]
    return unless user
    return unless user.valid_password?(input[:password])

    if user.update_column(:authentication_token, Devise.friendly_token)
      token = user.authentication_token
      ctx[:session][:token] = token
      OpenStruct.new(
        token: token,
        user:  user
      )
    end
  end
end
