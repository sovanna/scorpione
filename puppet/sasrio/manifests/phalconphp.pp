class sasrio::phalconphp {
    Exec {
        path => [ "/bin/", "/sbin/", "/usr/bin", "/usr/sbin/" ]
    }

    package {'php5-dev':
        ensure => installed
    }

    package {'libpcre3-dev':
        ensure => installed,
        require => Package['php5-dev']
    }

    package {'gcc':
        ensure => installed,
        require => Package['libpcre3-dev']
    }

    package {'php5-mysql':
        ensure => installed,
        require => Package['make']
    }

    package {'php5-fpm':
        ensure => installed,
        require => Package['php5-mysql']
    }

    file {'phalconphp':
        ensure => 'file',
        source => 'puppet:///modules/sasrio/phalconphp.sh',
        path => '/usr/local/bin/phalconphp.sh',
        owner => 'root',
        group => 'root',
        mode => '0744',
        notify => Exec['run phalconphp'],
        require => Package['php5-fpm']
    }

    exec {'run phalconphp':
        command => '/usr/local/bin/phalconphp.sh',
        refreshonly => true
    }
}