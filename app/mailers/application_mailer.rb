# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout "mailer"

  def instructions(user)
    mail to: user.email, subject: "Instructions"
  end
end
