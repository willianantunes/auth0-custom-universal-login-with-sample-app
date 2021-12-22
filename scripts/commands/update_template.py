import json

import requests

from requests import RequestException


class BadRequestException(Exception):
    pass


class UnexpectedErrorAuth0API(Exception):
    pass


def update_login_page_classic(your_domain: str, access_token: str, all_applications_client_id: str, page: str) -> dict:
    # https://community.auth0.com/t/no-api-endpoint-exists-for-updating-classic-universal-sign-in-experience-html-unlike-the-new-experience/67780
    # https://auth0.com/docs/api/management/v2#!/Clients/patch_clients_by_id
    url = f"https://{your_domain}/api/v2/clients/{all_applications_client_id}"
    authorization_value = f"Bearer {access_token}"
    body = {"custom_login_page": page}
    headers = {"Authorization": authorization_value, "Content-Type": "application/json", "Accept": "application/json"}

    try:
        response = requests.patch(url, json.dumps(body), headers=headers)
        status_code = response.status_code
        if status_code == 200:
            print("Login page has been updated successfully")
            return response.json()
        elif status_code == 400:
            error_details = response.json()
            print(f"Something is missing in your request! Details {error_details}")
            raise BadRequestException
        else:
            print(f"An error {status_code} was caught during processing. Raw details: {response.raw}")
            raise UnexpectedErrorAuth0API
    except RequestException as e:
        """
        See more details at: https://requests.readthedocs.io/en/latest/user/quickstart/#errors-and-exceptions
        """
        print(f"A network, time-out or HTTP error was caught. Details: {e}")
        raise e
