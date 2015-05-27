require 'spec_helper'
describe 'vmdefault' do

  context 'with defaults for all parameters' do
    it { should contain_class('vmdefault') }
  end
end
