# frozen_string_literal: true

class ApplicationJob < ActiveJob::Base
  queue_as :urgent
end
