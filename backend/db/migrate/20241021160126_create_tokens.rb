class CreateTokens < ActiveRecord::Migration[7.2]
  def change
    create_table :tokens do |t|
      t.references :user, null: false, foreign_key: true
      t.text :refresh_token
      t.boolean :is_valid

      t.timestamps
    end
  end
end
