class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :auth_token
      t.string :username, null: false
      t.string :full_name, null: false
      t.string :inst_id, null: false
      t.string :inst_token, null: false
      t.string :inst_picture, null: false
      t.timestamps null: false
    end

    add_index :users, :inst_id, unique: true
    add_index :users, :auth_token, unique: true

  end
end
