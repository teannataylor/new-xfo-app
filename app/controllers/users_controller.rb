class UsersController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:create, :index, :public_show]
  
    def index
      users = User.all
      render json: users
    end
  
    def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      session[:authenticated] = true # Set the authentication flag
    
      render json: user, status: :created
    end
  
    def show
      @current_user = current_user
      render json: @current_user
    end

     def public_show
    user = User.includes(reviews: :product).find(params[:id])
    render json: user, include: { reviews: { include: :product } }
  end
  
    private
  
    def current_user
      User.find_by(id: session[:user_id])
    end
  
    def authorize
      return render json: { errors: "Not Authorized" }, status: :unauthorized unless session.include?(:user_id)
    end
  
    def user_params
      params.permit(:username, :password, :name, :password_confirmation)
    end
  end