# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationCable::Channel, type: :channel do
  let!(:user) { create(:user) }
  before do
    # initialize connection with identifiers
    stub_connection user_id: user.id
  end

  it "confirms subscription" do
    subscribe
    expect(subscription).to be_confirmed
  end
end
