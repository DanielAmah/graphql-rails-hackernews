class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  include ActionController::MimeResponds
  respond_to :json

  def fallback_index_html
    render :file => 'public/index.html'
  end

end
