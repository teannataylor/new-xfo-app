class ReviewsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: :index
  
    def index 
      reviews = Review.all
      render json: reviews, status: 200
    end
  
    def show 
      review = current_user.reviews.find(params[:id])
      render json: review
    end
  
    def create
      review = current_user.reviews.create!(review_params)
      render json: { product_id: review.product_id }, status: :created
    end
      
    def update 
      review = current_user.reviews.find(params[:id])
      review.update!(review_params)
      render json: review, status: 202
    end
  
    def destroy
      review = current_user.reviews.find(params[:id])
    
      if review.destroy
        head :no_content
      else
        render json: { error: "Review deletion failed" }, status: :unprocessable_entity
      end
    end
    
  
    private 
  
    def current_user
      User.find_by(id: session[:user_id])
    end 
  
    def authorize
      return render json: { errors: "Not Authorized" }, status: :unauthorized unless session.include?(:user_id)
    end
  
    
    def review_params
      params.require(:review).permit(:comment, :user_id, :product_id)
    end
  end