class CreateClubs < ActiveRecord::Migration
  def change
    create_table :clubs do |t|
      t.string :name
      t.string :crest
      t.string :address
      t.string :description
      t.string :longtitude
      t.string :latitude

      t.timestamps
    end
  end
end
