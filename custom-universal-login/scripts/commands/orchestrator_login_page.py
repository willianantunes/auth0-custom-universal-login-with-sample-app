import mimetypes
import pathlib

from dataclasses import dataclass

import boto3

from botocore.exceptions import ClientError

from scripts.commands import settings
from scripts.commands.auth0_handler import management_api

BASE_DIR = pathlib.Path(__file__).resolve().parent.parent.parent


@dataclass(frozen=True)
class StaticFiles:
    html_file: pathlib.Path
    css_file: pathlib.Path
    js_file: pathlib.Path


def retrieve_bucket(s3_resource, bucket_name):
    bucket = s3_resource.Bucket(bucket_name)
    bucket_does_not_exist = not bucket.creation_date
    if bucket_does_not_exist:
        bucket.create()
    return bucket


def retrieve_buckets_cors(s3_resource, bucket_name):
    has_cors = False
    bucket_cors = s3_resource.BucketCors(bucket_name)

    try:
        if bucket_cors.cors_rules:
            has_cors = True
    except ClientError as e:
        if e.response["Error"]["Code"] == "NoSuchCORSConfiguration":
            has_cors = False
        else:
            raise e

    return bucket_cors, has_cors


def upload_file(bucket, filename, blob_key):
    # Sample about how to check it:
    # curl -i https://my-honest-hosted-content-december-2021.s3.amazonaws.com/login.c20437d2.css
    content_type = mimetypes.guess_type(blob_key)[0]
    extra_args = {
        "ACL": "public-read",
        "CacheControl": "public, max-age=31536000, immutable",
        "ContentType": content_type,
    }
    bucket.upload_file(filename, blob_key, ExtraArgs=extra_args)


def retrieve_static_files(folder, glob_pattern) -> StaticFiles:
    files = pathlib.Path(f"{BASE_DIR}/{folder}").glob(glob_pattern)
    js_file, css_file, html_file = None, None, None

    for file in files:
        if file.suffix == ".js":
            js_file = file
        if file.suffix == ".css":
            css_file = file
        if file.suffix == ".html":
            html_file = file

    return StaticFiles(html_file, css_file, js_file)


def load_content_as_string(file_name) -> str:
    with open(file_name, mode="r", encoding="utf-8") as file:
        return "".join(line.rstrip() for line in file)


def main():
    s3 = boto3.resource(
        "s3",
        region_name=settings.AWS_S3_REGION,
        aws_access_key_id=settings.AWS_SERVICE_ACCOUNT_ACCESS_KEY,
        aws_secret_access_key=settings.AWS_SERVICE_ACCOUNT_ACCESS_SECRET,
    )
    static_files = retrieve_static_files("out", "login.*")
    print(f"Configured static files: {static_files}")
    bucket = retrieve_bucket(s3, settings.BUCKET_NAME)

    upload_file(bucket, str(static_files.css_file), static_files.css_file.name)
    upload_file(bucket, str(static_files.js_file), static_files.js_file.name)
    print(f"CSS and JS files have been uploaded")

    page_as_str = load_content_as_string(str(static_files.html_file))
    management_api.update_login_page_classic(settings.ALL_APPLICATIONS_CLIENT_ID, page_as_str)
    print("HTML file has been updated on Auth0")

    bucket_cors, has_cors = retrieve_buckets_cors(s3, settings.BUCKET_NAME)
    if not has_cors:
        cors_origins_allow_list = [origin for origin in settings.CORS_ALLOWED_ORIGINS.split(",")]
        print(f"Applying CORS with the following ORIGINS: {cors_origins_allow_list}")
        bucket_cors.put(
            CORSConfiguration={
                "CORSRules": [
                    {
                        "AllowedMethods": ["GET"],
                        "AllowedOrigins": cors_origins_allow_list,
                        "ExposeHeaders": ["GET"],
                        "MaxAgeSeconds": 3600,
                    },
                ]
            },
        )
