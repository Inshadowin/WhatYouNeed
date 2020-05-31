import sys
import time
import subprocess

def build():
    
    start = time.time()
    params = ['docker-compose', '-f', 'services.yml', 'build', '--no-cache']
    if len(sys.argv) > 1:
        service = sys.argv[1]
        params.append(service)
        print('Build [%s] service ->' % (service))
    else:
        print('Build all services ->')
    p = subprocess.Popen(params)
    p.communicate()
    end = time.time()
    print("done in {0} sec".format(end - start))

build()