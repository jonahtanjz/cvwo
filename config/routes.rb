Rails.application.routes.draw do
  root to: "welcome#index"
  namespace :api do
    jsonapi_resources :todo
  end
  get "*path", to: "welcome#index", constraints: { format: "html" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
