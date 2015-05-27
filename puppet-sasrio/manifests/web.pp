class vmdefault::web {
	Exec {
                path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
        }

        exec {'deb wheezy-backports':
                command => 'echo "deb http://ftp.debian.org/debian wheezy-backports main contrib non-free" | tee -a /etc/apt/sources.list',
                creates => '/root/.ssw-deb-wheezy-backports',
                before => Exec['install nginx 1.6.x'],
                require => Exec['apt-update'],
        }

        exec {'install nginx 1.6.x':
                command => 'apt-get -t wheezy-backports install nginx -y',
        }

        file {'/root/.ssw-deb-wheezy-backports':
                ensure => present,
                subscribe => Exec['install nginx 1.6.x'],
        }

        package {'nginx':
                ensure => installed,
        }

        service {'nginx':
                ensure => running,
        }	
}

class vmdefault::nodejs {
	Exec {
		path => [ "/bin", "/sbin", "/usr/bin/", "/usr/sbin/" ]
	}

	exec {'install curl':
		command => 'sudo apt-get install curl -y',
	}

	exec {'install node setup':
		command => 'curl -sL https://deb.nodesource.com/setup | bash -',
		require => Exec['install curl'],
	}

	exec {'install pm2 monitor':
		command => 'npm install pm2 -g',
		require => Package['nodejs'],
	}

	package {'nodejs':
		ensure => installed,
		require => Exec['install node setup'],
	}
}
