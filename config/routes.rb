# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    devise_for :users,
               path:        "",
               path_names:  {
                 sign_in:      "login",
                 sign_out:     "logout",
                 registration: "signup"
               },
               controllers: {
                 sessions:      "api/sessions",
                 registrations: "api/registrations"
               }

    if Rails.env.development?
      authenticated do
        mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/api/graphql"
      end
    end
    post "/graphql", to: "graphql#execute"
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  end

  get "*path", to: "application#fallback_index_html", constraints: lambda {|request|
    !request.xhr? && request.format.html?
  }
end
