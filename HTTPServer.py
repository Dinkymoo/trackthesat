from urllib.request import urlopen, HTTPError, URLError
from flask import Flask, json, Response


api = Flask(__name__)
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
        return myURL.read(), {'Access-Control-Allow-Origin' : '*'}
        


if __name__ == '__main__' :
    api.run() 

#print (obj['timestamp'])
#print (obj['iss_position']['latitude'], obj['data']['iss_position']['latitude'])




    
