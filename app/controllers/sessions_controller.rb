class SessionsController < ApplicationController

  def after_sign_in_path_for(user)
    "/myprofile" #adjust the returned path as needed
  end

  def after_sign_up_path_for(user)
    "/myprofile" # <- Path you want to redirect the user to after signup
  end
end
