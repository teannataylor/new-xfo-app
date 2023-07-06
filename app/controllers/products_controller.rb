class ProductsController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:index, :show]

  def index
    products = Product.all
    render json: products
  end

  def show
    product = Product.find_by(id: params[:id])
    render json: product
  end

  def create
    product = current_user.products.create!(product_params)
    if product.save
      render json: product, status: :created
    else 
      render json: {errors: product.errors.full_messages}, status: :unprocessable_entity
    end
  end
      

  def update
    product = current_user.products.find(params[:id])
    if product.update(product_params)
      render json: product, status: :accepted
    else 
      render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    product = current_user.products.find(params[:id])
    product.destroy
    head :no_content
  end

  private


  def current_user
    User.find_by(id: session[:user_id])
  end
  
  def authorize
    return render json: { errors: "Not Authorized" }, status: :unauthorized unless session.include?(:user_id)
  end

def product_params
  params.require(:product).permit(:name, :brand, :category, :description, :price, :image_url).except(:review)
end

end

# t.string :name
# t.string :brand
# t.string :type
# t.text :description
# t.float :price