class vmdefault::jenkins {
	Exec {
                path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
        }

        exec {'jenkins install key':
                command => 'wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -',
        }

        exec {'deb jenkins':
                command => 'echo "deb http://pkg.jenkins-ci.org/debian binary/" | tee -a /etc/apt/sources.list',
                creates => '/root/.ssw-deb-jenkins',
                subscribe => Exec['jenkins install key'],
        }

        exec {'install jenkins':
                command => 'apt-get install jenkins -y',
		subscribe => Exec['deb jenkins'],
		require => Exec['apt-update']
        }

	exec {'remove java6':
		command => 'apt-get remove openjdk-6-jre-headless openjdk-6-jre-lib openjdk-6-jre default-jre default-jre-headless -y',
		before => Service['jenkins'],
	}
		

        package {'jenkins':
                ensure => installed,
		subscribe => Exec['install jenkins'],
        }

	package {'openjdk-7-jre':
		ensure => installed,
		before => Service['jenkins'],
	}

	service {'jenkins':
		ensure => running,
	}

        file {'/root/.ssw-deb-jenkins':
                ensure => present,
                subscribe => Exec['install jenkins'],
        }
}

