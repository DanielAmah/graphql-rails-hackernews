# frozen_string_literal: true

class JWTBlacklist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  self.table_name = "jwt_blacklist"
end
