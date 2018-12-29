# frozen_string_literal: true

FactoryBot.define do
  factory :link do
    sequence(:url) {|n| "url link #{n}" }
    sequence(:description) {|d| "url description #{d}" }

    user
  end
end
