from unittest import mock

from botocore.exceptions import ClientError

from scripts.commands import handler
from scripts.commands.handler import main
from scripts.commands.handler import retrieve_bucket
from scripts.commands.handler import retrieve_static_files
from tests.scripts.commmands.helper import BaseTestCase


class HandlerTests(BaseTestCase):
    def test_should_retrieve_static_files(self):
        # Act
        static_files = retrieve_static_files("out", "login.*")
        # Assert
        assert static_files.js_file
        assert static_files.css_file
        assert static_files.html_file

    def test_should_retrieve_bucket(self):
        # Act
        bucket = retrieve_bucket(self.s3, self.bucket_name)
        # Assert
        assert bucket.creation_date

    @mock.patch.object(handler, "update_login_page_classic", wraps=handler.update_login_page_classic)
    @mock.patch.object(handler, "upload_file", wraps=handler.upload_file)
    @mock.patch.object(handler, "retrieve_bucket", wraps=handler.retrieve_bucket)
    @mock.patch("scripts.commands.handler.boto3")
    def test_should_upload_static_files(
        self, mocked_boto3, wrapped_retrieve_bucket, wrapped_upload_file, wrapped_auth0
    ):
        # Arrange
        with mock.patch.object(handler.settings, "BUCKET_NAME", self.bucket_name):
            with mock.patch.object(handler.settings, "AUTH0_DOMAIN", self.domain):
                with mock.patch.object(handler.settings, "ALL_APPLICATIONS_CLIENT_ID", self.all_applications_client_id):
                    with mock.patch.object(handler.settings, "AUTH0_ACCESS_TOKEN", self.access_token):
                        with mock.patch.object(handler.settings, "CORS_ALLOWED_ORIGINS", self.allowed_origins):
                            mocked_boto3.resource.return_value = self.s3
                            # Act
                            main()
                            # Assert
                            self.bucket, _, css_file_key = wrapped_upload_file.call_args_list[0][0]
                            _, _, js_file_key = wrapped_upload_file.call_args_list[1][0]
                            _, _, _, content_from_html_file = wrapped_auth0.call_args_list[0][0]
                            assert wrapped_upload_file.call_count == 2
                            wrapped_retrieve_bucket.assert_called_with(self.s3, self.bucket_name)
                            wrapped_auth0.assert_called_with(
                                self.domain, self.access_token, self.all_applications_client_id, content_from_html_file
                            )
                            assert self._object_exist(self.bucket.Object(css_file_key))
                            assert self._object_exist(self.bucket.Object(js_file_key))

    def _object_exist(self, bucket_object):
        try:
            if bucket_object.last_modified:
                return True
        except ClientError as e:
            if e.response["Error"]["Message"] == "Not Found":
                return False
            else:
                raise e
