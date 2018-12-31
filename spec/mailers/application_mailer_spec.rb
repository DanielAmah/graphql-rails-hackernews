# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationMailer, type: :mailer do
  describe "instructions" do
    let(:user) { create(:user) }
    let(:mail) { described_class.instructions(user).deliver_now }

    it "renders the subject" do
      expect(mail.subject).to eq("Instructions")
    end

    it "renders the receiver email" do
      expect(mail.to).to eq([user.email])
    end

    it "renders the sender email" do
      expect(mail.from).to eq(["from@example.com"])
    end
  end
end
