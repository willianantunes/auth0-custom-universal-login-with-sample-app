from unittest import mock

from auth0.v3.authentication import GetToken

from scripts.commands import settings
from scripts.commands.auth0_handler import management_api
from tests.scripts.commmands.helper import BaseTestCase


class ManagementAPITests(BaseTestCase):
    def test_should_update_page(self):
        # Arrange
        all_applications_client_id = settings.ALL_APPLICATIONS_CLIENT_ID
        domain = settings.AUTH0_DOMAIN
        endpoint = f"https://{domain}/api/v2/"
        token_handler = GetToken(domain)
        params = settings.AUTH0_M2M_CLIENT_ID, settings.AUTH0_M2M_CLIENT_SECRET, endpoint
        tokens = token_handler.client_credentials(*params)
        with mock.patch("scripts.commands.auth0_handler.retrieve_access_token") as mocked_retrieve_access_token:
            # It will try to authenticate given the provided access token in an invalid one
            mocked_retrieve_access_token.side_effect = [self.fake_access_token, tokens["access_token"]]
            sample_page = """ 
                <!doctype html>
                <html lang="en">
                <head>
                    <title>My honest integration test</title>
                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                <script>
                    alert("It worked!")
                </script>
                </body>
                </html>         
            """
            # Act
            result = management_api.update_login_page_classic(all_applications_client_id, sample_page)
            # Assert
            assert result["name"] == "All Applications"
            assert result["custom_login_page"] == sample_page
            assert result["client_id"] == all_applications_client_id
