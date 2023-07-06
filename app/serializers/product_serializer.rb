class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :brand, :category, :description, :price, :image_url

  has_many :reviews
  has_many :users, through: :reviews
end
