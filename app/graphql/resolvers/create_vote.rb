# frozen_string_literal: true

class Resolvers::CreateVote < GraphQL::Function
  argument :linkId, types.ID

  type Types::VoteType

  def call(_obj, args, ctx)
    user = ctx[:current_user] # Ensure current_user is set correctly
    raise GraphQL::ExecutionError, "User not signed in" unless user

    link = Link.find_by(id: args[:linkId])
    raise GraphQL::ExecutionError, "Link not found" unless link

    Vote.create!(link: link, user: user)
  end
end
