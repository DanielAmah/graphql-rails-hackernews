# frozen_string_literal: true

require "rails_helper"


xdescribe ApplicationCable::Channel, type: :channel do  # Replace `SomeChannel` with your actual channel class
  let!(:user) { create(:user) }

  before do
    # initialize connection with identifiers
    stub_connection user_id: user.id
  end


  it "subscribes without streams when no room id" do
    subscribe

    expect(subscription).to be_confirmed
    expect(subscription).not_to have_streams
  end

end
