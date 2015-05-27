class vmdefault::python {
	Exec {
		path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ],
	}

	package {'software-properties-common':
		ensure => installed,
	}

	package {'python-software-properties':
		ensure => installed,
	}

	package {'python-dev':
		ensure => installed,
	}
	
	package {'python-pip':
		ensure => installed,
	}

	package {'uwsgi':
		ensure => installed,
	}

	package {'uwsgi-plugin-python':
		ensure => installed,
	}

	package {'python-uwsgidecorators':
		ensure => installed,
	}

	exec {'pip install virtualenv':
		command => 'pip install virtualenv',
		require => Package['python-pip'],
	}

	service {'uwsgi':
		ensure => running,
		require => Package['uwsgi'],
	}
}
