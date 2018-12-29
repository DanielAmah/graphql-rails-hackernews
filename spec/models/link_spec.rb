# frozen_string_literal: true

require "rails_helper"

RSpec.describe Link, type: :model do
  it "has a valid factory" do
    expect(build(:link)).to be_valid
  end

  let(:user) { create(:user) }
  let(:attributes) do
    {
      url:         "http://www.abc.com",
      description: "Another description"
    }
  end

  let(:link) { create(:link, **attributes) }

  describe "model validations" do
    # check that the fields received the right values
    it { expect(link).to allow_value(attributes[:url]).for(:url) }
    it { expect(link).to allow_value(attributes[:description]).for(:url) }
    # ensure that the title field is never empty
    it { expect(link).to validate_presence_of(:url) }
    # ensure that the title is unique for each todo list
    it { expect(link).to validate_presence_of(:description) }
  end

  describe "model associations" do
    it { expect(link).to belong_to(:user) }
    it { expect(link).to have_many(:votes) }
  end
end
