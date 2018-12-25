# frozen_string_literal: true

Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, !types.ID
  field :email, !types.String
  field :votes, -> { !types[Types::VoteType] }
end
