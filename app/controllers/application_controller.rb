class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize
rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid


private


def authorize
  if session[:user_id].present?
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: "User authorization failed" }, status: :unauthorized unless @current_user
  else
    render json: { errors: "User not authenticated" }, status: :unauthorized
  end
end

def handle_invalid(invalid)
  render json: { errors: invalid.record.errors.full_messages }, status: 422
end
end
