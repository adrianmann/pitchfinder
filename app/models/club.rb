class Club < ActiveRecord::Base
  attr_accessible :address, :crest, :description, :latitude, :longtitude, :name

  def self.search(search)
    if search
      where('name LIKE ?', "%#{search}%")
    else
      scoped
    end
  end

end
