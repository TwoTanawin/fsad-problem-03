class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.text :image_base64
      t.text :caption
      t.boolean :pinned
      t.string :category

      t.timestamps
    end
  end
end
