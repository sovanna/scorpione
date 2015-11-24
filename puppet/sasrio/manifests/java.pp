class sasrio::java {
    exec {'remove java6':
        command => 'apt-get remove openjdk-6-jre-headless openjdk-6-jre-lib openjdk-6-jre default-jre default-jre-headless -y',
        before => Package['openjdk-7-jre'],
    }

    package {'openjdk-7-jre':
        ensure => installed
    }
}