class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def after_sign_up_path_for(resource)
    "/myprofile" # <- Path you want to redirect the user to after signup
  end

  def after_sign_in_path_for(resource)
    "/myprofile" # <- Path you want to redirect the user to.
  end
end
