from urllib.request import urlopen
from urllib.error import URLError, HTTPError
from flask import Flask
import json 



api = Flask(__name__)
obj  = ()

@api.route('/location', methods=['GET'])
def get_companies():
    try:
        myURL = urlopen("http://api.open-notify.org/iss-now.json/")
    except HTTPError as e:
        print('HTTP Error code: ', e.code)
    except URLError as e:
        print('URL Error: ', e.reason)
    else:
        print('No Error.')
        response = myURL.read(), {'Access-Control-Allow-Origin' : '*'}
        return response



if __name__ == '__main__' :
    api.run()






