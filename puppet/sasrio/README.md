
### Quick install

    cd /tmp
    wget https://apt.puppetlabs.com/puppetlabs-release-wheezy.deb
    dpkg -i puppetlabs-release-wheezy.deb
    apt-get update

install puppet simply as an agent node (not with master)

    apt-get install puppet


comment out template

    vi /etc/puppet/puppet.conf

    #templatedir=$confdir/templates

start puppet

    vi /etc/default/puppet
    START=yes


### Example of puppet master config

    class mandatory {
        include sasrio
        include sasrio::bbase
    }

    node 'vm01.lan' {
        require mandatory

        group {'sovanna':
            ensure => 'present',
        }

        user {'sovanna':
            ensure => 'present',
            name => 'sovanna',
            gid => 'sovanna',
            home => '/home/sovanna',
            managehome => 'true',
            password => '$1$sovanna$GuEAc4pFGqMeSdvyZWFZk1',
            provider => 'useradd',
            shell => '/bin/bash',
        }

        ssh_keygen {'sovanna':}
        ssh_keygen {'root': home => '/root'}

        sudo::conf {'sovanna':
            content => 'sovanna ALL=(ALL) NOPASSWD:ALL',
        }

        ssh_authorized_key {'sovanna.hing@gmail.com':
            ensure => 'present',
            key => 'AAAAB3NzaC1yc2EAAAADAQABAAABAQDJSwqtG7NSR9Y8xcbkqOmRvhJaVJui/ltnaBiiC1BJQUqaXvvDw3beEQmVzATGeU9NAFSt9rtxFlCGR0G0uGoxkt3/98c/dSlzP9Xv7EG+B0YgPR1+ugqQ38NsotNknq0mKUczJR5vaBV8rRIHpcy872kCdntwMcsiLb9hpdiUWHCqgRDQbeSIVUAYlXOeQ/di2WLVhMTsS3Tq0AexJgGyyxvNqC5LxOGDwhiSTAsz97Hwj3axrkp3NzAALP0stdoygz9koSpEHmCPR9ApeiIp2d6yL7eUV7chHtJgL83YsR6HCcKYcNziOVpyqfnMCv2f7/hYpi3zRY1xjlpGNUEB',
            user => 'sovanna',
            type => 'ssh-rsa',
        }

        file {'vim folder':
            ensure => 'directory',
            source => 'puppet:///modules/sasrio/.vim/',
            path => '/home/sovanna/.vim/',
            recurse => true,
            owner => 'sovanna',
            group => 'sovanna',
            require => User['sovanna']
        }

        file {'vimrc':
            ensure => 'file',
            source => 'puppet:///modules/sasrio/.vimrc',
            path => '/home/sovanna/.vimrc',
            owner => 'sovanna',
            group => 'sovanna',
            require => User['sovanna']
        }
    }
