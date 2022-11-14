function c --wraps=clear\ \&\&\ printf\ \'\\e\[3J\' --description alias\ c=clear\ \&\&\ printf\ \'\\e\[3J\'
  clear && printf '\e[3J' $argv; 
end
