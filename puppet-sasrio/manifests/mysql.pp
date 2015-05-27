class vmdefault::mysql {
	class {'mysql::server':
		root_password => 't7chadrasPEv',
	}	

	mysql::db {'base_01':
		ensure => present,
  		charset => 'utf8',
  		user => 'user01',
  		password => 'Gefefaf8r7su',
  		require => Class['mysql::server'],
	}
}
