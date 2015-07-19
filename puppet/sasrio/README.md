
### Quick install

	cd /tmp
	wget https://apt.puppetlabs.com/puppetlabs-release-precise.deb
	dpkg -i puppetlabs-release-precise.deb
	apt-get update

install puppet simply as an agent node (not with master)

	apt-get install puppet


comment out template

	vi /etc/puppet/puppet.conf

	#templatedir=$confdir/templates

start puppet

	vi /etc/default/puppet
	START=yes


### Example of puppet master config

	class start {
		include sasrio

		user {'sovanna':
			name => 'sovanna',
			ensure => 'present',
			gid => 'sovanna',
			home => '/home/sovanna',
			managehome => 'true',
			password => 'my encrypted password',
			provider => 'useradd',
			shell => '/bin/bash',
		}

		sudo::conf {'sovanna':
			content => 'sovanna ALL=(ALL) NOPASSWD:ALL',
		}

		ssh_authorized_key {'sovanna@sasr.io':
			ensure => 'present',
			key => 'my ssh key',
			user => 'sovanna',
			type => 'ssh-rsa',
		}

		ssh_keygen {'sovanna':}
	}

	node puppet {
		include start
		include sasrio::bbase
	}

	node 'vm01.lan' {
		include start
		include sasrio::bbase
		include sasrio::web
		include sasrio::nodejs
	}

	node 'vm02.lan' {
		include start
		include sasrio::bbase
		include sasrio::jenkins
	}

	node 'vm03.lan' {
		include start
		include sasrio::bbase
		include sasrio::python
	}

	node 'vm04.lan' {
		include start
		include sasrio::bbase
		include sasrio::mysql
	}
