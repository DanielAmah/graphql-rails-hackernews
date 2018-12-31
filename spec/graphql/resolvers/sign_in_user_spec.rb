# frozen_string_literal: true

require "rails_helper"

describe "Sign in Mutation", type: :request do
  include_context "GraphQL Client"
  let!(:user) { create(:user) }
  let(:query) do
    <<-GRAPHQL
      mutation($email: String!, $password: String!) {
        signinUser(email: {
          email: $email,
          password: $password
        }) {
        user {
          id
          email
         }
        }
      }
    GRAPHQL
  end

  it "returns a sign in user" do
    response = client.execute(query, email: user.email, password: user.password)
    sign_in_user = response.data.signin_user.user
    expect(sign_in_user.id).to eq user.id.to_s
    expect(sign_in_user.email).to eq user.email.to_s
  end
end
