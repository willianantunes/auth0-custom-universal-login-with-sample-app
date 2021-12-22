from scripts.commands.update_template import update_login_page_classic
from tests.scripts.commmands.helper import BaseTestCase


class ClassicUniversaLoginTests(BaseTestCase):
    def test_should_update_page(self):
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
        result = update_login_page_classic(self.domain, self.access_token, self.all_applications_client_id, sample_page)
        assert result["name"] == "All Applications"
        assert result["custom_login_page"] == sample_page
        assert result["client_id"] == self.all_applications_client_id
