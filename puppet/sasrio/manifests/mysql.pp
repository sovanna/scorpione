class sasrio::mysql {
    class {'::mysql::server':
        root_password => 'K7FruGEsaTuc',
    }

    mysql::db {'base_01':
        ensure => present,
        charset => 'utf8',
        user => 'user_01',
        password => 'f55xeHebUgux',
    }
}
