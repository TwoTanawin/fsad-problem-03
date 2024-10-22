class UserProfile < ApplicationRecord
  belongs_to :user

  validates :user, presence: true
  validates :bio, length: { maximum: 500 }
  validates :fitness_goals, length: { maximum: 500 }
  validates :age, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
  validates :weight, numericality: { greater_than: 0 }, allow_nil: true
  validates :height, numericality: { greater_than: 0 }, allow_nil: true
  validates :gender, inclusion: { in: %w[male female other] }, allow_nil: true
end
