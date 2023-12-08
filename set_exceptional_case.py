import requests
import json

LINK_TO_LAMBDA_API = "https://ecywy5wzuk.execute-api.eu-north-1.amazonaws.com"

if __name__=="__main__":
    params = {"Type": "REST", 'User': "Hermione", 'Description': json.dumps({"AlreadyTaken": True, "Question": 4, "GivesPresentTo": "Harry"})}
    out = requests.put(LINK_TO_LAMBDA_API, params=params)
    print(out.text)
    
    params = {"Type": "REST", 'User': "Harry", 'Description': json.dumps({"AlreadyTaken": True, "Question": 3, "GivesPresentTo": "Hermione"})}
    out = requests.put(LINK_TO_LAMBDA_API, params=params)
    print(out.text)
    
    params = {"Type": "REST", 'User': "Ron", 'Description': json.dumps({"AlreadyTaken": False, "Question": 2, "GivesPresentTo": "Nevil"})}
    out = requests.put(LINK_TO_LAMBDA_API, params=params)
    print(out.text)
    
    params = {"Type": "REST", 'User': "Nevil", 'Description': json.dumps({"AlreadyTaken": True, "Question": 1, "GivesPresentTo": None})}
    out = requests.put(LINK_TO_LAMBDA_API, params=params)
    print(out.text)
    
    params = {"Type": "REST", 'User': "Luna", 'Description': json.dumps({"AlreadyTaken": False, "Question": 1, "GivesPresentTo": None})}
    out = requests.put(LINK_TO_LAMBDA_API, params=params)
    print(out.text)
    