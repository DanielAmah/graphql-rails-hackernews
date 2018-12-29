# frozen_string_literal: true

require "rails_helper"

RSpec.describe Vote, type: :model do
  it "has a valid factory" do
    expect(build(:vote)).to be_valid
  end

  let(:user) { create(:user) }
  let(:link) { create(:link) }

  let(:vote) { create(:vote) }

  describe "model associations" do
    it { expect(vote).to belong_to(:user) }
    it { expect(vote).to belong_to(:link) }
  end
end
