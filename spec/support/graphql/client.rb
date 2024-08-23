# frozen_string_literal: true
require 'faraday'
require 'faraday/rack'
require "graphlient"

RSpec.shared_context "GraphQL Client", shared_context: :metadata do
  let(:client) do
    Graphlient::Client.new("http://localhost:3001/api/graphql") do |client|
      client.http do |h|
        h.connection do |c|
          c.adapter :rack, app  # Use `adapter` instead of `use`
        end
      end
    end
  end
end
