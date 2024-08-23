# frozen_string_literal: true

require "rails_helper"

xdescribe ApplicationCable::Connection, type: :channel do
  it "successfully connects" do
    connect "/cable", headers: { "X-USER-ID" => "325" }
    expect(connection.user_id).to eq "325"
  end
end
