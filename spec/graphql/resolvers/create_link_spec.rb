# frozen_string_literal: true

require "rails_helper"

RSpec.describe Resolvers::CreateLink do
  describe "create a valid link" do
    let(:args) { {url: "http://www.url.com", description: "this is another description"} }
    let!(:user) { create(:user) }
    subject(:result) do
      described_class.new.call(nil, args, current_user: user)
    end

    it "returns the correct value" do
      expect(result.as_json["url"]).to eq(args[:url])
    end
  end

  describe "create an invalid link" do
    let(:args) { {url: 1, description: "this is another description"} }
    let!(:user) { create(:user) }
    subject(:result) do
      described_class.new.call(nil, args, current_user: user)
    end

    it "returns the correct value" do
      expect(result).to be_a GraphQL::ExecutionError
    end
  end
end
