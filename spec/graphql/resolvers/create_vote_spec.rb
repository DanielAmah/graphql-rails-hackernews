# frozen_string_literal: true

require "rails_helper"

RSpec.describe Resolvers::CreateVote do
  let!(:link) { Link.create(url: "another.com", description: "another description") }
  let!(:user) { create(:user) }
  let!(:vote) { create(:vote) }
  let(:args) { {linkId: 2} }
  subject(:result) do
    described_class.new.call(nil, args, current_user: user)
  end
  it "returns the correct link id" do
    expect(result.as_json["link_id"]).to eq(args[:linkId])
  end
end
