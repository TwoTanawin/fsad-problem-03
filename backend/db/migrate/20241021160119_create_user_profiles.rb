class CreateUserProfiles < ActiveRecord::Migration[7.2]
  def change
    create_table :user_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :profile_picture
      t.text :bio
      t.text :fitness_goals
      t.decimal :weight
      t.decimal :height
      t.integer :age
      t.string :gender
      t.string :activity_level

      t.timestamps
    end
  end
end
