# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "#{Faker::Internet.email}-#{n}" }
    sequence(:password) {|n| "#{Faker::Lorem.characters(10)}-#{n}" }
  end
end
