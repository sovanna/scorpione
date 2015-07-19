class sasrio {
    Exec {
        path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
    }

    exec {'apt-update':
        command => 'apt-get update',
    }

    exec {'install puppet module sudo':
        command => 'puppet module install saz-sudo',
    }

    exec {'install puppet module ssh_keygen':
        command => 'puppet module install maestrodev-ssh_keygen',
    }

    cron {'puppet-agent':
        ensure  => 'present',
        command => '/usr/bin/puppet agent --onetime --no-daemonize --splay',
        minute  => ['3'],
        target  => 'root',
        user    => 'root',
    }
}

