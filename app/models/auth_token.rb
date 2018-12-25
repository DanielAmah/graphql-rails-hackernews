# frozen_string_literal: true

class AuthToken
  def self.token(user)
    payload = {user_id: user.id, user_email: user.email}
    JsonWebToken.encode(payload)
  end

  def self.verify(token)
    result = JsonWebToken.decode(token)
    return nil unless result

    User.find_by(id: result[:user_id])
  end
end
