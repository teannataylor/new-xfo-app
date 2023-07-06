class User < ApplicationRecord
    has_secure_password

    has_many :reviews
    has_many :products, through: :reviews

    validates :username, presence: true, uniqueness: true
    validate :password_match


    def password_match
        errors.add(:password_confirmation, "Passwords Don't Match") if password != password_confirmation
    end
end

# t.string :username
# t.string :password_digest
# t.string :name