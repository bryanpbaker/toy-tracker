server '104.131.38.234', user: "deploy", roles: %w{app}

set :branch, "master"
set :deploy_to, "/var/www/toytracker.online/html"

set :ssh_options, {
  forward_agent: true,
}

#namespace :deploy do
#    task :config_file do
#      on roles :all do
#      execute "rm -r #{release_path}/wp-config.php"
#        execute "mv #{release_path}/wp-config-production.php #{release_path}/wp-config.php"
#      end
#    end
#    after :updated, :config_file
#end
