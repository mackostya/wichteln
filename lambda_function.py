import boto3
import json
from random import randint
from boto3.dynamodb.conditions import Key

def handle_get(table, user):
    response = table.query(
        KeyConditionExpression=Key('User').eq(user)
    )
    return response["Items"]

def handle_post(table, user, description):
    with table.batch_writer() as batch:
        batch.put_item(
            Item={
                'User': user,
                'Description': description
                }
        )
    return "POST Success"
    
def handle_put(table, user, description):
    print("Description: ", user)
    current_description = table.query(
        KeyConditionExpression=Key('User').eq(user)
    )["Items"][0]
    print("Current description: ", current_description)
    table.delete_item(Key=current_description)
    handle_post(table, user, description)
    return "PUT Success"

def after_generation_handling(table, current_user, generated_user):
    # change already taken ...
    response = table.query(
        KeyConditionExpression=Key('User').eq(generated_user)
    )
    items_gen = response["Items"][0]
    print("Handling genrated_user: ", items_gen)
    generated_user_descr = json.loads(items_gen["Description"])
    generated_user_descr["AlreadyTaken"] = True
    handle_put(table, generated_user, json.dumps(generated_user_descr))
    
    # change generates to ...
    response = table.query(
        KeyConditionExpression=Key('User').eq(current_user)
    )
    items_cur = response["Items"][0]
    print("Handling current_user: ", items_cur)
    current_user_descr = json.loads(items_cur["Description"])
    current_user_descr["GivesPresentTo"] = generated_user
    handle_put(table, current_user, json.dumps(current_user_descr))

def generate_user_func(table, user):
    response = table.query(
        KeyConditionExpression=Key('User').eq(user)
    )
    description_cur_user = json.loads(response["Items"][0]["Description"])
    print("Start generating")
    response = table.scan()
    items = response["Items"]
    users_not_current_user = [item for item in items if item['User'] != user]
    print("Not current User: ", users_not_current_user)
    possible_users = []
    exception_case = []
    for nc_user in users_not_current_user:
        description = json.loads(nc_user["Description"])
        if not description["AlreadyTaken"]:
            if description_cur_user["Question"] == 1 and description["GivesPresentTo"] == None:
                exception_case.append(nc_user)
            possible_users.append(nc_user["User"])
        if description["GivesPresentTo"] == None:
            description["Question"] = description["Question"] - 1 
            handle_put(table, nc_user["User"], json.dumps(description))
    if len(exception_case) == 1:
        generated_user = exception_case[0]["User"]
    else:    
        user_id = randint(0, len(possible_users) - 1)
        generated_user = possible_users[user_id]
    print(f"For user {user} generated user for Wichteln: {generated_user}")
    after_generation_handling(table, user, generated_user)
    return {"GeneratedUser": generated_user}

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-north-1')
    table = dynamodb.Table('WichtelnNewTable')
    user = event["queryStringParameters"]["User"]
    type_of_request = event["queryStringParameters"]["Type"]
    if type_of_request == "REST":
        rest_request_type = event["requestContext"]["http"]["method"]
        if rest_request_type=="GET":
            print("Event: ", event)
            return handle_get(table, user)
        elif rest_request_type=="POST":
            print("Event: ", event)
            new_description = event["queryStringParameters"]["Description"]
            return handle_post(table, user, new_description)
        elif rest_request_type=="PUT":
            print("Event: ", event)
            new_description = event["queryStringParameters"]["Description"]
            return handle_put(table, user, new_description)
        else:
            return "Not a valid REST request"
    elif type_of_request == "Generate":
        print("Event: ", event)
        return generate_user_func(table, user)
    else:
        return "Not existing type of request"
        