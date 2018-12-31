# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::UserType do
  # avail type definer in our tests
  types = GraphQL::Define::TypeDefiner.instance

  it "has an :id field of ID type" do
    # Ensure that the field id is of type ID
    expect(subject).to have_field(:id).that_returns(!types.ID)
  end

  it "has a :title field of String type" do
    # Ensure the field is of String type
    expect(subject).to have_field(:email).that_returns(!types.String)
  end

  it "has a :vote field to return all the votes for that user" do
    # Ensure the field is of String type
    expect(subject).to have_field(:votes).that_returns(!types[Types::VoteType])
  end
end
