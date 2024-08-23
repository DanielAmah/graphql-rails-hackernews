# spec/requests/api/graphql_spec.rb
require 'swagger_helper'

RSpec.describe 'GraphQL API', type: :request do
  let(:user) { create(:user) }
  let(:headers) { { 'HTTP_X_USER_TOKEN' => user.authentication_token } }

  path '/api/graphql?operation=fetchAllLinks' do
    post 'Fetch all links' do
      operationId 'fetchAllLinks'
      tags 'GraphQL - Queries'
      consumes 'application/json'
      security [{ UserToken: [] }]

      parameter name: :query, in: :body, schema: {
        type: :object,
        properties: {
          query: {
            type: :string,
            example: '{ allLinks { id url description } }'
          }
        },
        required: ['query']
      }

      response '200', 'A list of all links' do
        let(:query) { { query: '{ allLinks { id url description } }' } }

        run_test! do |response|
          post '/api/graphql?operation=fetchAllLinks', params: query, headers: headers
          expect(response).to have_http_status(:ok)
          # Additional assertions on the response
        end
      end
    end
  end

  path '/api/graphql?operation=fetchMetaData' do
    post 'Fetch metadata' do
      operationId 'fetchMetaData'
      tags 'GraphQL - Queries'
      consumes 'application/json'
      security [{ UserToken: [] }]

      parameter name: :query, in: :body, schema: {
        type: :object,
        properties: {
          query: {
            type: :string,
            example: '{ meta { count } }'
          }
        },
        required: ['query']
      }

      response '200', 'Metadata information' do
        let(:query) { { query: '{ meta { count } }' } }

        run_test! do |response|
          post '/api/graphql?operation=fetchMetaData', params: query, headers: headers
          expect(response).to have_http_status(:ok)
          # Additional assertions on the response
        end
      end
    end
  end

  # Mutation: createLink
  path '/api/graphql?operation=createLink' do
    post 'Create a Link' do
      operationId 'createLink'
      tags 'GraphQL - Mutations'
      consumes 'application/json'
      security [{ UserToken: [] }]

      parameter name: :query, in: :body, schema: {
        type: :object,
        properties: {
          query: {
            type: :string,
            example: 'mutation { createLink(url: "http://example.com", description: "Example") { id url description } }'
          }
        },
        required: ['query']
      }

      response '200', 'Link created' do
        let(:query) { { query: 'mutation { createLink(url: "http://example.com", description: "Example") { id url description } }' } }

        run_test! do |response|
          post '/api/graphql?operation=createLink', params: query, headers: headers
          expect(response).to have_http_status(:ok)
          # Additional assertions on the response
        end
      end
    end
  end

  # Mutation: createVote
  path '/api/graphql?operation=createVote' do
    post 'Create a Vote' do
      operationId 'createVote'
      tags 'GraphQL - Mutations'
      consumes 'application/json'
      security [{ UserToken: [] }]

      parameter name: :query, in: :body, schema: {
        type: :object,
        properties: {
          query: {
            type: :string,
            example: 'mutation { createVote(linkId: "1") { id link { id } user { id } } }'
          }
        },
        required: ['query']
      }

      response '200', 'Vote created' do
        let!(:link) { create(:link) } # Ensure there is a link to vote on
        let(:query) { { query: "mutation { createVote(linkId: \"#{link.id}\") { id link { id } user { id } } }" } }

        run_test! do |response|
          post '/api/graphql?operation=createVote', params: query, headers: headers
          expect(response).to have_http_status(:ok)
          # Additional assertions on the response
        end
      end
    end
  end

  # Mutation: createUser
  path '/api/graphql?operation=createUser' do
    post 'Create a User' do
      operationId 'createUser'
      tags 'GraphQL - Mutations'
      consumes 'application/json'

      parameter name: :query, in: :body, schema: {
        type: :object,
        properties: {
          query: {
            type: :string,
            example: 'mutation { createUser(name: "John Doe", authProvider: { email: { email: "john@example.com", password: "password" } }) { id email } }'
          }
        },
        required: ['query']
      }

      response '200', 'User created' do
        let(:query) { { query: 'mutation { createUser(name: "John Doe", authProvider: { email: { email: "john@example.com", password: "password" } }) { id email } }' } }

        run_test! do |response|
          post '/api/graphql?operation=createUser', params: query
          expect(response).to have_http_status(:ok)
          # Additional assertions on the response
        end
      end
    end
  end

  # Mutation: signinUser
  path '/api/graphql?operation=signinUser' do
    post 'Sign in a User' do
      operationId 'signinUser'
      tags 'GraphQL - Mutations'
      consumes 'application/json'

      parameter name: :query, in: :body, schema: {
        type: :object,
        properties: {
          query: {
            type: :string,
            example: 'mutation { signinUser(email: { email: "john@example.com", password: "password" }) { token user { id email } } }'
          }
        },
        required: ['query']
      }

      response '200', 'User signed in' do
        let(:query) { { query: 'mutation { signinUser(email: { email: "john@example.com", password: "password" }) { token user { id email } } }' } }

        run_test! do |response|
          post '/api/graphql?operation=signinUser', params: query
          expect(response).to have_http_status(:ok)
          # Additional assertions on the response
        end
      end
    end
  end
end
