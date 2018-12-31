# frozen_string_literal: true

class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist

  has_many :votes, dependent: :destroy
  has_many :links, dependent: :destroy

  def send_instructions
    ApplicationMailer.instructions(self).deliver_now
  end
end
