Rails.application.routes.draw do
  
  resources :reviews
  resources :products
  resources :users
  # Routing logic: fallback requests for React Router.
 
  get '/users/:id/public_show', to: 'users#public_show'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
 # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
