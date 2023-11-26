import requests
import json

LINK_TO_LAMBDA_API = ""

if __name__=="__main__":
    users = []
    for user in users:
        params = {'User': user, 'Description': json.dumps({"AlreadyTaken": False, "Question": 4, "GivesPresentTo": None})}
        out = requests.post(LINK_TO_LAMBDA_API, params=params)
        print(out.text)
