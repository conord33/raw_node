VAGRANTFILE_API_VERSION = "2"

# The directory of the web apps
WEBAPPS_DIR = "/var/www"
# The name of the app
APP_NAME = "api"
# The number of node processes to spin up
PROCESS_NUMBER = 8

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"

  # Name the box, handy for multiple Environments and projects
  config.vm.define APP_NAME do |t|
  end

  # Forward port 8080 traffic to our server
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Disable defalut shared folder and set it to what we want
  config.vm.synced_folder ".", "/home/vagrant", disabled: true
  config.vm.synced_folder "./#{APP_NAME}", "#{WEBAPPS_DIR}/#{APP_NAME}"

  # Provision with ansible
  config.vm.provision :ansible do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    ansible.extra_vars = {
      app_name: APP_NAME,
      webapps_dir: WEBAPPS_DIR,
      process_number: PROCESS_NUMBER
    }
  end

end
