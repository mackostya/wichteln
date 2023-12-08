import requests
import json

LINK_TO_LAMBDA_API = ""

if __name__=="__main__":
    users = ["Harry", "Hermione", "Ron", "Nevil", "Luna"]
    for user in users:
        params = {"Type": "REST", 'User': user, 'Description': json.dumps({"AlreadyTaken": False, "Question": 4, "GivesPresentTo": None})}
        out = requests.put(LINK_TO_LAMBDA_API, params=params)
        print(out.text)
