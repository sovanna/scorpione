class vmdefault::bbase {
    Exec {
        path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
    }

    package {'vim-nox':
        ensure => installed,
    }

    package {'ntp':
        ensure => installed,
    }

    package {'ntpdate':
        ensure => installed,
    }

    package {'bash-completion':
        ensure => installed,
    }

    package {'ssh':
        ensure => installed,
    }

    package {'openssh-server':
        ensure => installed,
    }

    package {'make':
        ensure => installed,
    }

    package {'build-essential':
        ensure => installed,
    }

    package {'git-core':
        ensure => installed,
    }

    package {'htop':
        ensure => installed,
    }
}

