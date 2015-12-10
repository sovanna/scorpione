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

    exec {'install puppet module mysql':
        command => 'puppet module install puppetlabs-mysql',
    }

    exec {'install puppet memcached':
	command => 'puppet module install saz-memcached',
    }
}

