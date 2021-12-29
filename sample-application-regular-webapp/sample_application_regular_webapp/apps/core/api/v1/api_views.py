import logging

from django.shortcuts import redirect
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from sample_application_regular_webapp.apps.core.api.api_exception import ContractNotRespectedException
from sample_application_regular_webapp.apps.core.services.oidc_provider import OIDCProvider

logger = logging.getLogger(__name__)


@api_view(["GET"])
def handle_response_oidc(request: Request) -> Response:
    # Sample incoming request: http://localhost:8000/api/v1/response-oidc?code=8ddbdc82-cb95-4bc8-b581-d001579045a6&state=f5787e3d-0b5e-4860-84b0-778e7c7a1a68
    current_referer = request.headers.get("referer")
    logger.info("Handling callback! It came from %s", current_referer)

    auth_flow_details = request.session.pop("authorization-code", {})
    code = request.query_params.get("code")
    state = request.query_params.get("state")

    if not code or not state or not auth_flow_details:
        raise ContractNotRespectedException
    if auth_flow_details["state"] != state:
        raise ContractNotRespectedException

    logger.info("We have everything to contact token endpoint!")
    tokens, claims = OIDCProvider.acquire_token_by_auth_code_flow(code, auth_flow_details["redirect_uri"])

    # Sample content of `claims`:
    # {
    #     "nickname": "willianlimaantunes",
    #     "name": "willianlimaantunes@gmail.com",
    #     "picture": "https://s.gravatar.com/avatar/43dae36aefb1c5768a9c4d9d649e1742?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwi.png",
    #     "updated_at": "2021-10-06T18:33:36.547Z",
    #     "email": "willianlimaantunes@gmail.com",
    #     "email_verified": False,
    #     "iss": "https://antunes.us.auth0.com/",
    #     "sub": "auth0|615dec0033f692007045ab46",
    #     "aud": "LnqZXPprrsDaxEYbWfXpPJEmbtuc1F4E",
    #     "iat": 1633551116,
    #     "exp": 1633587116,
    # }

    request.session["user"] = claims
    request.session["tokens"] = tokens
    location_index = reverse("index")
    return redirect(location_index)


@api_view(["GET"])
def retrieve_user_info(request: Request) -> Response:
    tokens = request.session.get("tokens")
    result = OIDCProvider.get_user_info(tokens["access_token"])
    return Response(data=result)
