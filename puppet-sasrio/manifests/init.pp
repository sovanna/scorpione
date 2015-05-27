class vmdefault {
	Exec {
		path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
	}

	exec {'apt-update':
		command => 'apt-get update',
	}

	package {'vim-nox':
		ensure => installed,
	}

	package {'ntp':
		ensure => installed,
	}

	package {'ntpdate':
		ensure => installed,
	}

	package {'bash-completion':
		ensure => installed,
	}

	package {'ssh':
		ensure => installed,
	}

	package {'openssh-server':
		ensure => installed,
	}

	package {'make':
		ensure => installed,
	}

	package {'build-essential':
		ensure => installed,
	}

	package {'htop':
		ensure => installed,
	}

	cron {'puppet-agent':
  		ensure  => 'present',
  		command => '/usr/bin/puppet agent --onetime --no-daemonize --splay',
  		minute  => ['3'],
  		target  => 'root',
  		user    => 'root',
	}

}

