class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist

  has_many :votes
  has_many :links

  def reset_authentication_token!
    update_column(:authentication_token, Devise.friendly_token)
  end
end
