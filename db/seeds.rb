# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

# Create Users
users = []
5.times do
  user = User.create(
    name: Faker::Name.name,
    username: Faker::Internet.username(specifier: 8..12),
    password: '12345',
    password_confirmation: '12345'
  )
  users << user
end

puts 'Seeded Users'

product1 = Product.create(
    name: 'Innisfree Green Tea Foam Cleanser',
    image_url: 'https://ae01.alicdn.com/kf/S39ad5eb98ed14d5dad39151a2e705bd40/Innisfree-Refreshing-Green-Tea-Foam-Facial-Cleanser-Moisturizing-Oil-Control-Acne-Removing-Facial-Cleanser-Korean-Cosmetics.jpg',
    brand: 'Innisfree',
    category: 'Cleanser',
    description: Faker::Lorem.sentence,
    price: 15.99
  )
  
  product2 = Product.create(
    name: 'Cosrx Low pH Good Morning Gel Cleanser',
    image_url: 'https://1.bp.blogspot.com/-EIqgzX16h6Y/X4h6QonedxI/AAAAAAAADBU/Dyf_yJPSJL03Cxz_NXrBfr65mpJKrV0oQCLcBGAsYHQ/s1276/COSRX-Low-pH-Good-Morning-Gel-Cleanser-Review.jpg',
    brand: 'Cosrx',
    category: 'Cleanser',
    description: Faker::Lorem.sentence,
    price: 12.99
  )
  
  product3 = Product.create(
    name: 'Laneige Water Bank Moisture Cream',
    image_url: 'https://di2ponv0v5otw.cloudfront.net/posts/2022/06/06/629e52709e1559dd96751f30/m_629e5374800f6493fcfbb35d.jpg',
    brand: 'Laneige',
    category: 'Moisturizer',
    description: Faker::Lorem.sentence,
    price: 29.99
  )
  
  product4 = Product.create(
    name: 'Etude House SoonJung 2x Barrier Intensive Cream',
    image_url: 'https://www.etude.com/int/en/media/catalog/product/2/x/2x_barrier_cream_main1.jpg?width=265&height=265&store=default&image-type=image',
    brand: 'Etude House',
    category: 'Moisturizer',
    description: Faker::Lorem.sentence,
    price: 18.99
  )
  
  product5 = Product.create(
    name: 'Missha Time Revolution Night Repair Probio Ampoule',
    image_url: 'https://cdn11.bigcommerce.com/s-m21c43lq2u/images/stencil/2048x2048/products/150/588/MISSHA-07__20834.1613700495.png?c=1',
    brand: 'Missha',
    category: 'Serum',
    description: Faker::Lorem.sentence,
    price: 39.99
  )
  
  product6 = Product.create(
    name: 'Dear Klairs Freshly Juiced Vitamin C Serum',
    image_url: 'https://cdn.shopify.com/s/files/1/0439/6489/1300/products/Klairs_Freshly_Juiced_Vitamin_C_Serum_PDP_low.jpg?v=1602258527',
    brand: 'Dear Klairs',
    category: 'Serum',
    description: Faker::Lorem.sentence,
    price: 27.99
  )
  
  
 #Random Reviews
 50.times do
  user = users.sample
  product = Product.where.not(id: user.reviews.pluck(:product_id)).sample
  
  unless product.nil?
    Review.create(
      user_id: user.id,
      product_id: product.id,
      comment: Faker::Lorem.sentence
    )
  end
end

puts 'Seeded Reviews'
