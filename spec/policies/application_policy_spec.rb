# frozen_string_literal: true

require "rails_helper"

describe ApplicationPolicy do
  subject { ApplicationPolicy.new(user, link) }

  let(:link) { create(:link) }

  context "for a user" do
    let(:user) { create(:user) }

    it { should_not permit(:show)    }
    it { should_not permit(:create)  }
    it { should_not permit(:new)     }
    it { should_not permit(:update)  }
    it { should_not permit(:edit)    }
    it { should_not permit(:destroy) }
  end
end
