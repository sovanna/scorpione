class sasrio::web {
    Exec {
        path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
    }

    exec {'nginx signing':
        command => 'wget http://nginx.org/keys/nginx_signing.key',
    }

    exec {'nginx add key':
        command => 'apt-key add nginx_signing.key',
        require => Exec['nginx signing'],
    }

    exec {'deb nginx org':
        command => 'echo "deb http://nginx.org/packages/debian/ wheezy nginx" | tee -a /etc/apt/sources.list',
        creates => '/root/.ssw-deb-wheezy-org',
        require => Exec['nginx add key'],
    }

    exec {'deb src nginx org':
        command => 'echo "deb-src http://nginx.org/packages/debian/ wheezy nginx" | tee -a /etc/apt/sources.list',
        creates => '/root/.ssw-deb-src-wheezy-org',
        require => Exec['deb nginx org'],
        before => Exec['apt-update'],
    }

    exec {'install nginx':
        command => 'apt-get install nginx -y',
        require => Exec['deb src nginx org'],
    }

    file {'/root/.ssw-deb-wheezy-org':
        ensure => present,
        subscribe => Exec['install nginx'],
    }

    file {'/root/.ssw-deb-src-wheezy-org':
        ensure => present,
        subscribe => Exec['install nginx'],
    }

    service {'nginx':
        ensure => running,
        require => Exec['install nginx']
    }
}