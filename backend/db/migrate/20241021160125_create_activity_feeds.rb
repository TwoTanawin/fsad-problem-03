class CreateActivityFeeds < ActiveRecord::Migration[7.2]
  def change
    create_table :activity_feeds do |t|
      t.references :user, null: false, foreign_key: true
      t.string :action_type
      t.jsonb :action_details

      t.timestamps
    end
  end
end
