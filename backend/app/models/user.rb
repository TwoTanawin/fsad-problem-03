class User < ApplicationRecord
  has_secure_password

  # has_one :user_profile

  # Associations
  has_one :user_profile
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  has_many :saved_posts, dependent: :destroy
  has_many :activity_feeds, dependent: :destroy
  has_many :tokens, dependent: :destroy

  # Validations
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, on: :create
end
