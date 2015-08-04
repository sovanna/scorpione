#!/bin/bash
cd /tmp
git clone --depth=1 git://github.com/phalcon/cphalcon.git
cd cphalcon/build
./install
echo "extension=phalcon.so" >> /etc/php5/conf.d/30-phalcon.ini
service php5-fpm restart
cd