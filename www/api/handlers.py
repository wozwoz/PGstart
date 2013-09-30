import webapp2
import logging
import urllib2
import json
from helpers.jsonHelper import parseXML 

class ProxyHandler(webapp2.RequestHandler):
    def post(self, *args, **kwargs):
        "Proxy call to URL"
        url = self.request.get('url')
        logging.info('Proxy POST to: {0}'.format(url))
        jsonString = self.request.body
        req = urllib2.Request(url, jsonString, {'content-type': 'application/json'})
        f = urllib2.urlopen(req)
        response = f.read()
        f.close()
        #logging.info(response)
        self.response.headers['content-type'] = 'application/json'   
        self.response.out.write(response)

    def post_test(self, *args, **kwargs):
        'Test post method and response'
        logging.info('In post_test')
        jsonString = self.request.body
        logging.info(jsonString)
        jsonData = json.loads(jsonString)
        logging.info(jsonData)
        data = {'Response': 'success/true'}
        jsonData = json.dumps(data)
        logging.info(jsonData)
        self.response.out.write(jsonData)
        
class ConversionHandler(webapp2.RequestHandler):  
    def post(self, *args, **kwargs):
        'Convert entered xml (request.body) to json'
        xmlString = self.request.body
        jsonData = parseXML(xmlString)
        self.response.headers['content-type'] = 'application/json'   
        self.response.out.write(jsonData)
        