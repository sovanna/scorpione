class sasrio::mongodb {
    Exec {
        path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
    }

    exec {'public key mongo':
        command => 'apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10',
        creates => '/root/.ssw-key-mongo',
        before => Exec['deb mongo'],
    }

    exec {'deb mongo':
        command => 'echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list',
        creates => '/root/.ssw-deb-mongo',
    }

    exec {'install mongo':
        command => 'apt-get install mongodb-org -y',
        require => Exec['apt-update'],
    }

    file {'/root/.ssw-key-mongo':
        ensure => present,
        subscribe => Exec['install mongo'],
    }

    file {'/root/.ssw-deb-mongo':
        ensure => present,
        subscribe => Exec['install mongo'],
    }

    service {'mongod':
        ensure => running,
    }
}
