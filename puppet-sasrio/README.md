
### Example of puppet master config

	class base {
		include vmdefault

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
		include base
	}

	node 'vm01.lan' {
		include base
		include vmdefault::web
		include vmdefault::nodejs
	}

	node 'vm02.lan' {
		include base
		include vmdefault::jenkins
	}

	node 'vm03.lan' {
		include base
		include vmdefault::python
	}

	node 'vm04.lan' {
		include base
		include vmdefault::mysql
	}
