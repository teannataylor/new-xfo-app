class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :product_id

  belongs_to :user
  belongs_to :product
end
