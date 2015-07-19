require 'spec_helper'
describe 'sasrio' do

  context 'with defaults for all parameters' do
    it { should contain_class('sasrio') }
  end
end
