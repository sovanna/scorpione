class sasrio::elasticsearch {
    Exec {
        path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
    }

    exec {'elastic install key':
        command => 'wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -',
    }

    exec {'deb elastic':
        command => 'echo "deb http://packages.elastic.co/elasticsearch/1.4/debian stable main" | tee -a /etc/apt/sources.list',
        creates => '/root/.ssw-deb-elastic',
        subscribe => Exec['elastic install key'],
    }

    file {'/root/.ssw-deb-elastic':
        ensure => present,
        subscribe => Exec['install elasticsearch'],
    }

    exec {'install elasticsearch':
        command => 'apt-get install elasticsearch -y',
        subscribe => Exec['deb elastic'],
        require => Exec['apt-update']
    }
}