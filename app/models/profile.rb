class Profile < ActiveRecord::Base
  belongs_to :user
  attr_accessible :address, :firstname, :lastname, :mobile, :user_id
end
