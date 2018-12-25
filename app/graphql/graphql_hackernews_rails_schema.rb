# frozen_string_literal: true

GraphqlHackernewsRailsSchema = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
end
