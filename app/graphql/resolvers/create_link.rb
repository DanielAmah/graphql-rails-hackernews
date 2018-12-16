class Resolvers::CreateLink < GraphQL::Function

  argument :description, !types.String
  argument :url, !types.String

  type Types::LinkType


  def call(obj, args, ctx)

    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    Link.create!(
      description: args[:description],
      url: args[:url],
      user: ctx[:current_user]
    )
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
