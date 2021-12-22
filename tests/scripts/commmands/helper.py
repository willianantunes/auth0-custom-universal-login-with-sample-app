import unittest

import boto3


class BaseTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.domain = "AUTH0_DOMAIN"
        self.access_token = "AUTH0_ACCESS_TOKEN"
        self.all_applications_client_id = "ALL_APPLICATIONS_CLIENT_ID"
        self.bucket_name = "BUCKET_NAME"
        self.aws_s3_region = "AWS_S3_REGION"
        self.aws_service_account_access_key = "AWS_SERVICE_ACCOUNT_S3_ACCESS_KEY"
        self.aws_service_account_access_secret = "AWS_SERVICE_ACCOUNT_S3_ACCESS_SECRET"
        self.bucket = None
        self.s3 = boto3.resource(
            "s3",
            region_name=self.aws_s3_region,
            aws_access_key_id=self.aws_service_account_access_key,
            aws_secret_access_key=self.aws_service_account_access_secret,
        )

    def tearDown(self) -> None:
        if self.bucket:
            self.bucket.objects.all().delete()
            self.bucket.delete()
