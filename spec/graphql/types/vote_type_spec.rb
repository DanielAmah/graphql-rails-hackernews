# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::VoteType do
  # avail type definer in our tests
  types = GraphQL::Define::TypeDefiner.instance

  it "has an :id field of ID type" do
    # Ensure that the field id is of type ID
    expect(subject).to have_field(:id).that_returns(!types.ID)
  end

  it "has a :user field to return all the votes for that user" do
    # Ensure the field is of String type
    expect(subject).to have_field(:user).that_returns(Types::UserType)
  end

  it "has a :link field to return all the votes for that user" do
    # Ensure the field is of String type
    expect(subject).to have_field(:link).that_returns(Types::LinkType)
  end
end
