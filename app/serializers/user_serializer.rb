class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name

  has_many :reviews
  has_many :products, through: :reviews
end
