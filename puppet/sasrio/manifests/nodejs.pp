class sasrio::nodejs {
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