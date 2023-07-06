3 Models:

[User]
[Products]
[Review]

BackEnd Steps:
Build out Models 

rails generate resource ResourceName
rails g resource user username password_digest
rails generate migration CreateReviews user:references product:references
user attributes :username :password_digest :name
review :comment
products :name :price :brand :type :description


Functionality:
All Products
Add,Delete Prouct
Add,Delete, update Review -- user only 
Logout 

front end fuctionality
sort by a attribute?


For this project - Completed Requirements:
Have three models: User, Product, and Reviews
Many-to-many relationship - products have many users, users have many products
Full CRUD - Project; only authenticated user's can 
Create & Read on Reviews and Users
Edit and Delete that speciifc product if they're tied to it.
Active Record validations are included 
Have atleast 3 client-side routes - Nav bar completed
Have succesfully logged in, signed up and logout
Used useContext
