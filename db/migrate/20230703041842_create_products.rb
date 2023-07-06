class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :image_url
      t.string :brand
      t.string :category
      t.text :description
      t.float :price

      t.timestamps
    end
  end
end
