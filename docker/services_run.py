import sys
import subprocess

cmd = 'docker-compose -f services.yml -p tomas up -d'
params = cmd.split()
if len(sys.argv) > 1:
	service = sys.argv[1]
	params.append(service)
	print('Run [%s] service ->' % (service))
else:
	print('Run all services ->')
p = subprocess.Popen(params)

p.communicate()