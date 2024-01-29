from dotenv import load_dotenv, find_dotenv
import openai as ai
import time
import os
from prompt_maker import make_prompt

load_dotenv(find_dotenv())

api_key = os.getenv("API_KEY")
client = ai.OpenAI(api_key=api_key)
test_mode = True
loop_limit = 5

""" 
check client.chat.completion also instead of prompt it has 
messages(array of previous chat like messages) and role(syste, user, assistant and function), 
may be more suitable for our needs
model predicts the next logical step
client.completion is legacy (used here for testing only)
"""

is_error = False
while True:
    if test_mode:
        if loop_limit == 0:
            break
        loop_limit -= 1

    # save initial state in case of error
    if is_error:
        # make prompt differently
        is_error = False
        pass

    # make prompt
    prompt_content = make_prompt()

    # get response
    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt_content,
        temperature=0.8,
        max_tokens=280,
    )
    # max_tokens=number
    # if max token very less , reason for stopping becomes length
    print(response)
    print(
        "============================================================================================================"
    )
    print(response.choices[0].text)
    print(
        "============================================================================================================"
    )
    response_string = response.choices[0].text

    # parse response
    respones_array = response_string.split(";")
    command = respones_array[0]
    message_content = recipient = ""
    if command == "like":
        # handle_like()
        """"""
    elif command == "newpost":
        message_content = respones_array[1]  # in case of original tweet
        # handle_new_tweet()
    elif command == "reply":
        recipient = respones_array[2]  # in case of reply
        # handle_reply()
    else:
        # handle_error()  # parsing error or response error
        """restart the loop with initial state"""
        is_error = True
        continue

    time.sleep(5)
