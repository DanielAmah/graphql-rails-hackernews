# frozen_string_literal: true

require "rails_helper"

RSpec.describe Resolvers::CreateUser do
  let(:args) { {authProvider: {email: {email: "xyz@gmail.com", password: "12345678"}}} }
  # let!(:user){create(:user)}
  subject(:result) do
    described_class.new.call(nil, args, nil)
  end

  it "returns the correct value" do
    expect(result.as_json["email"]).to eq(args[:authProvider][:email][:email])
  end
end
