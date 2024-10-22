Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  post "signup", to: "authentication#signup"
  post "login", to: "authentication#login"
  get "user_info", to: "authentication#user_info"
  get "user_profiles", to: "user_profiles#show"

  resources :user_profiles, only: [ :index, :create, :show, :update, :destroy ]
end
