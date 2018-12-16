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

    user = User.find_by email: input[:email]

    return unless user
    return unless user.valid_password?(input[:password])

    ctx[:session][:token] = AuthToken.token(user)

    OpenStruct.new({
      token: AuthToken.token(user),
      user: user
    })
  end
end
