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

    it "is not valid without a url" do
      link = Link.new(url: nil)
      expect(link).to_not be_valid
    end

    it "is not valid without a description" do
      link = Link.new(description: nil)
      expect(link).to_not be_valid
    end

    it "is valid" do
      link = Link.new(url: "http://bcd.com", description: "yet another description", user_id: user.id)
      expect(link).to be_valid
    end
  end

  describe "model associations" do
    it { expect(link).to belong_to(:user) }
    it { expect(link).to have_many(:votes) }
  end
end
