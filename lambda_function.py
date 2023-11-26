import boto3
import json
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
    return "POST"
    
def handle_put(table, user, description):
    current_description = table.query(
        KeyConditionExpression=Key('User').eq(user)
    )["Items"][0]
    print("Current description: ", current_description)
    table.delete_item(Key=current_description)
    handle_post(table, user, description)
    return "PUT"

def generate_user(table, user):
    return {"Genration for user: ": user}

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-north-1')
    table = dynamodb.Table('Wichteln')
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
        return generate_user(table, user)
    else:
        return "Not existing type of request"
        