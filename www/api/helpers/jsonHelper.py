import json
import logging
from xml.etree import ElementTree

# This follows google's rules for conversion of XML to JSON

def iterNodes(node, parentDict):
    nodeDict = {}
    try:
        nodeDict.update(node.attrib)
    except AttributeError:
        pass
    if node.text != None and node.text.strip(' \n\t') != '': # remove empty elements that span lines
        logging.info(node.text.strip())
        nodeDict['$t'] = node.text
     
    for child in node:
        childDict = {}
        newDict = {}
        newDict = iterNodes(child, childDict)
        newList = []
        if child.tag in nodeDict:
            try:
                nodeDict[child.tag].append(newDict[child.tag])
            except:
                newList.append(nodeDict[child.tag])
                nodeDict[child.tag] = newList
                nodeDict[child.tag].append(newDict[child.tag])
        else:
            nodeDict.update(newDict)
    tagList = node.tag.split(':')
    namespace = '$'.join(tagList)
    parentDict[namespace] = nodeDict
    return parentDict

def parseXML(xmlString):
    root = ElementTree.fromstring(xmlString)
     
    emptyDict = {}
    parsedDict = iterNodes(root, emptyDict)
    return json.dumps(parsedDict)
