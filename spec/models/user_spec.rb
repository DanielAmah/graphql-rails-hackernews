# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  it "has a valid factory" do
    expect(build(:user)).to be_valid
  end

  let(:attributes) do
    {
      email:    "dnlamah1@gmail.com",
      password: "12345678"
    }
  end

  let(:user) { create(:user, **attributes) }

  describe "model validations" do
    # check that the fields received the right values
    it { expect(user).to allow_value(attributes[:email]).for(:email) }
    it { expect(user).to allow_value(attributes[:password]).for(:password) }
  end
end
