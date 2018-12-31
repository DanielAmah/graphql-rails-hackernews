# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationCable::Connection, type: :channel do
  it "successfully connects" do
    connect "/cable"
    expect(connection).to be_a ApplicationCable::Connection
  end
end
