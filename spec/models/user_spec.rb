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

    it "is not valid without an email" do
      user = User.new(email: nil)
      expect(user).to_not be_valid
    end

    it "is not valid without a password" do
      user = User.new(password: nil)
      expect(user).to_not be_valid
    end
  end

  describe "user login" do
    it "is not a valid email" do
      user = User.find_by(email: "123@gmail.com")
      expect(user).to be_nil
    end

    it "is a valid email" do
      registered_user = User.find_by(email: user.email)
      expect(registered_user).to_not be_nil
      expect(registered_user.as_json["email"]).to eq("dnlamah1@gmail.com")
    end

    it "should login in registered user" do
      registered_user = User.find_by(email: user.email)
      logged_in_user = registered_user.valid_password?(user.password)
      expect(logged_in_user).to be true
    end
  end
end
