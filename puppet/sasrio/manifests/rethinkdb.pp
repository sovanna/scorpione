class sasrio::rethinkdb {
    Exec {
        path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
    }

    exec {'deb rethinkdb':
        command => 'echo "deb http://download.rethinkdb.com/apt/ wheezy main" | tee -a /etc/apt/sources.list.d/rethinkdb.list',
        creates => '/root/.ssw-deb-rethinkdb-wheezy-org'
    }

    exec {'wget key':
        command => 'wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -',
        require => Exec['deb rethinkdb']
    }

    exec {'install rethinkdb':
        command => 'apt-get install rethinkdb -y',
        require => Exec['apt-update'],
        subscribe => Exec['wget key']
    }

    exec {'restart rethinkdb':
        command => '/etc/init.d/rethinkdb restart',
        require => File['rethinkdb conf'],
    }

    file {'/root/.ssw-deb-rethinkdb-wheezy-org':
        ensure => present,
        subscribe => Exec['deb rethinkdb'],
    }

    file {'rethinkdb conf':
        ensure => 'file',
        source => 'puppet:///modules/sasrio/rethink.conf',
        path => '/etc/rethinkdb/instances.d/rethink.conf',
        owner => 'root',
        group => 'root',
        require => Exec['install rethinkdb']
    }
}