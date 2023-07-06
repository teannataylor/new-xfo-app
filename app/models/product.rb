class Product < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :users, through: :reviews

    validates :name,presence: true, uniqueness: true
    validates :brand, presence: true
    validates :category, presence: true
    validates :description, presence: :true
    validates :price, presence: true, numericality: { greater_than: 0 }

end


# t.string :name
# t.string :brand
# t.string :type
# t.text :description
# t.float :price