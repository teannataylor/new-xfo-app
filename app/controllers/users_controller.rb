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
      render json: user, status: :created
    end
  
    def show
      @current_user = current_user
      render json: @current_user
    end

    # def public_show
    #   user = User.includes(reviews: :product).find_by(id: params[:id])
    #   if user
    #     render json: user, include: { reviews: { include: :product } }
    #   else
    #     render json: { errors: "User not found" }, status: :not_found
    #   end
    # end
  
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