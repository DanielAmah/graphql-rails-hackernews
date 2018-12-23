Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :allLinks,  function: Resolvers::LinksSearch
  field :meta, Types::QueryMetaType do
    resolve ->(_obj, _args, _ctx) { Link.count }
  end
end
